import type { AppState } from './state';
import { TYPE_STYLES, EVIDENCE_EDGE_STYLES, FINANCIAL_STATUS_LABELS } from './visual';
import { escapeHtml } from './data';

const esc = escapeHtml;

/** Sidebar: filters, legend, display controls, stats. */
export class Sidebar {
  constructor(
    private filtersEl: HTMLElement,
    private legendEl: HTMLElement,
    private displayEl: HTMLElement,
    private statsEl: HTMLElement,
    private state: AppState,
    private onForces: (charge: number, dist: number) => void,
  ) {}

  buildFilters(): void {
    const d = this.state.data;
    const nodeTypeCounts = new Map<string, number>();
    for (const n of d.graph.nodes) nodeTypeCounts.set(n.type, (nodeTypeCounts.get(n.type) ?? 0) + 1);
    const edgeTypeCounts = new Map<string, number>();
    for (const e of d.graph.edges) edgeTypeCounts.set(e.type, (edgeTypeCounts.get(e.type) ?? 0) + 1);
    const statusCounts = new Map<string, number>();
    for (const r of [...d.graph.nodes, ...d.graph.edges]) statusCounts.set(r.evidenceStatus, (statusCounts.get(r.evidenceStatus) ?? 0) + 1);

    const checkboxes = (name: string, entries: [string, number][], checkedSet: Set<string>) =>
      entries.map(([value, count]) => `
        <label><input type="checkbox" data-filter="${name}" value="${esc(value)}"
          ${checkedSet.has(value) ? 'checked' : ''}/>
          <span>${esc(value.replace(/_/g, ' '))} <span class="muted">(${count})</span></span></label>`).join('');

    const groupToggle = (name: string) => `
      <span style="float:right">
        <button class="linkish small" data-check-all="${name}">all</button> ·
        <button class="linkish small" data-check-none="${name}">none</button>
      </span>`;

    // Node types grouped by visual group.
    const byGroup = new Map<string, [string, number][]>();
    for (const [type, count] of [...nodeTypeCounts.entries()].sort()) {
      const group = TYPE_STYLES[type]?.group ?? 'Other';
      if (!byGroup.has(group)) byGroup.set(group, []);
      byGroup.get(group)!.push([type, count]);
    }
    const nodeTypeHtml = [...byGroup.entries()].map(([group, entries]) => `
      <details ${group === 'Money' || group === 'Problems & needs' ? 'open' : ''}>
        <summary class="small">${esc(group)}</summary>
        ${checkboxes('nodeTypes', entries, this.state.filters.nodeTypes)}
      </details>`).join('');

    this.filtersEl.innerHTML = `
      <div class="filter-group">
        <div class="ft">Repository</div>
        ${checkboxes('repos', d.graph.meta.repos.map((r) => [r, d.graph.nodes.length]), this.state.filters.repos)}
      </div>
      <div class="filter-group">
        <div class="ft">Node types ${groupToggle('nodeTypes')}</div>
        ${nodeTypeHtml}
      </div>
      <div class="filter-group">
        <div class="ft">Edge types ${groupToggle('edgeTypes')}</div>
        <details><summary class="small">${edgeTypeCounts.size} types</summary>
        ${checkboxes('edgeTypes', [...edgeTypeCounts.entries()].sort(), this.state.filters.edgeTypes)}
        </details>
      </div>
      <div class="filter-group">
        <div class="ft">Evidence status ${groupToggle('evidenceStatuses')}</div>
        ${checkboxes('evidenceStatuses', [...statusCounts.entries()].sort(), this.state.filters.evidenceStatuses)}
      </div>
      ${d.graph.edges.some((e) => e.financial) ? `
      <div class="filter-group">
        <div class="ft">Financial status</div>
        ${checkboxes('financialStatuses', Object.keys(FINANCIAL_STATUS_LABELS).map((s) => {
          const count = d.graph.edges.filter((e) => e.financial?.status === s).length;
          return [s, count] as [string, number];
        }).filter(([, c]) => c > 0), this.state.filters.financialStatuses)}
        <label><input type="checkbox" data-filter-flag="includeNonFinancial"
          ${this.state.filters.includeNonFinancial ? 'checked' : ''}/> include non-financial edges</label>
      </div>
      <div class="filter-group">
        <div class="ft">Amount range (USD)</div>
        <label>min <input type="number" data-amount="min" placeholder="0" min="0" step="100000"/></label>
        <label>max <input type="number" data-amount="max" placeholder="∞" min="0" step="100000"/></label>
      </div>` : ''}
    `;

    this.filtersEl.addEventListener('change', (ev) => {
      const input = ev.target as HTMLInputElement;
      const filterName = input.dataset.filter as keyof typeof this.state.filters | undefined;
      if (filterName && input.type === 'checkbox') {
        const set = this.state.filters[filterName] as Set<string>;
        if (input.checked) set.add(input.value); else set.delete(input.value);
        this.state.notify();
      } else if (input.dataset.filterFlag === 'includeNonFinancial') {
        this.state.filters.includeNonFinancial = input.checked;
        this.state.notify();
      } else if (input.dataset.amount) {
        const v = input.value === '' ? null : Number(input.value);
        if (input.dataset.amount === 'min') this.state.filters.amountMin = v;
        else this.state.filters.amountMax = v;
        this.state.notify();
      }
    });
    this.filtersEl.addEventListener('click', (ev) => {
      const btn = ev.target as HTMLElement;
      const all = btn.dataset.checkAll; const none = btn.dataset.checkNone;
      const name = all ?? none;
      if (!name) return;
      ev.preventDefault();
      const set = this.state.filters[name as keyof typeof this.state.filters] as Set<string>;
      this.filtersEl.querySelectorAll<HTMLInputElement>(`input[data-filter="${name}"]`).forEach((cb) => {
        cb.checked = !!all;
        if (all) set.add(cb.value); else set.delete(cb.value);
      });
      this.state.notify();
    });
  }

  buildLegend(): void {
    const groups = new Map<string, { type: string; color: string; icon: string; shape: string }[]>();
    const present = new Set(this.state.data.graph.nodes.map((n) => n.type));
    for (const [type, style] of Object.entries(TYPE_STYLES)) {
      if (!present.has(type)) continue;
      if (!groups.has(style.group)) groups.set(style.group, []);
      groups.get(style.group)!.push({ type, color: style.color, icon: style.icon, shape: style.shape });
    }
    const nodeRows = [...groups.entries()].map(([group, items]) => `
      <div class="lg-row" style="font-weight:600;color:var(--text)">${esc(group)}</div>
      ${items.map((it) => `
        <div class="lg-row"><span class="swatch" style="background:${it.color};${it.shape === 'wiresphere' ? 'background:transparent;border:1px dashed #98a2b3;color:#98a2b3' : ''}">${it.icon}</span>
        ${esc(it.type)} <span class="muted">(${it.shape})</span></div>`).join('')}
    `).join('');

    const edgeRows = Object.entries(EVIDENCE_EDGE_STYLES).map(([status, style]) => `
      <div class="lg-row">
        <span class="edge-sample" style="border-top-style:${style.dash ? (style.dash[0] < 2 ? 'dotted' : 'dashed') : 'solid'};border-top-color:${style.colorOverride ?? '#8b98ad'}"></span>
        ${esc(status.replace(/_/g, ' '))}
      </div>`).join('');

    this.legendEl.innerHTML = `
      ${nodeRows}
      <hr/>
      <div class="lg-row" style="font-weight:600;color:var(--text)">Edge evidence status</div>
      ${edgeRows}
      <hr/>
      <div class="lg-row"><span class="edge-sample" style="border-top-color:#68d16f;border-top-width:3px"></span> money (thicker = larger amount)</div>
      <div class="lg-row"><span class="edge-sample" style="border-top-color:#e69a50"></span> affects / needs</div>
      <div class="lg-row"><span class="edge-sample" style="border-top-color:#9ab8a4"></span> evidence links</div>
      <div class="lg-row muted">Node size = connections + attached documented money. Moving particles show money direction (optional).</div>
    `;
  }

  buildDisplayControls(): void {
    this.displayEl.innerHTML = `
      <label>Charge strength <input type="range" id="force-charge" min="-300" max="-20" value="-95"/></label>
      <label>Link distance <input type="range" id="force-dist" min="10" max="120" value="35"/></label>
      <label><input type="checkbox" id="toggle-animate" ${this.state.animateFlows ? 'checked' : ''}/> animate money flow</label>
      <label><input type="checkbox" id="toggle-labels" ${this.state.showAllLabels ? 'checked' : ''}/> show all labels</label>
      <label>Focus depth (hops)
        <input type="range" id="focus-hops" min="1" max="4" value="${this.state.focusHops}"/></label>
    `;
    const charge = this.displayEl.querySelector<HTMLInputElement>('#force-charge')!;
    const dist = this.displayEl.querySelector<HTMLInputElement>('#force-dist')!;
    const reapply = () => this.onForces(Number(charge.value), Number(dist.value));
    charge.addEventListener('input', reapply);
    dist.addEventListener('input', reapply);
    this.displayEl.querySelector<HTMLInputElement>('#toggle-animate')!.addEventListener('change', (e) => {
      this.state.animateFlows = (e.target as HTMLInputElement).checked;
      this.state.notify();
    });
    this.displayEl.querySelector<HTMLInputElement>('#toggle-labels')!.addEventListener('change', (e) => {
      this.state.showAllLabels = (e.target as HTMLInputElement).checked;
      this.state.notify();
    });
    this.displayEl.querySelector<HTMLInputElement>('#focus-hops')!.addEventListener('input', (e) => {
      this.state.focusHops = Number((e.target as HTMLInputElement).value);
      if (this.state.focusNodeId) this.state.notify();
    });
  }

  renderStats(fps: number, nodes: number, links: number, renderer: string): void {
    this.statsEl.innerHTML =
      `fps ${fps} · ${nodes} nodes · ${links} edges<br/>` +
      `${renderer} · ${esc(this.state.data.graph.meta.generatedAt.slice(0, 10))}` +
      (this.state.focusNodeId ? `<br/>focus: ${esc(this.state.data.nodeById.get(this.state.focusNodeId)?.label ?? '')}` : '');
  }
}
