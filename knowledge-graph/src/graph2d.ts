import * as d3 from 'd3';
import type { AppState } from './state';
import type { GraphEdge } from './types';
import { styleFor, EVIDENCE_EDGE_STYLES, edgeBaseColor, edgeWidth } from './visual';

interface N2 extends d3.SimulationNodeDatum { id: string }
interface L2 extends d3.SimulationLinkDatum<N2> { id: string; edge: GraphEdge }

/** Accessible 2D SVG fallback with the same filters, selection, and dash semantics. */
export class Graph2D {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private root: d3.Selection<SVGGElement, unknown, null, undefined>;
  private sim: d3.Simulation<N2, L2> | null = null;
  private positions = new Map<string, { x: number; y: number }>();
  private lastKey = '';

  constructor(private el: HTMLElement, private state: AppState,
              private onNodeClick: (id: string, shift: boolean) => void,
              private onLinkClick: (id: string) => void) {
    this.svg = d3.select(el).append('svg')
      .attr('role', 'img')
      .attr('aria-label', 'Two-dimensional knowledge graph fallback view');
    const defs = this.svg.append('defs');
    defs.append('marker')
      .attr('id', 'arrow2d').attr('viewBox', '0 -4 8 8')
      .attr('refX', 14).attr('markerWidth', 7).attr('markerHeight', 7).attr('orient', 'auto')
      .append('path').attr('d', 'M0,-3.5L8,0L0,3.5').attr('fill', '#6b7c96');
    this.root = this.svg.append('g');
    this.svg.call(
      d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.15, 6])
        .on('zoom', (ev) => this.root.attr('transform', ev.transform)) as never
    );
  }

  update(): void {
    if (this.el.hidden) return;
    const visible = this.state.visibleNodeIds();
    const edges = this.state.visibleEdges(visible);
    const key = [...visible].sort().join(',') + '|' + edges.map((e) => e.id).join(',');

    const nodes: N2[] = [...visible].map((id) => ({ id, ...this.positions.get(id) }));
    const links: L2[] = edges.map((e) => ({ id: e.id, source: e.source, target: e.target, edge: e }));

    const w = this.el.clientWidth || 800;
    const h = this.el.clientHeight || 600;
    this.svg.attr('viewBox', `0 0 ${w} ${h}`);

    if (key !== this.lastKey) {
      this.lastKey = key;
      this.sim?.stop();
      this.sim = d3.forceSimulation<N2>(nodes)
        .force('link', d3.forceLink<N2, L2>(links).id((d) => d.id).distance(55))
        .force('charge', d3.forceManyBody().strength(-160))
        .force('center', d3.forceCenter(w / 2, h / 2))
        .force('collide', d3.forceCollide(14))
        .stop();
      this.sim.tick(200);
      for (const n of nodes) this.positions.set(n.id, { x: n.x!, y: n.y! });
    } else {
      for (const l of links) {
        (l as { source: unknown }).source = nodes.find((n) => n.id === (typeof l.source === 'string' ? l.source : (l.source as N2).id))!;
        (l as { target: unknown }).target = nodes.find((n) => n.id === (typeof l.target === 'string' ? l.target : (l.target as N2).id))!;
      }
    }

    const pos = (id: string) => this.positions.get(id) ?? { x: w / 2, y: h / 2 };
    const state = this.state;

    const linkSel = this.root.selectAll<SVGLineElement, L2>('line.l2')
      .data(links, (d) => d.id);
    linkSel.exit().remove();
    linkSel.enter().append('line').attr('class', 'l2')
      .attr('marker-end', 'url(#arrow2d)')
      .style('cursor', 'pointer')
      .on('click', (_, d) => this.onLinkClick(d.edge.id))
      .merge(linkSel)
      .attr('x1', (d) => pos((d.edge).source).x).attr('y1', (d) => pos((d.edge).source).y)
      .attr('x2', (d) => pos((d.edge).target).x).attr('y2', (d) => pos((d.edge).target).y)
      .attr('stroke', (d) => EVIDENCE_EDGE_STYLES[d.edge.evidenceStatus].colorOverride ?? edgeBaseColor(d.edge))
      .attr('stroke-width', (d) => state.highlightedEdgeIds.has(d.edge.id) ? edgeWidth(d.edge) + 2 : edgeWidth(d.edge))
      .attr('stroke-dasharray', (d) => (EVIDENCE_EDGE_STYLES[d.edge.evidenceStatus].dash ?? []).map((v) => v * 2).join(' ') || null)
      .attr('opacity', (d) => state.highlightedEdgeIds.size && !state.highlightedEdgeIds.has(d.edge.id) ? 0.12 : 0.75);

    const nodeSel = this.root.selectAll<SVGGElement, N2>('g.n2')
      .data(nodes, (d) => d.id);
    nodeSel.exit().remove();
    const enter = nodeSel.enter().append('g').attr('class', 'n2')
      .style('cursor', 'pointer')
      .attr('tabindex', 0)
      .on('click', (ev: MouseEvent, d) => this.onNodeClick(d.id, ev.shiftKey))
      .on('keydown', (ev: KeyboardEvent, d) => { if (ev.key === 'Enter') this.onNodeClick(d.id, ev.shiftKey); });
    enter.append('circle');
    enter.append('text').attr('class', 'icon').attr('text-anchor', 'middle').attr('dy', '0.34em')
      .attr('font-size', 8).attr('fill', '#0b1220').attr('font-weight', 700);
    enter.append('text').attr('class', 'lbl').attr('text-anchor', 'middle')
      .attr('font-size', 9).attr('fill', '#c9d4e4');
    const merged = enter.merge(nodeSel)
      .attr('transform', (d) => { const p = pos(d.id); return `translate(${p.x},${p.y})`; });

    merged.select('circle')
      .attr('r', (d) => Math.min(16, state.data.nodeMetric(d.id) * 1.4))
      .attr('fill', (d) => styleFor(state.data.nodeById.get(d.id)!).color)
      .attr('stroke', (d) => state.selection.id === d.id ? '#ffffff' : '#10141c')
      .attr('stroke-width', (d) => state.selection.id === d.id ? 2.5 : 1)
      .attr('opacity', (d) => state.highlightedNodeIds.size && !state.highlightedNodeIds.has(d.id) && state.selection.id !== d.id ? 0.15 : 0.95)
      .attr('stroke-dasharray', (d) => state.data.nodeById.get(d.id)!.type === 'UnknownEntity' ? '3 2' : null);
    merged.select('text.icon')
      .text((d) => styleFor(state.data.nodeById.get(d.id)!).icon);
    merged.select('text.lbl')
      .attr('y', (d) => Math.min(16, state.data.nodeMetric(d.id) * 1.4) + 10)
      .text((d) => {
        const n = state.data.nodeById.get(d.id)!;
        const important = state.data.nodeMetric(d.id) > 6 || state.selection.id === d.id || state.highlightedNodeIds.has(d.id);
        return important ? (n.label.length > 30 ? n.label.slice(0, 28) + '…' : n.label) : '';
      });

    // Accessible list alternative (screen readers read this instead of the SVG).
    this.svg.attr('aria-label',
      `Two-dimensional graph view showing ${nodes.length} entities and ${links.length} relationships. ` +
      'Use the Entities and Funding Flows tables below for a fully accessible listing.');
  }
}
