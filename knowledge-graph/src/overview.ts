import { hierarchy, treemap, treemapSquarify } from 'd3';
import type { AppState } from './state';
import type { GraphNode } from './types';
import { fmtUSD, fmtUSDFull, escapeHtml } from './data';

const esc = escapeHtml;

// A stable, legible palette keyed by spending category so the treemap and the
// ranked bars agree on color.
const CATEGORY_COLORS: Record<string, string> = {
  'Road Improvements': '#5aa2ff',
  'Bridge Repair': '#38c8a8',
  'New Facility Construction': '#e0a83c',
  'Pedestrian and Bike': '#b57bff',
  'Water': '#4fc3f7',
  'Parks & Recreation': '#7cd97c',
  'Stormwater': '#5fd0e0',
  'Sewer': '#c98a5a',
};
const FALLBACK_COLORS = ['#8b98ad', '#d0687f', '#a0c85a', '#e0806b', '#6b8cff'];

const colorFor = (category: string, i: number): string =>
  CATEGORY_COLORS[category] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length];

interface ProjectRow { node: GraphNode; category: string; cost: number; phase: string }
interface CatDatum { key?: string; value?: number; children?: CatDatum[] }

/**
 * The landing dashboard. The 3D graph answers "how is everything connected";
 * this answers the questions a resident or reporter actually opens with — where
 * ~$1B of capital money goes, how far along it is, and what documented needs
 * have no funding at all.
 */
export class Overview {
  constructor(
    private el: HTMLElement,
    private state: AppState,
    private onSelectNode: (id: string) => void,
    private onGotoMode: (mode: string) => void,
  ) {
    // Local (non-global) interactions: drill into a category, jump to a node.
    this.el.addEventListener('click', (ev) => {
      const t = (ev.target as HTMLElement).closest('[data-ov-cat],[data-ov-node],[data-ov-mode]') as HTMLElement | null;
      if (!t) return;
      if (t.dataset.ovNode) this.onSelectNode(t.dataset.ovNode);
      else if (t.dataset.ovMode) this.onGotoMode(t.dataset.ovMode);
      else if (t.dataset.ovCat != null) {
        this.activeCategory = this.activeCategory === t.dataset.ovCat ? null : t.dataset.ovCat;
        this.render();
      }
    });
  }

  private activeCategory: string | null = null;

  private projects(): ProjectRow[] {
    return this.state.data.graph.nodes
      .filter((n) => n.type === 'Project')
      .map((n) => ({
        node: n,
        category: (n.attrs?.category as string) || 'Uncategorized',
        cost: (n.attrs?.costUSD as number) || 0,
        phase: (n.attrs?.phase as string) || 'Unspecified',
      }));
  }

  private unfundedNeeds(): GraphNode[] {
    const d = this.state.data;
    const fundedTargets = new Set(d.graph.edges.filter((e) => e.financial).map((e) => e.target));
    return d.graph.nodes.filter((n) => n.type === 'Need').filter((need) => {
      const addressers = d.graph.edges
        .filter((e) => e.type === 'ADDRESSES' && e.target === need.id)
        .map((e) => e.source);
      return !addressers.some((a) => fundedTargets.has(a));
    });
  }

  render(): void {
    const projects = this.projects();
    const total = projects.reduce((s, p) => s + p.cost, 0);

    const byCategory = groupSum(projects, (p) => p.category);
    const byPhase = groupSum(projects, (p) => p.phase);
    const planning = byPhase.find((g) => /planning|design/i.test(g.key))?.value ?? 0;
    const completed = byPhase.find((g) => /complet/i.test(g.key))?.value ?? 0;
    const unfunded = this.unfundedNeeds();

    this.el.innerHTML = `
      <div class="ov-wrap">
        <div class="ov-headline">
          <div>
            <h2>Where Richmond's capital money goes</h2>
            <p class="muted small">Every dollar below is a documented Capital Improvement Program (CIP)
            project. Click any block or bar to open it in the network; totals never mix documented and proposed money.</p>
          </div>
          <div class="ov-kpis">
            ${kpi(fmtUSD(total), 'documented capital')}
            ${kpi(String(projects.length), 'CIP projects')}
            ${kpi(fmtUSD(planning), 'still in planning/design')}
            ${kpi(String(unfunded.length), 'needs with $0 funding', unfunded.length ? 'danger' : '')}
          </div>
        </div>

        <div class="ov-grid">
          <section class="ov-card ov-col-wide">
            <h3>Capital spending by category</h3>
            <div class="ov-treemap" data-ov-treemap style="height:260px"></div>
          </section>

          <section class="ov-card">
            <h3>Where it is in the pipeline</h3>
            ${this.pipeline(byPhase, total)}
            <p class="muted small" style="margin-top:10px">Only <b>${fmtUSD(completed)}</b> of the
            ${fmtUSD(total)} program is documented complete — most capital is still upstream of the ground.</p>
          </section>
        </div>

        <div class="ov-grid">
          <section class="ov-card ov-col-wide">
            <h3>Biggest projects${this.activeCategory ? ` · <span class="ov-filter">${esc(this.activeCategory)} <button class="linkish" data-ov-cat="">clear</button></span>` : ''}</h3>
            ${this.topProjects(projects)}
          </section>

          <section class="ov-card ${unfunded.length ? 'ov-card-alert' : ''}">
            <h3>Documented needs with no funding</h3>
            ${unfunded.length ? `
              <ul class="ov-needs">
                ${unfunded.map((n) => `<li><button class="linkish" data-ov-node="${n.id}">${esc(n.label)}</button></li>`).join('')}
              </ul>
              <button class="mini" data-ov-mode="problem">Open Problem Space →</button>
            ` : '<p class="muted small">Every documented need has at least one funded intervention.</p>'}
          </section>
        </div>
      </div>
    `;

    // Second pass: the treemap must be tiled against its real container width,
    // which only exists once the shell above is in the DOM.
    this.fillTreemap(byCategory, total);
  }

  private fillTreemap(groups: { key: string; value: number }[], total: number): void {
    const container = this.el.querySelector<HTMLElement>('[data-ov-treemap]');
    if (!container) return;
    const width = Math.max(320, container.clientWidth);
    const height = container.clientHeight || 260;
    const root = hierarchy<CatDatum>({ children: groups })
      .sum((d) => d.value ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    const rootNode = treemap<CatDatum>()
      .tile(treemapSquarify).size([width, height]).paddingInner(3).round(true)(root);
    container.innerHTML = rootNode.leaves().map((leaf, i) => {
      const w = leaf.x1 - leaf.x0;
      const h = leaf.y1 - leaf.y0;
      const cat = leaf.data.key ?? 'Uncategorized';
      const value = leaf.value ?? 0;
      const pct = total ? Math.round((value / total) * 100) : 0;
      const dim = this.activeCategory && this.activeCategory !== cat;
      const showLabel = w > 68 && h > 30;
      return `<button class="ov-tile${dim ? ' dim' : ''}" data-ov-cat="${esc(cat)}"
        style="left:${leaf.x0}px;top:${leaf.y0}px;width:${w}px;height:${h}px;background:${colorFor(cat, i)}"
        title="${esc(cat)} — ${fmtUSDFull(value)} (${pct}%)">
        ${showLabel ? `<span class="ov-tile-label">${esc(cat)}</span><span class="ov-tile-amt">${fmtUSD(value)} · ${pct}%</span>` : ''}
      </button>`;
    }).join('');
  }

  private pipeline(groups: { key: string; value: number }[], total: number): string {
    const sorted = [...groups].sort((a, b) => b.value - a.value);
    return `<div class="ov-bars">${sorted.map((g) => {
      const pct = total ? (g.value / total) * 100 : 0;
      return `<div class="ov-bar-row">
        <span class="ov-bar-label" title="${esc(g.key)}">${esc(g.key)}</span>
        <span class="ov-bar-track"><span class="ov-bar-fill" style="width:${pct.toFixed(1)}%"></span></span>
        <span class="ov-bar-val">${fmtUSD(g.value)}</span>
      </div>`;
    }).join('')}</div>`;
  }

  private topProjects(projects: ProjectRow[]): string {
    let rows = [...projects].sort((a, b) => b.cost - a.cost);
    if (this.activeCategory) rows = rows.filter((p) => p.category === this.activeCategory);
    rows = rows.slice(0, 12);
    const max = rows[0]?.cost || 1;
    return `<div class="ov-bars">${rows.map((p, i) => {
      const pct = (p.cost / max) * 100;
      return `<div class="ov-bar-row ov-clickable" data-ov-node="${p.node.id}" role="button" tabindex="0"
        title="${esc(p.node.label)}">
        <span class="ov-bar-label ov-bar-label-lg">${esc(p.node.label)}</span>
        <span class="ov-bar-track"><span class="ov-bar-fill" style="width:${pct.toFixed(1)}%;background:${colorFor(p.category, i)}"></span></span>
        <span class="ov-bar-val">${fmtUSD(p.cost)}</span>
      </div>`;
    }).join('')}</div>`;
  }
}

function groupSum(items: ProjectRow[], keyFn: (p: ProjectRow) => string): { key: string; value: number }[] {
  const map = new Map<string, number>();
  for (const it of items) {
    const k = keyFn(it);
    map.set(k, (map.get(k) ?? 0) + it.cost);
  }
  return [...map.entries()].map(([key, value]) => ({ key, value })).sort((a, b) => b.value - a.value);
}

const kpi = (value: string, label: string, tone = '') =>
  `<div class="ov-kpi ${tone}"><span class="ov-kpi-val">${value}</span><span class="ov-kpi-label">${label}</span></div>`;
