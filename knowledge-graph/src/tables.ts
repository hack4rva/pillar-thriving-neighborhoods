import type { AppState } from './state';
import { fmtUSD, fmtUSDFull, escapeHtml } from './data';
import { FINANCIAL_STATUS_LABELS } from './visual';

const esc = escapeHtml;

/** Bottom drawer: summary, entity table, flow table, questions, quality, review queue. */
export class Drawer {
  private entitySearch = '';
  private flowSearch = '';
  private entitySort: 'label' | 'type' | 'money' | 'degree' = 'money';

  constructor(private contentEl: HTMLElement, private state: AppState) {
    contentEl.addEventListener('input', (ev) => {
      const input = ev.target as HTMLInputElement;
      if (input.id === 'entity-search') { this.entitySearch = input.value; this.renderPreservingFocus(input.id); }
      if (input.id === 'flow-search') { this.flowSearch = input.value; this.renderPreservingFocus(input.id); }
    });
    contentEl.addEventListener('click', (ev) => {
      const th = (ev.target as HTMLElement).closest('th[data-sort]');
      if (th) {
        this.entitySort = th.getAttribute('data-sort') as typeof this.entitySort;
        this.render();
      }
      const exportBtn = (ev.target as HTMLElement).closest('button[data-export]');
      if (exportBtn) this.export(exportBtn.getAttribute('data-export')!);
    });
  }

  private renderPreservingFocus(focusId: string): void {
    this.render();
    const el = this.contentEl.querySelector<HTMLInputElement>(`#${focusId}`);
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  }

  render(): void {
    switch (this.state.drawerTab) {
      case 'summary': this.contentEl.innerHTML = this.summaryHtml(); break;
      case 'entities': this.contentEl.innerHTML = this.entitiesHtml(); break;
      case 'flows': this.contentEl.innerHTML = this.flowsHtml(); break;
      case 'questions': this.contentEl.innerHTML = this.questionsHtml(); break;
      case 'quality': this.contentEl.innerHTML = this.qualityHtml(); break;
      case 'review': this.contentEl.innerHTML = this.reviewHtml(); break;
    }
  }

  private summaryHtml(): string {
    const m = this.state.data.report.metrics as Record<string, unknown>;
    const chip = (label: string, value: string, cls = '') =>
      `<span class="badge ${cls}" style="font-size:12px;padding:4px 12px">${esc(label)}: <b>${esc(value)}</b></span>`;
    // Money chips describe a layer only some pillars have; showing "$0" where
    // no financial corpus exists would read as a finding rather than an absence.
    const meta = this.state.data.graph.meta;
    const hasMoney = (m.financialFlows as number) > 0;
    const moneyChips = hasMoney ? `
        ${chip('Funding flows', String(m.financialFlows))}
        ${chip('Documented funding', fmtUSD(m.totalDocumentedFundingUSD as number), 'status-documented')}
        ${chip('Proposed funding', fmtUSD(m.totalProposedFundingUSD as number), 'status-proposed')}
        ${chip('Disbursed (estimate)', fmtUSD(m.totalDisbursedUSDEstimate as number), 'status-inferred')}
        ${chip('Flows w/ unknown source', String(m.flowsWithUnknownSource), 'status-unknown')}
        ${chip('Needs with no funding', String((m.needsWithNoFunding as string[]).length), 'status-disputed')}` : '';
    const moneyNotes = hasMoney ? `
      <p class="small muted">Documented, proposed, and disbursed totals are deliberately separate categories — never summed together.
      Disbursed is an estimate (completed-phase projects assumed fully spent; no expenditure ledger exists in the corpus).</p>
      <p class="small">Try: switch to <b>Money Flow</b> mode and click the <b>Richmond CIP capital budget</b> node,
      or open the <b>Funding Flows</b> tab and follow the ARPA flow to the Southside Community Center.</p>` : `
      <p class="small muted">This pillar's corpus contains no financial dataset, so the graph has no funding layer and the
      money-based views are hidden. Everything shown is drawn from the evidence log and source inventory.</p>`;

    return `
      <h3 style="margin:2px 0 6px">Repository: ${esc(meta.repos[0] ?? '')}${
        meta.pillarName ? ` (Richmond Civic Hackathon — ${esc(meta.pillarName)} pillar)` : ''}</h3>
      ${meta.description ? `<p class="small muted" style="max-width:900px">${esc(meta.description)}</p>` : ''}
      <div>
        ${chip('Nodes', String(m.totalNodes))}
        ${chip('Edges', String(m.totalEdges))}${moneyChips}
        ${chip('Provenance coverage', `${m.provenanceCoverage}%`, 'status-documented')}
      </div>${moneyNotes}
    `;
  }

  private entitiesHtml(): string {
    const d = this.state.data;
    const q = this.entitySearch.toLowerCase();
    let rows = d.graph.nodes.filter((n) =>
      !q || n.label.toLowerCase().includes(q) || n.type.toLowerCase().includes(q) ||
      (n.description ?? '').toLowerCase().includes(q));
    const money = (id: string) => {
      let total = 0;
      for (const e of [...(d.inEdges.get(id) ?? []), ...(d.outEdges.get(id) ?? [])]) {
        if (e.financial?.amountUSD) total += e.financial.amountUSD;
      }
      return total;
    };
    const degree = (id: string) => (d.inEdges.get(id)?.length ?? 0) + (d.outEdges.get(id)?.length ?? 0);
    rows = rows.sort((a, b) =>
      this.entitySort === 'label' ? a.label.localeCompare(b.label) :
      this.entitySort === 'type' ? a.type.localeCompare(b.type) :
      this.entitySort === 'degree' ? degree(b.id) - degree(a.id) :
      money(b.id) - money(a.id));
    return `
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:6px">
        <input id="entity-search" type="search" placeholder="Filter entities…" value="${esc(this.entitySearch)}"
          style="background:var(--bg-box);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:5px 8px;width:240px"/>
        <span class="small muted">${rows.length} of ${d.graph.nodes.length}</span>
        <button class="mini" data-export="entities">Export CSV</button>
      </div>
      <table class="data"><thead><tr>
        <th data-sort="label">Entity</th><th data-sort="type">Type</th><th>Evidence</th>
        <th data-sort="money">Attached money</th><th data-sort="degree">Links</th><th>Source</th>
      </tr></thead><tbody>
      ${rows.slice(0, 400).map((n) => `
        <tr>
          <td><button class="linkish" data-goto-node="${n.id}">${esc(n.label)}</button></td>
          <td>${esc(n.type)}</td>
          <td><span class="badge status-${n.evidenceStatus}">${esc(n.evidenceStatus.replace(/_/g, ' '))}</span></td>
          <td class="num">${money(n.id) ? fmtUSD(money(n.id)) : ''}</td>
          <td class="num">${degree(n.id)}</td>
          <td class="small muted">${esc(n.provenance[0]?.sourceDoc ?? '')}</td>
        </tr>`).join('')}
      </tbody></table>`;
  }

  private flowsHtml(): string {
    const d = this.state.data;
    const q = this.flowSearch.toLowerCase();
    const flows = d.graph.financialFlows
      .filter((f) => !q || f.label.toLowerCase().includes(q) || (f.purpose ?? '').toLowerCase().includes(q))
      .sort((a, b) => (b.amountUSD ?? -1) - (a.amountUSD ?? -1));
    return `
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:6px">
        <input id="flow-search" type="search" placeholder="Filter funding flows…" value="${esc(this.flowSearch)}"
          style="background:var(--bg-box);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:5px 8px;width:240px"/>
        <span class="small muted">${flows.length} flows</span>
        <button class="mini" data-export="flows">Export CSV</button>
      </div>
      <table class="data"><thead><tr>
        <th>Flow</th><th>Amount</th><th>Money status</th><th>Evidence</th><th>Stages</th><th>Unknowns</th>
      </tr></thead><tbody>
      ${flows.slice(0, 300).map((f) => `
        <tr>
          <td><button class="linkish" data-goto-flow="${f.id}">${esc(f.label)}</button></td>
          <td class="num ${f.amountUSD == null ? 'muted' : 'amount'}">${fmtUSDFull(f.amountUSD)}</td>
          <td>${esc(FINANCIAL_STATUS_LABELS[f.status] ?? f.status)}</td>
          <td><span class="badge status-${f.evidenceStatus}">${esc(f.evidenceStatus.replace(/_/g, ' '))}</span></td>
          <td class="num">${f.stages.length}</td>
          <td class="small muted">${f.unknowns?.length ? `${f.unknowns.length} open` : ''}</td>
        </tr>`).join('')}
      </tbody></table>`;
  }

  private questionsHtml(): string {
    const all = this.state.data.questions;
    const answered = all.filter((q) => q.status === 'answered').length;
    const partial = all.filter((q) => q.status === 'partially_answered').length;
    const byCat = new Map<string, typeof all>();
    for (const q of all) {
      if (!byCat.has(q.category)) byCat.set(q.category, []);
      byCat.get(q.category)!.push(q);
    }
    const statusBadge = (q: (typeof all)[number]) =>
      q.status === 'answered' ? '<span class="badge status-externally_verified">answered</span>'
      : q.status === 'partially_answered' ? '<span class="badge status-proposed">partial</span>'
      : '<span class="badge status-unknown">open</span>';
    const header = (answered + partial) > 0
      ? `<p class="small muted" style="margin:4px 0 8px">External research (see the data-quality tab) answered
         ${answered} and narrowed ${partial} of these ${all.length} questions. Answered questions stay listed
         with their answers — they document what was unknown in the corpus itself.</p>` : '';
    return header + [...byCat.entries()].map(([cat, qs]) => `
      <h3 style="margin:8px 0 4px">${esc(cat)} (${qs.length})</h3>
      <table class="data"><tbody>
      ${qs.map((q) => `
        <tr>
          <td style="width:55%">${esc(q.question)} ${statusBadge(q)}
            ${q.answer ? `<div class="small" style="margin-top:4px;color:var(--text-muted)"><b>Answer:</b> ${esc(q.answer)}</div>` : ''}</td>
          <td class="small muted">${esc(q.provenance[0]?.sourceDoc ?? '')} · ${esc(q.provenance[0]?.sourceLocation ?? '')}</td>
          <td>${(q.relatedNodeIds ?? []).filter((id) => this.state.data.nodeById.has(id)).map((id) =>
            `<button class="linkish small" data-goto-node="${id}">${esc(this.state.data.nodeById.get(id)!.label)}</button>`).join(' · ')}</td>
        </tr>`).join('')}
      </tbody></table>`).join('');
  }

  private qualityHtml(): string {
    const r = this.state.data.report;
    const m = r.metrics as Record<string, unknown>;
    const row = (k: string, v: unknown, note = '') =>
      `<tr><td>${esc(k)}</td><td>${typeof v === 'number' && k.includes('USD') ? fmtUSDFull(v) : esc(String(v))}</td><td class="small muted">${esc(note)}</td></tr>`;
    return `
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:6px">
        <h3 style="margin:0">Data-quality report</h3>
        <button class="mini" data-export="metrics">Download metrics JSON</button>
        <span class="small muted">generated ${esc(r.generatedAt)}</span>
      </div>
      <table class="data"><tbody>
        ${row('Total nodes', m.totalNodes)}
        ${row('Total edges', m.totalEdges)}
        ${row('Financial flows', m.financialFlows)}
        ${row('Total documented funding USD', m.totalDocumentedFundingUSD, 'CIP dashboard costs; documented commitments only')}
        ${row('Total proposed funding USD', m.totalProposedFundingUSD, 'kept strictly separate from documented')}
        ${row('Total disbursed USD (estimate)', m.totalDisbursedUSDEstimate, String(m.disbursedEstimateNote ?? ''))}
        ${row('Flows with unknown source', m.flowsWithUnknownSource, 'money whose origin is not documented')}
        ${row('Flows with unknown destination', m.flowsWithUnknownDestination, 'money whose endpoint is not documented')}
        ${row('Intended beneficiary nodes', m.intendedBeneficiaryNodes)}
        ${row('Needs with no identified funding', (m.needsWithNoFunding as string[]).join(', '), 'documented needs where no funded intervention addresses them')}
        ${row('Funding flows with no documented outcome', m.fundingFlowsWithNoDocumentedOutcome, String(m.outcomeNote ?? ''))}
        ${row('Claims lacking primary evidence', (m.claimsLackingPrimaryEvidence as string[]).join(', '))}
        ${row('Inferred relationships', m.inferredRelationships)}
        ${row('Disputed relationships', m.disputedRelationships)}
        ${row('Reported-but-unverified relationships', m.reportedButUnverifiedRelationships)}
        ${row('Broken references', m.brokenReferences)}
        ${row('Duplicate candidates', m.duplicateCandidates)}
        ${row('Provenance coverage', `${m.provenanceCoverage}%`, 'records with at least one source citation')}
        ${row('Provenance verification', JSON.stringify(m.provenanceVerification), 'excerpts checked against source files at extraction time; "external" = URL sources from web research')}
        ${m.externalResearch ? row(
          'External research',
          `${(m.externalResearch as Record<string, unknown>).questionsAnswered} answered, ${(m.externalResearch as Record<string, unknown>).questionsPartiallyAnswered} narrowed, ${(m.externalResearch as Record<string, unknown>).evidenceRecords} evidence records (${(m.externalResearch as Record<string, unknown>).researchedAt})`,
          String((m.externalResearch as Record<string, unknown>).note ?? '')) : ''}
        ${row('Files examined', r.filesExamined.length, r.filesExamined.join(', '))}
      </tbody></table>
      ${r.warnings.length ? `<h3>Warnings</h3><ul>${r.warnings.map((w) => `<li class="small muted">${esc(w)}</li>`).join('')}</ul>` : ''}
    `;
  }

  private reviewHtml(): string {
    return `
      <p class="small muted">Records the extraction pipeline could not decide on its own. The graph remains
      functional while these await review.</p>
      <table class="data"><thead><tr><th>Item</th><th>Type</th><th>Rationale</th><th>Decision requested</th><th>Confidence</th></tr></thead><tbody>
      ${this.state.data.reviewQueue.map((r) => `
        <tr>
          <td class="small">${esc(r.proposed)}<div class="muted">${esc(r.sourceLocation ?? '')}</div></td>
          <td>${esc(r.itemType)}</td>
          <td class="small">${esc(r.rationale)}</td>
          <td class="small">${esc(r.decisionRequested)}</td>
          <td><span class="badge">${esc(r.confidence)}</span></td>
        </tr>`).join('')}
      </tbody></table>`;
  }

  private export(kind: string): void {
    const d = this.state.data;
    let content = ''; let filename = ''; let mime = 'text/csv';
    const csvCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    if (kind === 'entities') {
      filename = 'entities.csv';
      content = 'id,label,type,evidenceStatus,sourceDoc\n' + d.graph.nodes.map((n) =>
        [n.id, n.label, n.type, n.evidenceStatus, n.provenance[0]?.sourceDoc ?? ''].map(csvCell).join(',')).join('\n');
    } else if (kind === 'flows') {
      filename = 'funding_flows.csv';
      content = 'id,label,amountUSD,status,evidenceStatus,stages,unknowns\n' + d.graph.financialFlows.map((f) =>
        [f.id, f.label, f.amountUSD ?? '', f.status, f.evidenceStatus, f.stages.length, (f.unknowns ?? []).join('; ')].map(csvCell).join(',')).join('\n');
    } else {
      filename = 'data_quality_metrics.json';
      mime = 'application/json';
      content = JSON.stringify(d.report, null, 2);
    }
    const blob = new Blob([content], { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
