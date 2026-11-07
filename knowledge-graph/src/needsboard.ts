import type { AppState } from './state';
import type { GraphNode } from './types';
import { fmtUSD, fmtUSDFull, escapeHtml } from './data';
import { FINANCIAL_STATUS_LABELS } from './visual';

const esc = escapeHtml;
const TOP_FLOWS = 12;

/**
 * The "orphan board": documented needs on the left, funding flows on the
 * right, an SVG line wherever money reaches a need through a funded
 * intervention. The connection logic is generic; with the current corpus it
 * finds zero connections, which is exactly the finding.
 */
export class NeedsBoard {
  constructor(private el: HTMLElement, private state: AppState) {}

  /** needId → flowIds funding any intervention that ADDRESSES the need. */
  private connections(): Map<string, Set<string>> {
    const d = this.state.data;
    const out = new Map<string, Set<string>>();
    for (const need of d.graph.nodes) {
      if (need.type !== 'Need') continue;
      const addressers = d.graph.edges
        .filter((e) => e.type === 'ADDRESSES' && e.target === need.id)
        .map((e) => e.source);
      for (const a of addressers) {
        for (const e of d.inEdges.get(a) ?? []) {
          if (!e.financial) continue;
          if (!out.has(need.id)) out.set(need.id, new Set());
          if (e.flowId) out.get(need.id)!.add(e.flowId);
        }
      }
    }
    return out;
  }

  update(): void {
    if (this.el.hidden) return;
    const d = this.state.data;
    const needs = d.graph.nodes.filter((n) => n.type === 'Need');
    const conns = this.connections();
    const flows = [...d.graph.financialFlows]
      .sort((a, b) => (b.amountUSD ?? -1) - (a.amountUSD ?? -1));
    const connectedFlowIds = new Set([...conns.values()].flatMap((s) => [...s]));
    const shownFlows = [
      ...flows.filter((f) => connectedFlowIds.has(f.id)),
      ...flows.filter((f) => !connectedFlowIds.has(f.id)).slice(0, TOP_FLOWS),
    ];
    const restCount = flows.length - shownFlows.length;
    const restTotal = flows.filter((f) => !shownFlows.includes(f))
      .reduce((s, f) => s + (f.amountUSD ?? 0), 0);
    const documentedTotal = Number(d.report.metrics.totalDocumentedFundingUSD ?? 0);
    const connectionCount = [...conns.values()].reduce((s, set) => s + set.size, 0);

    const needCard = (need: GraphNode) => {
      const groups = (d.inEdges.get(need.id) ?? [])
        .filter((e) => e.type === 'EXPERIENCES_NEED')
        .map((e) => d.nodeById.get(e.source)).filter(Boolean) as GraphNode[];
      const addressers = d.graph.edges
        .filter((e) => e.type === 'ADDRESSES' && e.target === need.id)
        .map((e) => d.nodeById.get(e.source)).filter(Boolean) as GraphNode[];
      const funded = conns.has(need.id);
      return `<div class="nb-card nb-need ${funded ? 'nb-funded' : 'nb-orphan'}" data-anchor="${need.id}">
        <div class="nb-title"><button class="linkish" data-goto-node="${need.id}">${esc(need.label)}</button></div>
        ${need.description ? `<div class="nb-desc">${esc(need.description.slice(0, 150))}</div>` : ''}
        <div class="nb-meta">
          ${groups.length ? `experienced by ${groups.map((g) => esc(g.label)).join(', ')}` : '<span class="muted">no group linked</span>'}
        </div>
        <div class="nb-meta">
          ${addressers.length
            ? `addressed by ${addressers.length} intervention(s) — <b>none funded</b>`
            : 'no documented intervention'}
        </div>
        <div class="nb-tag">${funded ? '<span class="badge status-documented">FUNDED</span>' : '<span class="badge status-disputed">$0 ATTACHED</span>'}</div>
      </div>`;
    };

    const flowCard = (f: (typeof flows)[number]) => `
      <div class="nb-card nb-flow" data-anchor="${f.id}">
        <div class="nb-title"><button class="linkish" data-goto-flow="${f.id}">${esc(f.label)}</button></div>
        <div class="nb-meta"><span class="amount ${f.amountUSD == null ? 'unknown' : ''}">${fmtUSD(f.amountUSD)}</span>
          · ${esc(FINANCIAL_STATUS_LABELS[f.status] ?? f.status)}
          <span class="badge status-${f.evidenceStatus}">${esc(f.evidenceStatus.replace(/_/g, ' '))}</span></div>
      </div>`;

    this.el.innerHTML = `
      <div class="nb-head">
        <h2>Needs vs Money</h2>
        <p class="small muted">Left: every documented need in the corpus. Right: where the money actually goes
        (${flows.length} flows, ${fmtUSDFull(documentedTotal)} documented). A line means a need receives funding
        through an intervention.</p>
      </div>
      <div class="nb-columns">
        <div class="nb-col" id="nb-needs">
          <h3>Documented needs (${needs.length})</h3>
          ${needs.map(needCard).join('')}
        </div>
        <div class="nb-gap">
          <svg id="nb-lines" aria-hidden="true"></svg>
          ${connectionCount === 0 ? `
            <div class="nb-banner" role="note">
              <div class="nb-zero">0</div>
              <p><b>${needs.length} of ${needs.length} needs have no funding attached.</b></p>
              <p class="small muted">None of the ${fmtUSDFull(documentedTotal)} in documented funding connects
              to any documented need — the needs in this corpus are needs for <em>information tools</em>,
              and no flow targets them. Sources: <code>extraction_report.json → needsWithNoFunding</code>.</p>
            </div>` : `
            <div class="nb-banner" role="note">
              <p><b>${connectionCount} funding connection(s) found.</b></p>
            </div>`}
        </div>
        <div class="nb-col" id="nb-flows">
          <h3>Funding flows (top ${shownFlows.length} of ${flows.length} by amount)</h3>
          ${shownFlows.map(flowCard).join('')}
          ${restCount > 0 ? `<div class="nb-card nb-flow nb-rest muted small">
            + ${restCount} more flows totaling ${fmtUSD(restTotal)} — see the Funding Flows tab.</div>` : ''}
        </div>
      </div>`;

    // Connection lines need final layout positions; draw on the next frame.
    if (connectionCount > 0) requestAnimationFrame(() => this.drawLines(conns));
  }

  private drawLines(conns: Map<string, Set<string>>): void {
    const svg = this.el.querySelector<SVGSVGElement>('#nb-lines');
    if (!svg) return;
    const gapRect = svg.parentElement!.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${gapRect.width} ${gapRect.height}`);
    const anchorY = (id: string) => {
      const card = this.el.querySelector(`[data-anchor="${CSS.escape(id)}"]`);
      if (!card) return null;
      const r = card.getBoundingClientRect();
      return r.top + r.height / 2 - gapRect.top;
    };
    const paths: string[] = [];
    for (const [needId, flowIds] of conns) {
      const y1 = anchorY(needId);
      if (y1 == null) continue;
      for (const flowId of flowIds) {
        const y2 = anchorY(flowId);
        if (y2 == null) continue;
        const w = gapRect.width;
        paths.push(`<path d="M 0 ${y1} C ${w * 0.4} ${y1}, ${w * 0.6} ${y2}, ${w} ${y2}"
          fill="none" stroke="var(--accent-2)" stroke-width="2" opacity="0.8"/>`);
      }
    }
    svg.innerHTML = paths.join('');
  }
}
