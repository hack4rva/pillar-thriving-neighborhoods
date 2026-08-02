import type {
  GraphData, GraphNode, GraphEdge, FinancialFlow, EvidenceRecord,
  UnansweredQuestion, ReviewItem, ExtractionReport,
} from './types';

/**
 * Where to fetch the extracted JSON from.
 *
 * In a pillar repo the app serves its own `data/`. One deployment can instead
 * host several pillars side by side under `data/<slug>/` and pick between them
 * with `?pillar=<slug>`, which avoids shipping a copy of the whole bundle per
 * pillar. The slug is restricted to a flat name so it cannot escape `data/`.
 */
function dataDir(): string {
  const pillar = new URLSearchParams(location.search).get('pillar');
  return pillar && /^[a-z0-9-]+$/.test(pillar) ? `data/${pillar}/` : 'data/';
}

/** Loaded dataset plus indexes and graph algorithms shared by all views. */
export class Dataset {
  graph!: GraphData;
  evidence: EvidenceRecord[] = [];
  questions: UnansweredQuestion[] = [];
  reviewQueue: ReviewItem[] = [];
  report!: ExtractionReport;

  nodeById = new Map<string, GraphNode>();
  edgeById = new Map<string, GraphEdge>();
  flowById = new Map<string, FinancialFlow>();
  outEdges = new Map<string, GraphEdge[]>();
  inEdges = new Map<string, GraphEdge[]>();
  flowsByNode = new Map<string, FinancialFlow[]>();

  /** Build a Dataset from in-memory graph data (used by tests and fixtures). */
  static fromGraph(graph: GraphData, extras?: {
    evidence?: EvidenceRecord[]; questions?: UnansweredQuestion[];
    reviewQueue?: ReviewItem[]; report?: ExtractionReport;
  }): Dataset {
    const d = new Dataset();
    d.graph = graph;
    d.evidence = extras?.evidence ?? [];
    d.questions = extras?.questions ?? [];
    d.reviewQueue = extras?.reviewQueue ?? [];
    d.report = extras?.report ?? {
      generatedAt: '', repo: '', filesExamined: [], provenanceVerification: {}, warnings: [], metrics: {},
    };
    d.buildIndexes();
    return d;
  }

  async load(): Promise<void> {
    const fetchJson = async (name: string) => {
      const res = await fetch(`${import.meta.env.BASE_URL}${dataDir()}${name}`);
      if (!res.ok) throw new Error(`failed to load ${name}: ${res.status}`);
      return res.json();
    };
    const [graph, evidence, questions, reviewQueue, report] = await Promise.all([
      fetchJson('graph.json'), fetchJson('evidence.json'),
      fetchJson('unanswered_questions.json'), fetchJson('review_queue.json'),
      fetchJson('extraction_report.json'),
    ]);
    this.graph = graph;
    this.evidence = evidence;
    this.questions = questions;
    this.reviewQueue = reviewQueue;
    this.report = report;
    this.buildIndexes();
  }

  private buildIndexes(): void {
    for (const n of this.graph.nodes) this.nodeById.set(n.id, n);
    for (const e of this.graph.edges) {
      this.edgeById.set(e.id, e);
      push(this.outEdges, e.source, e);
      push(this.inEdges, e.target, e);
    }
    for (const f of this.graph.financialFlows) {
      this.flowById.set(f.id, f);
      const touched = new Set<string>();
      for (const s of f.stages) { touched.add(s.from); touched.add(s.to); }
      for (const id of touched) push(this.flowsByNode, id, f);
    }
  }

  neighbors(id: string): Set<string> {
    const out = new Set<string>();
    for (const e of this.outEdges.get(id) ?? []) out.add(e.target);
    for (const e of this.inEdges.get(id) ?? []) out.add(e.source);
    return out;
  }

  /** Nodes within `hops` of id (including id). */
  neighborhood(id: string, hops: number): Set<string> {
    const seen = new Set([id]);
    let frontier = [id];
    for (let h = 0; h < hops; h++) {
      const next: string[] = [];
      for (const cur of frontier) {
        for (const nb of this.neighbors(cur)) {
          if (!seen.has(nb)) { seen.add(nb); next.push(nb); }
        }
      }
      frontier = next;
    }
    return seen;
  }

  /** BFS shortest path treating edges as undirected; returns node ids or null. */
  shortestPath(from: string, to: string): string[] | null {
    if (from === to) return [from];
    const prev = new Map<string, string>();
    const queue = [from];
    const seen = new Set([from]);
    while (queue.length) {
      const cur = queue.shift()!;
      for (const nb of this.neighbors(cur)) {
        if (seen.has(nb)) continue;
        seen.add(nb);
        prev.set(nb, cur);
        if (nb === to) {
          const path = [to];
          let p = to;
          while (p !== from) { p = prev.get(p)!; path.unshift(p); }
          return path;
        }
        queue.push(nb);
      }
    }
    return null;
  }

  edgesBetween(a: string, b: string): GraphEdge[] {
    return (this.outEdges.get(a) ?? []).filter((e) => e.target === b)
      .concat((this.outEdges.get(b) ?? []).filter((e) => e.target === a));
  }

  /** All financial edges reachable downstream of a node (money direction). */
  downstreamFinancial(id: string): { edges: GraphEdge[]; nodes: Set<string> } {
    const edges: GraphEdge[] = [];
    const nodes = new Set<string>([id]);
    const queue = [id];
    const seenEdges = new Set<string>();
    while (queue.length) {
      const cur = queue.shift()!;
      for (const e of this.outEdges.get(cur) ?? []) {
        if (!e.financial || seenEdges.has(e.id)) continue;
        seenEdges.add(e.id);
        edges.push(e);
        if (!nodes.has(e.target)) { nodes.add(e.target); queue.push(e.target); }
      }
    }
    return { edges, nodes };
  }

  /** Weighted size metric: log of attached documented money + degree. */
  nodeMetric(id: string): number {
    const degree = (this.outEdges.get(id)?.length ?? 0) + (this.inEdges.get(id)?.length ?? 0);
    let money = 0;
    for (const e of [...(this.outEdges.get(id) ?? []), ...(this.inEdges.get(id) ?? [])]) {
      if (e.financial?.amountUSD) money += e.financial.amountUSD;
    }
    return 2.5 + Math.min(degree, 40) * 0.28 + (money > 0 ? Math.log10(money) * 0.9 : 0);
  }
}

function push<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  const arr = map.get(key);
  if (arr) arr.push(value); else map.set(key, [value]);
}

export function fmtUSD(v: number | null | undefined): string {
  if (v == null) return 'unknown';
  if (v >= 1e6) return `$${(v / 1e6).toFixed(v >= 1e7 ? 0 : 1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toLocaleString('en-US')}`;
}

export function fmtUSDFull(v: number | null | undefined): string {
  return v == null ? 'unknown' : `$${v.toLocaleString('en-US')}`;
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
