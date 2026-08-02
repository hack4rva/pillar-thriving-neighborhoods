import type { Filters, Mode, Selection } from './types';
import type { Dataset } from './data';

export type Listener = () => void;

/** Central UI state with naive pub/sub; every mutation triggers re-render. */
export class AppState {
  mode: Mode = 'overview';
  filters: Filters;
  selection: Selection = { kind: null, id: null };
  view2d = false;
  animateFlows: boolean;
  showAllLabels = false;
  focusNodeId: string | null = null;   // neighborhood focus (expand/collapse)
  focusHops = 1;
  timelineYear: number | null = null;  // null = all time
  highlightedEdgeIds = new Set<string>();
  highlightedNodeIds = new Set<string>();
  drawerTab = 'summary';

  private listeners = new Set<Listener>();

  constructor(public data: Dataset) {
    const reducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    this.animateFlows = !reducedMotion;
    this.filters = {
      repos: new Set(data.graph.meta.repos),
      nodeTypes: new Set(data.graph.nodes.map((n) => n.type)),
      edgeTypes: new Set(data.graph.edges.map((e) => e.type)),
      evidenceStatuses: new Set([...data.graph.nodes.map((n) => n.evidenceStatus), ...data.graph.edges.map((e) => e.evidenceStatus)]),
      financialStatuses: new Set(['proposed', 'approved', 'committed', 'disbursed', 'partially_disbursed', 'completed', 'canceled', 'unknown']),
      amountMin: null,
      amountMax: null,
      includeNonFinancial: true,
      yearMax: null,
      search: '',
    };
  }

  subscribe(fn: Listener): void { this.listeners.add(fn); }
  notify(): void { for (const fn of this.listeners) fn(); }

  /** Nodes passing the current filters (and timeline year if active). */
  visibleNodeIds(): Set<string> {
    const { filters } = this;
    const out = new Set<string>();
    for (const n of this.data.graph.nodes) {
      // In a merged graph an entity can belong to several pillars at once, and
      // attrs.pillars carries the full list; repo alone is only its first.
      const pillars = (n.attrs?.pillars as string[] | undefined) ?? [n.repo];
      if (!pillars.some((r) => filters.repos.has(r))) continue;
      if (!filters.nodeTypes.has(n.type)) continue;
      if (!filters.evidenceStatuses.has(n.evidenceStatus)) continue;
      if (this.timelineYear != null && n.type === 'Project') {
        const key = (n.attrs?.completionSortKey as number | null) ?? null;
        // Projects with unknown dates stay visible but are dimmed by the renderer.
        if (key != null && key > this.timelineYear) continue;
      }
      out.add(n.id);
    }
    if (this.focusNodeId && out.has(this.focusNodeId)) {
      const hood = this.data.neighborhood(this.focusNodeId, this.focusHops);
      for (const id of [...out]) if (!hood.has(id)) out.delete(id);
    }
    return out;
  }

  visibleEdges(visibleNodes: Set<string>) {
    const { filters } = this;
    return this.data.graph.edges.filter((e) => {
      if (!visibleNodes.has(e.source) || !visibleNodes.has(e.target)) return false;
      if (!filters.edgeTypes.has(e.type)) return false;
      if (!filters.evidenceStatuses.has(e.evidenceStatus)) return false;
      if (e.financial) {
        if (!filters.financialStatuses.has(e.financial.status)) return false;
        const amt = e.financial.amountUSD;
        if (filters.amountMin != null && (amt == null || amt < filters.amountMin)) return false;
        if (filters.amountMax != null && amt != null && amt > filters.amountMax) return false;
      } else if (!filters.includeNonFinancial) {
        return false;
      }
      return true;
    });
  }

  select(kind: Selection['kind'], id: string | null): void {
    this.selection = { kind, id: id ?? null };
    this.notify();
  }

  clearHighlights(): void {
    this.highlightedEdgeIds.clear();
    this.highlightedNodeIds.clear();
  }

  resetAll(): void {
    const fresh = new AppState(this.data);
    this.filters = fresh.filters;
    this.selection = { kind: null, id: null };
    this.focusNodeId = null;
    this.timelineYear = null;
    this.clearHighlights();
    this.notify();
  }
}
