import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import type { AppState } from './state';
import type { FinancialFlow, GraphEdge, GraphNode, Provenance } from './types';
import { fmtUSD, fmtUSDFull, escapeHtml } from './data';
import { styleFor, FINANCIAL_STATUS_LABELS } from './visual';

const esc = escapeHtml;

const badge = (text: string, cls = '') => `<span class="badge ${cls}">${esc(text)}</span>`;
const statusBadge = (s: string) => badge(s.replace(/_/g, ' '), `status-${s}`);

/**
 * Where provenance file paths resolve to. Set once the graph loads, because a
 * merged multi-pillar graph draws from several repositories and each node has
 * to point at its own.
 */
let repoBlobBase = 'https://github.com/hack4rva';
export const setRepoBase = (org = 'hack4rva') => { repoBlobBase = `https://github.com/${org}`; };
const blobFor = (repo: string) => `${repoBlobBase}/${repo}/blob/main`;

/**
 * Provenance is the point of this graph, so it is rendered as two working
 * links: the repository file the statement was read from, and the primary
 * source that file cites. Without the second one a reader can only check that
 * we copied our own notes correctly.
 */
function provHtml(provenance: Provenance[], repo: string): string {
  const repoLink = (p: Provenance) => {
    if (/^https?:/.test(p.sourceDoc)) return esc(p.sourceDoc);
    const line = /lines?\s+(\d+)/i.exec(p.sourceLocation ?? '')?.[1];
    const href = `${blobFor(repo)}/${p.sourceDoc}${line ? `#L${line}` : ''}`;
    return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(p.sourceDoc)}</a>`;
  };

  return provenance.map((p) => `
    <div class="prov">
      <span class="loc">${repoLink(p)} · ${esc(p.sourceLocation)}${
        p.claimId ? ` · <span class="claim-id">${esc(p.claimId)}</span>` : ''}</span>
      ${p.excerpt ? `<blockquote>“${esc(p.excerpt)}”</blockquote>` : ''}
      ${p.url ? `<div class="prov-source">Cites <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${
        esc(p.sourceTitle || p.url)}</a></div>` : ''}
      ${p.note ? `<div>${esc(p.note)}</div>` : ''}
    </div>`).join('');
}

const nodeBtn = (n: GraphNode) =>
  `<button class="linkish" data-goto-node="${n.id}">${esc(n.label)}</button>`;

export class DetailPanel {
  constructor(private el: HTMLElement, private state: AppState, private a11yEl: HTMLElement) {}

  render(): void {
    const { selection } = this.state;
    let html = '';
    let a11y = 'Nothing selected.';
    if (selection.kind === 'node' && selection.id) {
      const node = this.state.data.nodeById.get(selection.id);
      if (node) { html = this.nodeHtml(node); a11y = this.nodeA11y(node); }
    } else if (selection.kind === 'edge' && selection.id) {
      const edge = this.state.data.edgeById.get(selection.id);
      if (edge) { html = this.edgeHtml(edge); a11y = `Relationship selected: ${edge.description}`; }
    } else if (selection.kind === 'flow' && selection.id) {
      const flow = this.state.data.flowById.get(selection.id);
      if (flow) { html = this.flowHtml(flow); a11y = this.flowNarration(flow); }
    } else if (selection.pathNodeIds?.length) {
      html = this.pathHtml(selection.pathNodeIds);
      a11y = `Path traced through ${selection.pathNodeIds.length} entities.`;
    } else {
      // Only promise a funding trail in corpora that actually carry one.
      const trail = this.state.data.graph.edges.some((e) => e.financial)
        ? 'evidence, and funding paths' : 'evidence, and provenance';
      html = `<p class="muted">Select a node or edge to see its details, ${trail}.
        Shift-click a second node to trace a path between them.</p>`;
    }
    this.el.innerHTML = html;
    this.a11yEl.textContent = a11y;
    if (selection.kind === 'flow' && selection.id) {
      const flow = this.state.data.flowById.get(selection.id);
      if (flow) this.renderSankey(flow);
    }
  }

  // ---------------------------------------------------------------- node ---
  private nodeHtml(node: GraphNode): string {
    const d = this.state.data;
    const style = styleFor(node);
    const inEdges = d.inEdges.get(node.id) ?? [];
    const outEdges = d.outEdges.get(node.id) ?? [];
    const flows = d.flowsByNode.get(node.id) ?? [];

    const attrs = node.attrs ?? {};
    const attrRows: string[] = [];
    if (attrs.costUSD != null) attrRows.push(`<tr><td>Budget</td><td class="amount">${fmtUSDFull(attrs.costUSD as number)}</td></tr>`);
    if (attrs.category) attrRows.push(`<tr><td>Category</td><td>${esc(String(attrs.category))}</td></tr>`);
    if (attrs.phase) attrRows.push(`<tr><td>Phase</td><td>${esc(String(attrs.phase))}</td></tr>`);
    if (attrs.completionRaw) attrRows.push(`<tr><td>Est. completion</td><td>${esc(String(attrs.completionRaw))}</td></tr>`);
    if (attrs.locationText) attrRows.push(`<tr><td>Location</td><td class="small">${esc(String(attrs.locationText))}</td></tr>`);
    if (attrs.statusNarrative && attrs.statusNarrative !== 'N/A') attrRows.push(`<tr><td>Status note</td><td class="small">${esc(String(attrs.statusNarrative))}</td></tr>`);
    if (attrs.role) attrRows.push(`<tr><td>Role</td><td>${esc(String(attrs.role))}</td></tr>`);
    if (attrs.url) attrRows.push(`<tr><td>URL</td><td class="small"><a href="${esc(String(attrs.url))}" target="_blank" rel="noopener" style="color:var(--accent)">${esc(String(attrs.url))}</a></td></tr>`);
    if (attrs.rubricScore) attrRows.push(`<tr><td>Rubric</td><td>${esc(String(attrs.rubricScore))}</td></tr>`);

    const edgeList = (edges: GraphEdge[], direction: 'in' | 'out') => edges.slice(0, 30).map((e) => {
      const otherId = direction === 'out' ? e.target : e.source;
      const other = d.nodeById.get(otherId);
      if (!other) return '';
      const amt = e.financial?.amountUSD != null ? ` <span class="amount">${fmtUSD(e.financial.amountUSD)}</span>` : '';
      const arrow = direction === 'out' ? '→' : '←';
      return `<div class="flow-stage"><span class="arrow">${arrow}</span>
        <span><button class="linkish" data-goto-edge="${e.id}">${e.type}</button>${amt}
        ${nodeBtn(other)} ${statusBadge(e.evidenceStatus)}</span></div>`;
    }).join('');

    const flowList = flows.map((f) =>
      `<div class="flow-stage"><span class="arrow">$</span><span>
        <button class="linkish" data-goto-flow="${f.id}">${esc(f.label)}</button>
        <span class="amount ${f.amountUSD == null ? 'unknown' : ''}">${fmtUSD(f.amountUSD)}</span>
        ${statusBadge(f.evidenceStatus)}</span></div>`).join('');

    const questions = this.state.data.questions
      .filter((q) => q.relatedNodeIds?.some((rid) => rid === node.id))
      .map((q) => `<li class="small muted">${esc(q.question)}
        ${q.status === 'answered' ? '<span class="badge status-externally_verified">answered</span>'
          : q.status === 'partially_answered' ? '<span class="badge status-proposed">partial</span>' : ''}
        ${q.answer ? `<div style="margin-top:2px"><b>Answer:</b> ${esc(q.answer)}</div>` : ''}</li>`).join('');

    return `
      <h2>${esc(node.label)}</h2>
      <div>${badge(`${style.icon} ${node.type}`)} ${statusBadge(node.evidenceStatus)} ${badge(node.repo)}</div>
      ${node.description ? `<p class="small">${esc(node.description)}</p>` : ''}
      ${node.notes ? `<p class="small muted">Note: ${esc(node.notes)}</p>` : ''}
      ${node.aliases?.length ? `<p class="small muted">Also known as: ${esc(node.aliases.join(', '))}</p>` : ''}
      ${attrRows.length ? `<table class="data"><tbody>${attrRows.join('')}</tbody></table>` : ''}
      <div style="margin-top:8px">
        <button class="mini" data-action="focus-node" data-id="${node.id}">Focus neighborhood</button>
        <button class="mini" data-action="follow-money" data-id="${node.id}">Follow the money</button>
      </div>
      ${flows.length ? `<h3>Funding flows (${flows.length})</h3>${flowList}` : ''}
      ${outEdges.length ? `<h3>Outgoing (${outEdges.length})</h3>${edgeList(outEdges, 'out')}` : ''}
      ${inEdges.length ? `<h3>Incoming (${inEdges.length})</h3>${edgeList(inEdges, 'in')}` : ''}
      ${questions ? `<h3>Open questions</h3><ul style="padding-left:16px;margin:4px 0">${questions}</ul>` : ''}
      <h3>Provenance</h3>${provHtml(node.provenance, node.repo)}
    `;
  }

  private nodeA11y(node: GraphNode): string {
    const d = this.state.data;
    const degree = (d.inEdges.get(node.id)?.length ?? 0) + (d.outEdges.get(node.id)?.length ?? 0);
    const cost = node.attrs?.costUSD != null ? ` Documented budget ${fmtUSDFull(node.attrs.costUSD as number)}.` : '';
    return `Selected ${node.type} "${node.label}", evidence status ${node.evidenceStatus.replace(/_/g, ' ')}, ` +
      `${degree} relationships.${cost} ${node.description ?? ''}`;
  }

  // ---------------------------------------------------------------- edge ---
  private edgeHtml(edge: GraphEdge): string {
    const d = this.state.data;
    const src = d.nodeById.get(edge.source);
    const tgt = d.nodeById.get(edge.target);
    const fin = edge.financial;
    return `
      <h2>${edge.type.replace(/_/g, ' ')}</h2>
      <div>${statusBadge(edge.evidenceStatus)} ${badge(`confidence: ${edge.confidence}`)}</div>
      <p class="small">${esc(edge.description)}</p>
      <div class="flow-stage"><span>${src ? nodeBtn(src) : esc(edge.source)}</span>
        <span class="arrow">→</span><span>${tgt ? nodeBtn(tgt) : esc(edge.target)}</span></div>
      ${fin ? `
        <h3>Financial details</h3>
        <table class="data"><tbody>
          <tr><td>Amount</td><td class="amount ${fin.amountUSD == null ? 'unknown' : ''}">${fmtUSDFull(fin.amountUSD)}</td></tr>
          <tr><td>Status</td><td>${FINANCIAL_STATUS_LABELS[fin.status] ?? fin.status}</td></tr>
          ${fin.mechanism ? `<tr><td>Mechanism</td><td>${esc(fin.mechanism)}</td></tr>` : ''}
          ${fin.fundingPeriod ? `<tr><td>Period</td><td>${esc(fin.fundingPeriod)}</td></tr>` : ''}
          ${fin.restricted != null ? `<tr><td>Restricted</td><td>${fin.restricted ? 'Yes' : 'No'}</td></tr>` : ''}
          ${fin.restrictions ? `<tr><td>Restrictions</td><td class="small">${esc(fin.restrictions)}</td></tr>` : ''}
        </tbody></table>` : ''}
      ${edge.flowId ? `<p><button class="linkish" data-goto-flow="${edge.flowId}">Open full funding flow →</button></p>` : ''}
      ${edge.notes ? `<p class="small muted">${esc(edge.notes)}</p>` : ''}
      <h3>Provenance</h3>${provHtml(edge.provenance, edge.repo)}
    `;
  }

  // ---------------------------------------------------------------- flow ---
  private flowHtml(flow: FinancialFlow): string {
    const d = this.state.data;
    const activeIdx = this.state.selection.flowStageIndex ?? -1;
    const stages = flow.stages.map((s, i) => {
      const from = d.nodeById.get(s.from);
      const to = d.nodeById.get(s.to);
      const unknownEnd = to?.type === 'UnknownEntity' || from?.type === 'UnknownEntity';
      return `<div class="flow-stage ${i === activeIdx ? 'stage-active' : ''}">
        <span class="arrow">${i + 1}.</span>
        <span>
          ${from ? nodeBtn(from) : esc(s.from)} <span class="arrow">→</span> ${to ? nodeBtn(to) : esc(s.to)}
          <span class="amount ${s.amountUSD == null ? 'unknown' : ''}">${fmtUSD(s.amountUSD)}</span>
          ${statusBadge(s.evidenceStatus)} ${unknownEnd ? badge('unknown endpoint', 'status-unknown') : ''}
          ${s.mechanism ? `<div class="small muted">${esc(s.mechanism)}</div>` : ''}
          ${s.note ? `<div class="small muted">${esc(s.note)}</div>` : ''}
        </span></div>`;
    }).join('');

    const r = flow.rollup;
    const rollupRows = r ? [
      ['Originating', r.originatingUSD], ['Committed', r.committedUSD],
      ['Disbursed', r.disbursedUSD], ['Reaching final beneficiary', r.reachingFinalUSD],
    ].map(([label, v]) =>
      `<tr><td>${label}</td><td class="amount ${v == null ? 'unknown' : ''}">${fmtUSDFull(v as number | null)}</td></tr>`
    ).join('') : '';

    return `
      <h2>${esc(flow.label)}</h2>
      <div>${statusBadge(flow.evidenceStatus)} ${badge(`money: ${FINANCIAL_STATUS_LABELS[flow.status] ?? flow.status}`)} ${badge(`confidence: ${flow.confidence}`)}</div>
      ${flow.purpose ? `<p class="small">${esc(flow.purpose)}</p>` : ''}
      <p class="small"><span class="muted">Plain language:</span> ${esc(this.flowNarration(flow))}</p>
      <div style="margin:8px 0">
        <button class="mini" data-action="flow-step" data-dir="-1">← Prev stage</button>
        <button class="mini" data-action="flow-step" data-dir="1">Next stage →</button>
        <button class="mini" data-action="follow-money" data-id="${flow.stages[0]?.from ?? ''}">Highlight in graph</button>
      </div>
      <h3>Stages</h3>${stages}
      <h3>Flow diagram</h3><div id="sankey-box"></div>
      ${r ? `<h3>Roll-up ${r.isEstimate ? badge('estimate', 'status-inferred') : ''}</h3>
        <table class="data"><tbody>${rollupRows}
          ${r.pctReachingFinal != null ? `<tr><td>% reaching final</td><td>${r.pctReachingFinal}%</td></tr>` : ''}
        </tbody></table>
        ${r.methodology ? `<p class="small muted">${esc(r.methodology)}</p>` : ''}` : ''}
      ${flow.restrictions ? `<h3>Restrictions</h3><p class="small">${esc(flow.restrictions)}</p>` : ''}
      ${flow.unknowns?.length ? `<h3>Unanswered</h3><ul style="padding-left:16px;margin:4px 0">${flow.unknowns.map((u) => `<li class="small muted">${esc(u)}</li>`).join('')}</ul>` : ''}
      <h3>Provenance</h3>${provHtml(flow.provenance, flow.repo)}
    `;
  }

  /** Plain-language explanation of a funding flow. */
  flowNarration(flow: FinancialFlow): string {
    const d = this.state.data;
    const name = (id: string) => d.nodeById.get(id)?.label ?? id;
    const parts: string[] = [];
    for (const s of flow.stages) {
      const amt = s.amountUSD != null ? ` (${fmtUSD(s.amountUSD)})` : ' (amount unknown)';
      const verb = s.evidenceStatus === 'unknown' ? 'is presumed to move' :
        s.evidenceStatus === 'inferred' ? 'is inferred to move' :
        s.evidenceStatus === 'proposed' ? 'would move' :
        s.evidenceStatus === 'disputed' ? 'reportedly moves (disputed relevance)' : 'moves';
      parts.push(`money ${verb} from ${name(s.from)} to ${name(s.to)}${amt}`);
    }
    const status = FINANCIAL_STATUS_LABELS[flow.status] ?? flow.status;
    return `In this flow, ${parts.join('; then ')}. Overall status: ${status.toLowerCase()}.` +
      (flow.unknowns?.length ? ` Open questions remain: ${flow.unknowns[0]}` : '');
  }

  private pathHtml(pathIds: string[]): string {
    const d = this.state.data;
    const steps = pathIds.map((id, i) => {
      const node = d.nodeById.get(id);
      if (!node) return '';
      let edgeDesc = '';
      if (i > 0) {
        const between = d.edgesBetween(pathIds[i - 1], id);
        edgeDesc = between.map((e) => `<div class="small muted">· ${e.type} ${statusBadge(e.evidenceStatus)} ${e.financial?.amountUSD != null ? `<span class="amount">${fmtUSD(e.financial.amountUSD)}</span>` : ''}</div>`).join('');
      }
      return `${edgeDesc}<div class="flow-stage"><span class="arrow">${i + 1}.</span><span>${nodeBtn(node)} <span class="muted small">${node.type}</span></span></div>`;
    }).join('');
    return `<h2>Path trace</h2>
      <p class="small muted">Shortest connection between the two selected entities (${pathIds.length} nodes).</p>
      ${steps}
      <p><button class="mini" data-action="clear-path">Clear path</button></p>`;
  }

  // -------------------------------------------------------------- sankey ---
  private renderSankey(flow: FinancialFlow): void {
    const box = this.el.querySelector('#sankey-box');
    if (!box) return;
    const width = 330, height = Math.max(120, 60 * flow.stages.length);
    const ids = new Map<string, number>();
    const nodes: { name: string; unknown: boolean }[] = [];
    const idx = (nid: string) => {
      if (!ids.has(nid)) {
        const n = this.state.data.nodeById.get(nid);
        ids.set(nid, nodes.length);
        nodes.push({ name: n?.label ?? nid, unknown: n?.type === 'UnknownEntity' });
      }
      return ids.get(nid)!;
    };
    const links = flow.stages.map((s) => ({
      source: idx(s.from), target: idx(s.to),
      value: s.amountUSD ?? 1, unknownAmount: s.amountUSD == null,
      status: s.evidenceStatus,
    }));

    try {
      const gen = sankey<{ name: string; unknown: boolean }, { unknownAmount: boolean; status: string }>()
        .nodeWidth(10).nodePadding(18).extent([[4, 4], [width - 4, height - 4]]);
      const graph = gen({ nodes: nodes.map((n) => ({ ...n })), links: links.map((l) => ({ ...l })) });
      const svg = d3.create('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%');
      svg.append('g').selectAll('path').data(graph.links).join('path')
        .attr('d', sankeyLinkHorizontal())
        .attr('fill', 'none')
        .attr('stroke', (l) => l.unknownAmount ? '#98a2b3' : '#68d16f')
        .attr('stroke-opacity', 0.45)
        .attr('stroke-width', (l) => Math.max(2, l.width ?? 2))
        .attr('stroke-dasharray', (l) => l.unknownAmount ? '4 3' : null);
      const nodeG = svg.append('g').selectAll('g').data(graph.nodes).join('g');
      nodeG.append('rect')
        .attr('x', (n) => n.x0!).attr('y', (n) => n.y0!)
        .attr('width', (n) => n.x1! - n.x0!).attr('height', (n) => Math.max(2, n.y1! - n.y0!))
        .attr('fill', (n) => n.unknown ? '#98a2b3' : '#5aa2ff');
      nodeG.append('text')
        .attr('x', (n) => (n.x0! < width / 2 ? n.x1! + 5 : n.x0! - 5))
        .attr('y', (n) => (n.y0! + n.y1!) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', (n) => (n.x0! < width / 2 ? 'start' : 'end'))
        .attr('font-size', 9.5).attr('fill', '#c9d4e4')
        .text((n) => n.name.length > 34 ? n.name.slice(0, 32) + '…' : n.name);
      box.appendChild(svg.node()!);
      const note = document.createElement('p');
      note.className = 'small muted';
      note.textContent = 'Dashed gray ribbons: undocumented amounts (drawn at minimal width, not to scale).';
      box.appendChild(note);
    } catch {
      box.innerHTML = '<p class="small muted">Flow diagram unavailable for this flow topology.</p>';
    }
  }
}
