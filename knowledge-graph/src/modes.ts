import type { AppState } from './state';
import type { GraphEdge, GraphNode } from './types';
import { fmtUSD, fmtUSDFull, escapeHtml } from './data';

const esc = escapeHtml;
const nodeBtn = (n: GraphNode) => `<button class="linkish" data-goto-node="${n.id}">${esc(n.label)}</button>`;
const statusBadge = (s: string) => `<span class="badge status-${s}">${esc(s.replace(/_/g, ' '))}</span>`;

export const MODE_HELP: Record<string, string> = {
  overview: `<strong>Overview.</strong> The capital program at a glance — where the money goes by
    category, the biggest projects, how far along the pipeline is, and which documented needs have
    no funding. Click any block, bar, or need to dig in. Switch to <b>Network</b> for the full graph.`,
  explore: `<strong>Network mode.</strong> The full knowledge graph. Orbit (drag), zoom (scroll),
    pan (right-drag). Click a node or edge for details and provenance; shift-click a second node to
    trace a path. Context nodes are dimmed until selected — use filters to bring them forward.`,
  money: `<strong>Money Flow mode.</strong> Click any fund, budget, grant, program, or project to
    highlight every downstream financial path: intermediaries, amounts at each stage, restrictions,
    and unknown endpoints. Money direction is animated; step through stages in the panel.`,
  beneficiary: `<strong>Beneficiary mode.</strong> Click a population or group (amber spheres) to see
    which programs claim to serve them, who administers and funds those programs, how much is
    documented vs proposed, and which of their needs remain unfunded.`,
  problem: `<strong>Problem-Space mode.</strong> Click a problem (red icosahedra) to unfold its needs,
    affected groups, institutions with authority, proposed interventions and their funding, risks,
    and open research questions.`,
  timeline: `<strong>Timeline mode.</strong> Scrub the year slider to see CIP projects appear by their
    estimated completion date. Projects with no documented date are dimmed, never hidden silently.`,
  fog: `<strong>Fog of War mode.</strong> The graph shows the shape of our <em>ignorance</em>.
    Certainty is drawn as ink on paper: documented facts stay solid and saturated, unverified
    claims bleach out toward the background, disputed items burn red, and undocumented endpoints
    become pale ghosts ringed in violet — that is where money arrives from or disappears to with
    no source on record. Amber <b style="color:#a15c00">?</b> markers sit exactly where an open
    research question attaches. The fainter a thing looks, the less we actually know about it.`,
  needs: `<strong>Needs vs Money board.</strong> Every documented need on the left; the corpus's
    funding flows on the right; a line wherever money is connected to a need through a funded
    intervention. Click any card for details and provenance.`,
};

/** Beneficiary and problem-space report renderers + money-flow highlighting. */
export class Modes {
  constructor(private state: AppState) {}

  /** Highlight all downstream financial paths from a node (Money Flow mode). */
  followMoney(nodeId: string): void {
    const { edges, nodes } = this.state.data.downstreamFinancial(nodeId);
    // Also include upstream money one hop back so origins are visible.
    for (const e of this.state.data.inEdges.get(nodeId) ?? []) {
      if (e.financial) { edges.push(e); nodes.add(e.source); }
    }
    this.state.clearHighlights();
    for (const e of edges) this.state.highlightedEdgeIds.add(e.id);
    for (const n of nodes) this.state.highlightedNodeIds.add(n);
    this.state.notify();
  }

  highlightFlow(flowId: string): void {
    const flow = this.state.data.flowById.get(flowId);
    if (!flow) return;
    this.state.clearHighlights();
    for (const s of flow.stages) {
      this.state.highlightedNodeIds.add(s.from);
      this.state.highlightedNodeIds.add(s.to);
    }
    for (const e of this.state.data.graph.edges) {
      if (e.flowId === flowId) this.state.highlightedEdgeIds.add(e.id);
      else if (flow.stages.some((s) => s.from === e.source && s.to === e.target)) {
        this.state.highlightedEdgeIds.add(e.id);
      }
    }
  }

  highlightNeighborhood(nodeId: string, hops: number): void {
    this.state.clearHighlights();
    const hood = this.state.data.neighborhood(nodeId, hops);
    for (const id of hood) this.state.highlightedNodeIds.add(id);
    for (const e of this.state.data.graph.edges) {
      if (hood.has(e.source) && hood.has(e.target)) this.state.highlightedEdgeIds.add(e.id);
    }
  }

  isBeneficiaryType(node: GraphNode): boolean {
    return ['Population', 'Community', 'ConstituentGroup'].includes(node.type);
  }

  beneficiaryReport(node: GraphNode): string {
    const d = this.state.data;
    const incoming = d.inEdges.get(node.id) ?? [];
    const servingEdges = incoming.filter((e) =>
      ['DELIVERS_SERVICE_TO', 'SERVES', 'BENEFITS', 'TRAINS'].includes(e.type));
    const affectingProblems = incoming.filter((e) => e.type === 'AFFECTS')
      .map((e) => d.nodeById.get(e.source)).filter(Boolean) as GraphNode[];
    const needs = (d.outEdges.get(node.id) ?? []).filter((e) => e.type === 'EXPERIENCES_NEED')
      .map((e) => d.nodeById.get(e.target)).filter(Boolean) as GraphNode[];

    const servers = servingEdges.map((e) => d.nodeById.get(e.source)).filter(Boolean) as GraphNode[];
    // Programs/projects/proposals claiming to serve this group + how they're funded.
    let documentedTotal = 0;
    let proposedCount = 0;
    const serverRows = servers.map((s) => {
      const funders = (d.inEdges.get(s.id) ?? []).filter((e) => e.financial);
      const admins = (d.inEdges.get(s.id) ?? []).filter((e) => e.type === 'ADMINISTERS')
        .map((e) => d.nodeById.get(e.source)).filter(Boolean) as GraphNode[];
      let amount = 0;
      for (const f of funders) {
        if (f.financial?.amountUSD && ['documented', 'externally_verified'].includes(f.evidenceStatus)) {
          amount += f.financial.amountUSD;
        }
        if (f.evidenceStatus === 'proposed') proposedCount++;
      }
      documentedTotal += amount;
      if (s.evidenceStatus === 'proposed') proposedCount++;
      return `<tr>
        <td>${nodeBtn(s)} ${statusBadge(s.evidenceStatus)}</td>
        <td class="small">${admins.map(nodeBtn).join(', ') || '<span class="muted">not documented</span>'}</td>
        <td class="small">${funders.length ? funders.map((f) => {
          const src = d.nodeById.get(f.source);
          return `${src ? nodeBtn(src) : ''} <span class="amount ${f.financial!.amountUSD == null ? 'unknown' : ''}">${fmtUSD(f.financial!.amountUSD)}</span>`;
        }).join('<br/>') : '<span class="muted">no documented funder</span>'}</td>
      </tr>`;
    }).join('');

    // Which of this group's needs have any funded addresser?
    const fundedTargets = new Set(d.graph.edges.filter((e) => e.financial).map((e) => e.target));
    const needRows = needs.map((need) => {
      const addressers = d.graph.edges.filter((e) => e.type === 'ADDRESSES' && e.target === need.id)
        .map((e) => d.nodeById.get(e.source)).filter(Boolean) as GraphNode[];
      const funded = addressers.some((a) => fundedTargets.has(a.id));
      return `<tr>
        <td>${nodeBtn(need)}</td>
        <td>${addressers.length ? addressers.map(nodeBtn).join(', ') : '<span class="muted">none</span>'}</td>
        <td>${funded ? '<span class="badge status-documented">has funded intervention</span>'
                     : '<span class="badge status-disputed">UNFUNDED</span>'}</td>
      </tr>`;
    }).join('');

    return `
      <h2>${esc(node.label)}</h2>
      <div><span class="badge">${esc(node.type)}</span> ${statusBadge(node.evidenceStatus)} <span class="badge">beneficiary view</span></div>
      ${node.description ? `<p class="small">${esc(node.description)}</p>` : ''}
      <h3>Problems affecting this group (${affectingProblems.length})</h3>
      ${affectingProblems.map((p) => `<div class="flow-stage"><span class="arrow">!</span><span>${nodeBtn(p)}</span></div>`).join('') || '<p class="small muted">None documented.</p>'}
      <h3>Programs & services claiming to serve this group (${servers.length})</h3>
      ${servers.length ? `<table class="data"><thead><tr><th>Program</th><th>Administered by</th><th>Funded by</th></tr></thead><tbody>${serverRows}</tbody></table>` : '<p class="small muted">None documented.</p>'}
      <p class="small">Documented funding attached to serving programs: <span class="amount">${fmtUSDFull(documentedTotal)}</span>
        · Proposed (not delivered): <b>${proposedCount}</b> item(s), $0 documented</p>
      <h3>Documented needs & funding status (${needs.length})</h3>
      ${needs.length ? `<table class="data"><thead><tr><th>Need</th><th>Addressed by</th><th>Funding</th></tr></thead><tbody>${needRows}</tbody></table>` : '<p class="small muted">None documented.</p>'}
      <h3>Outcome evidence</h3>
      <p class="small muted">No outcome measurements are documented anywhere in this corpus — every claim of
      service delivery to this group currently lacks outcome evidence (see the Open Questions tab).</p>
    `;
  }

  problemReport(node: GraphNode): string {
    const d = this.state.data;
    const out = d.outEdges.get(node.id) ?? [];
    const incoming = d.inEdges.get(node.id) ?? [];
    const affected = out.filter((e) => e.type === 'AFFECTS').map((e) => d.nodeById.get(e.target)).filter(Boolean) as GraphNode[];
    const needs = incoming.filter((e) => e.type === 'ASSOCIATED_WITH' && d.nodeById.get(e.source)?.type === 'Need')
      .map((e) => d.nodeById.get(e.source)) as GraphNode[];
    const interventions = incoming.filter((e) => e.type === 'ADDRESSES')
      .map((e) => d.nodeById.get(e.source)).filter(Boolean) as GraphNode[];
    const claims = incoming.filter((e) => d.nodeById.get(e.source)?.type === 'Claim')
      .map((e) => d.nodeById.get(e.source)) as GraphNode[];
    const datasets = incoming.filter((e) => d.nodeById.get(e.source)?.type === 'Dataset')
      .map((e) => d.nodeById.get(e.source)) as GraphNode[];

    // Institutions with authority: agencies within 2 hops.
    const hood = d.neighborhood(node.id, 2);
    const authorities = [...hood].map((id) => d.nodeById.get(id)!)
      .filter((n) => n && ['GovernmentAgency', 'LegislativeBody'].includes(n.type));

    const interventionRows = interventions.map((iv) => {
      const funders = (d.inEdges.get(iv.id) ?? []).filter((e) => e.financial);
      const risks = (d.inEdges.get(iv.id) ?? []).filter((e) => d.nodeById.get(e.source)?.type === 'Risk')
        .map((e) => d.nodeById.get(e.source)) as GraphNode[];
      return `<tr>
        <td>${nodeBtn(iv)} ${statusBadge(iv.evidenceStatus)}</td>
        <td class="small">${funders.length ? funders.map((f) => `<span class="amount ${f.financial!.amountUSD == null ? 'unknown' : ''}">${fmtUSD(f.financial!.amountUSD)}</span>`).join(', ') : '<span class="badge status-disputed">no funding attached</span>'}</td>
        <td class="small">${risks.map(nodeBtn).join('; ') || ''}</td>
      </tr>`;
    }).join('');

    const questions = this.state.data.questions.filter((q) =>
      q.relatedNodeIds?.some((rid) => hood.has(rid)));

    return `
      <h2>${esc(node.label)}</h2>
      <div><span class="badge">Problem</span> ${statusBadge(node.evidenceStatus)}
        ${node.attrs?.rubricScore ? `<span class="badge">${esc(String(node.attrs.rubricScore))}</span>` : ''}
        <span class="badge">problem-space view</span></div>
      ${node.description ? `<p class="small">${esc(node.description)}</p>` : ''}
      <h3>Documented needs (${needs.length})</h3>
      ${needs.map((n) => `<div class="flow-stage"><span class="arrow">→</span><span>${nodeBtn(n)}</span></div>`).join('') || '<p class="small muted">None linked.</p>'}
      <h3>Affected groups (${affected.length})</h3>
      ${affected.map((n) => `<div class="flow-stage"><span class="arrow">→</span><span>${nodeBtn(n)}</span></div>`).join('') || '<p class="small muted">None linked.</p>'}
      <h3>Institutions with authority (${authorities.length})</h3>
      ${authorities.map((n) => `<div class="flow-stage"><span class="arrow">◆</span><span>${nodeBtn(n)}</span></div>`).join('')}
      <h3>Interventions & their funding (${interventions.length})</h3>
      ${interventions.length ? `<table class="data"><thead><tr><th>Intervention</th><th>Funding</th><th>Risks</th></tr></thead><tbody>${interventionRows}</tbody></table>` : '<p class="small muted">None documented.</p>'}
      <h3>Key claims & constraints (${claims.length})</h3>
      ${claims.map((c) => `<div class="flow-stage"><span class="arrow">"</span><span>${nodeBtn(c)} ${statusBadge(c.evidenceStatus)}</span></div>`).join('') || '<p class="small muted">None linked.</p>'}
      ${datasets.length ? `<h3>Relevant datasets (${datasets.length})</h3>${datasets.map((ds) => `<div class="flow-stage"><span class="arrow">▤</span><span>${nodeBtn(ds)} ${statusBadge(ds.evidenceStatus)}</span></div>`).join('')}` : ''}
      <h3>Open research questions (${questions.length})</h3>
      <ul style="padding-left:16px;margin:4px 0">${questions.slice(0, 12).map((q) => `<li class="small muted">${esc(q.question)}</li>`).join('')}</ul>
    `;
  }

  /** Quick-pick lists shown in the sidebar per mode. */
  quickPicks(): string {
    const d = this.state.data;
    const list = (nodes: GraphNode[]) =>
      nodes.map((n) => `<div>· ${nodeBtn(n)}</div>`).join('');
    switch (this.state.mode) {
      case 'money': {
        const moneyNodes = d.graph.nodes.filter((n) =>
          ['Fund', 'Grant', 'Legislation', 'Budget'].includes(n.type));
        return `<hr style="border-color:var(--border)"/><div class="small"><b>Start from:</b>${list(moneyNodes)}</div>`;
      }
      case 'beneficiary': {
        const groups = d.graph.nodes.filter((n) => this.isBeneficiaryType(n));
        return `<hr style="border-color:var(--border)"/><div class="small"><b>Pick a group:</b>${list(groups)}</div>`;
      }
      case 'problem': {
        const problems = d.graph.nodes.filter((n) => n.type === 'Problem');
        return `<hr style="border-color:var(--border)"/><div class="small"><b>Pick a problem:</b>${list(problems)}</div>`;
      }
      case 'fog': {
        const voids = d.graph.nodes.filter((n) => n.type === 'UnknownEntity');
        const questioned = new Set(d.questions.flatMap((q) => q.relatedNodeIds ?? []));
        return `<hr style="border-color:var(--border)"/><div class="small">
          <b>Darkest zones (explicit unknowns):</b>${list(voids)}
          <p class="muted" style="margin:6px 0 0">${d.questions.length} open questions attach to
          ${[...questioned].filter((id) => d.nodeById.has(id)).length} nodes — see the Open Questions tab.</p></div>`;
      }
      default: return '';
    }
  }
}

export function edgeIsFinancial(e: GraphEdge): boolean { return !!e.financial; }
