import { Dataset } from './data';
import { AppState } from './state';
import { Graph3D } from './graph3d';
import { Graph2D } from './graph2d';
import { DetailPanel } from './panels';
import { Sidebar } from './ui';
import { Drawer } from './tables';
import { Modes, MODE_HELP } from './modes';
import { NeedsBoard } from './needsboard';
import { Overview } from './overview';
import type { Mode } from './types';

const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;

async function boot() {
  const data = new Dataset();
  try {
    await data.load();
  } catch (err) {
    $('#detail-content').innerHTML =
      `<p class="muted">Failed to load graph data (${(err as Error).message}). Run <code>make extract</code> first.</p>`;
    return;
  }
  if (!data.graph.nodes.length) {
    $('#detail-content').innerHTML = '<p class="muted">The extracted dataset is empty. Run <code>make extract</code> and reload.</p>';
    return;
  }

  const state = new AppState(data);
  const modes = new Modes(state);
  const panel = new DetailPanel($('#detail-content'), state, $('#a11y-summary'));

  let pathStart: string | null = null;

  const handleNodeClick = (id: string, shift: boolean) => {
    // Selecting from the dashboard has nowhere to render — move to the network.
    if (state.mode === 'overview') setMode('explore');
    if (shift && (pathStart ?? state.selection.id)) {
      const from = pathStart ?? state.selection.id!;
      const path = data.shortestPath(from, id);
      if (path) {
        state.clearHighlights();
        for (const nid of path) state.highlightedNodeIds.add(nid);
        for (let i = 1; i < path.length; i++) {
          for (const e of data.edgesBetween(path[i - 1], path[i])) state.highlightedEdgeIds.add(e.id);
        }
        state.selection = { kind: null, id: null, pathNodeIds: path, pathEndpoints: [from, id] };
        state.notify();
        return;
      }
    }
    pathStart = id;
    if (state.mode === 'money') modes.followMoney(id);
    else if (state.mode === 'beneficiary' || state.mode === 'problem') modes.highlightNeighborhood(id, 2);
    else state.clearHighlights();
    state.select('node', id);
    graph3d.focusOn(id);
  };
  const handleLinkClick = (id: string) => {
    const edge = data.edgeById.get(id);
    if (edge?.flowId && state.mode === 'money') {
      modes.highlightFlow(edge.flowId);
      state.select('flow', edge.flowId);
    } else {
      state.select('edge', id);
    }
  };
  const handleBackground = () => {
    state.clearHighlights();
    state.selection = { kind: null, id: null };
    pathStart = null;
    state.notify();
  };

  const graph3d = new Graph3D($('#graph3d'), state, handleNodeClick, handleLinkClick, handleBackground);
  const graph2d = new Graph2D($('#graph2d'), state, handleNodeClick, handleLinkClick);
  const needsBoard = new NeedsBoard($('#needsboard'), state);
  const sidebar = new Sidebar($('#filters'), $('#legend'), $('#display-controls'), $('#stats'), state,
    (c, dist) => graph3d.setForces(c, dist));
  const drawer = new Drawer($('#drawer-content'), state);
  const overview = new Overview($('#overview'), state,
    (id) => handleNodeClick(id, false),
    (mode) => setMode(mode as Mode));

  // The dashboard is an opaque overlay over the graph area. We deliberately keep
  // the 3D graph rendering underneath (rather than hiding it) so switching modes
  // never has to re-reveal a stalled WebGL canvas.
  const applyModeLayout = () => {
    const boardMode = state.mode === 'needs';
    ($('#overview') as HTMLElement).hidden = state.mode !== 'overview';
    ($('#needsboard') as HTMLElement).hidden = !boardMode;
    $('#graph3d').style.visibility = (state.view2d || boardMode) ? 'hidden' : 'visible';
    ($('#graph2d') as HTMLElement).hidden = !state.view2d || boardMode;
    $('#timeline-bar').hidden = state.mode !== 'timeline';
  };

  /**
   * Not every pillar has the data a view needs. Only the Built Environment
   * corpus contains a capital-projects export, so its costs, phases, and
   * funding flows exist nowhere else. Rather than render empty dashboards,
   * hide the views whose source data is absent.
   */
  const applyCapabilities = () => {
    const hasFundedProjects = data.graph.nodes.some(
      (n) => n.type === 'Project' && ((n.attrs?.costUSD as number) ?? 0) > 0,
    );
    const hasFlows = (data.graph.financialFlows?.length ?? 0) > 0;

    const shortName = data.graph.meta?.shortName;
    if (shortName) {
      $('#pillar-name').textContent = shortName;
      document.title = `${shortName} Knowledge Graph`;
    }
    // "Funding Explorer" would be a false promise without a money layer.
    $('#app-subtitle').textContent = hasFlows
      ? 'Knowledge Graph & Funding Explorer'
      : 'Knowledge Graph & Evidence Explorer';
    if (!hasFlows) {
      const flowsTab = document.querySelector<HTMLElement>('[role="tab"][data-tab="flows"]');
      if (flowsTab) flowsTab.hidden = true;
    }

    const hasType = (...types: string[]) =>
      data.graph.nodes.some((n) => types.includes(n.type));
    const supported: Partial<Record<Mode, boolean>> = {
      overview: hasFundedProjects,
      timeline: hasFundedProjects,
      money: hasFlows,
      needs: hasFlows && hasType('Need'),
      problem: hasType('Problem'),
      beneficiary: hasType('Population', 'ConstituentGroup'),
    };
    document.querySelectorAll<HTMLButtonElement>('#mode-switch button').forEach((b) => {
      const mode = b.dataset.mode as Mode;
      if (supported[mode] === false) b.hidden = true;
    });
    if (supported[state.mode] === false) {
      const first = document.querySelector<HTMLButtonElement>('#mode-switch button:not([hidden])');
      state.mode = (first?.dataset.mode as Mode) ?? 'explore';
    }
  };

  const setMode = (mode: Mode) => {
    state.mode = mode;
    document.querySelectorAll<HTMLButtonElement>('#mode-switch button').forEach((b) => {
      const active = b.dataset.mode === mode;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    if (mode !== 'timeline') state.timelineYear = null;
    state.clearHighlights();
    applyModeLayout();
    state.notify();
  };

  sidebar.buildFilters();
  sidebar.buildLegend();
  sidebar.buildDisplayControls();

  // ------------------------------------------------------------ rendering --
  const renderDetail = () => {
    const sel = state.selection;
    if (sel.kind === 'node' && sel.id) {
      const node = data.nodeById.get(sel.id);
      if (node) {
        if (state.mode === 'beneficiary' && modes.isBeneficiaryType(node)) {
          $('#detail-content').innerHTML = modes.beneficiaryReport(node);
          $('#a11y-summary').textContent = `Beneficiary report for ${node.label}.`;
          return;
        }
        if (state.mode === 'problem' && node.type === 'Problem') {
          $('#detail-content').innerHTML = modes.problemReport(node);
          $('#a11y-summary').textContent = `Problem-space report for ${node.label}.`;
          return;
        }
      }
    }
    panel.render();
  };

  const renderHint = () => {
    const visible = state.visibleNodeIds();
    const hint = $('#graph-hint');
    if (state.mode === 'needs') {
      const needs = data.graph.nodes.filter((n) => n.type === 'Need').length;
      hint.textContent = `Needs vs Money board — ${needs} documented needs vs ${data.graph.financialFlows.length} funding flows.`;
    } else if (state.mode === 'fog') {
      hint.textContent = 'Fog of War — bright = documented · haze = unverified · red = disputed · dark voids = explicit unknowns · ? = open question.';
    } else if (visible.size === 0) {
      hint.textContent = 'No nodes match the current filters — relax filters or press Reset.';
    } else if (state.focusNodeId) {
      hint.textContent = `Focused on ${data.nodeById.get(state.focusNodeId)?.label} (${state.focusHops} hop${state.focusHops > 1 ? 's' : ''}). Press Escape to release.`;
    } else if (state.selection.pathNodeIds) {
      hint.textContent = `Path traced (${state.selection.pathNodeIds.length} nodes). Press Escape to clear.`;
    } else {
      hint.textContent = `${visible.size} entities shown. Click to inspect · shift-click two nodes to trace a path.`;
    }
    const warning = $('#perf-warning');
    if (graph3d.isLarge()) {
      warning.hidden = false;
      warning.textContent = 'Large graph: labels are culled and detail is reduced. Use filters or Focus neighborhood for smoother exploration.';
      state.showAllLabels = false;
    } else {
      warning.hidden = true;
    }
  };

  const renderAll = () => {
    applyModeLayout();
    graph3d.update();
    graph2d.update();
    needsBoard.update();
    if (state.mode === 'overview') overview.render();
    renderDetail();
    drawer.render();
    renderHint();
    $('#mode-help').innerHTML = MODE_HELP[state.mode] + modes.quickPicks();
  };
  state.subscribe(renderAll);

  setInterval(() => sidebar.renderStats(graph3d.fps, graph3d.renderedNodes, graph3d.renderedLinks, graph3d.rendererInfo()), 1000);

  // ------------------------------------------------------------ toolbar ----
  document.querySelectorAll<HTMLButtonElement>('#mode-switch button').forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode as Mode));
  });

  document.querySelectorAll<HTMLButtonElement>('#drawer-tabs button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#drawer-tabs button').forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      state.drawerTab = btn.dataset.tab!;
      drawer.render();
    });
  });

  // Search with suggestions.
  const searchEl = $('#search') as HTMLInputElement;
  const datalist = $('#search-suggestions') as HTMLDataListElement;
  const searchMatches = (q: string) => {
    const lower = q.toLowerCase();
    return data.graph.nodes.filter((n) =>
      n.label.toLowerCase().includes(lower) ||
      n.aliases?.some((a) => a.toLowerCase().includes(lower)) ||
      n.type.toLowerCase() === lower);
  };
  searchEl.addEventListener('input', () => {
    const q = searchEl.value.trim();
    datalist.innerHTML = q.length < 2 ? '' :
      searchMatches(q).slice(0, 12).map((n) => `<option value="${n.label.replace(/"/g, '&quot;')}"></option>`).join('');
  });
  searchEl.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Enter') return;
    const q = searchEl.value.trim();
    if (!q) return;
    const exact = data.graph.nodes.find((n) => n.label === q) ?? searchMatches(q)[0];
    if (exact) handleNodeClick(exact.id, false);
  });

  $('#btn-reset-camera').addEventListener('click', () => graph3d.resetCamera());
  $('#btn-reset-all').addEventListener('click', () => {
    pathStart = null;
    searchEl.value = '';
    state.resetAll();
    sidebar.buildFilters();
    graph3d.resetCamera();
  });
  const btn2d = $('#btn-2d');
  btn2d.addEventListener('click', () => {
    state.view2d = !state.view2d;
    btn2d.setAttribute('aria-pressed', String(state.view2d));
    state.notify(); // renderAll applies view visibility via applyModeLayout
  });

  // Timeline.
  const slider = $('#timeline-slider') as HTMLInputElement;
  const label = $('#timeline-label');
  const applyTimeline = () => {
    const v = Number(slider.value);
    if (v >= Number(slider.max)) {
      state.timelineYear = null;
      label.textContent = 'All time';
    } else {
      state.timelineYear = v;
      const season = ['Winter', 'Spring', 'Summer', 'Fall'][Math.floor((v % 1) * 4)];
      label.textContent = `${season} ${Math.floor(v)}`;
    }
    state.notify();
  };
  slider.addEventListener('input', applyTimeline);
  let playing: number | null = null;
  $('#timeline-play').addEventListener('click', () => {
    if (playing != null) {
      clearInterval(playing);
      playing = null;
      $('#timeline-play').textContent = '▶';
      return;
    }
    slider.value = slider.min;
    $('#timeline-play').textContent = '⏸';
    playing = window.setInterval(() => {
      const next = Number(slider.value) + 0.25;
      slider.value = String(next);
      applyTimeline();
      if (next >= Number(slider.max)) {
        clearInterval(playing!);
        playing = null;
        $('#timeline-play').textContent = '▶';
      }
    }, 350);
  });

  // Delegated clicks for links/buttons rendered inside panels and tables.
  document.body.addEventListener('click', (ev) => {
    const el = (ev.target as HTMLElement).closest('[data-goto-node],[data-goto-edge],[data-goto-flow],[data-action]') as HTMLElement | null;
    if (!el) return;
    if (el.dataset.gotoNode) handleNodeClick(el.dataset.gotoNode, false);
    else if (el.dataset.gotoEdge) state.select('edge', el.dataset.gotoEdge);
    else if (el.dataset.gotoFlow) {
      modes.highlightFlow(el.dataset.gotoFlow);
      state.select('flow', el.dataset.gotoFlow);
    } else if (el.dataset.action === 'focus-node') {
      state.focusNodeId = el.dataset.id!;
      state.notify();
    } else if (el.dataset.action === 'follow-money') {
      modes.followMoney(el.dataset.id!);
    } else if (el.dataset.action === 'flow-step') {
      const dir = Number(el.dataset.dir);
      const flow = state.selection.id ? data.flowById.get(state.selection.id) : null;
      if (flow) {
        const cur = state.selection.flowStageIndex ?? -1;
        state.selection.flowStageIndex = Math.max(0, Math.min(flow.stages.length - 1, cur + dir));
        const stage = flow.stages[state.selection.flowStageIndex];
        state.clearHighlights();
        state.highlightedNodeIds.add(stage.from);
        state.highlightedNodeIds.add(stage.to);
        for (const e of data.edgesBetween(stage.from, stage.to)) state.highlightedEdgeIds.add(e.id);
        state.notify();
        graph3d.focusOn(stage.to);
      }
    } else if (el.dataset.action === 'clear-path') {
      handleBackground();
    }
  });

  // Keyboard shortcuts.
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      if (state.focusNodeId) { state.focusNodeId = null; state.notify(); }
      else handleBackground();
    } else if (ev.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      ev.preventDefault();
      searchEl.focus();
    }
  });

  // Treemap tiling depends on the panel width; re-tile when it changes.
  window.addEventListener('resize', () => { if (state.mode === 'overview') overview.render(); });

  applyCapabilities();
  setMode(state.mode);
  renderAll();
  graph3d.fitOnceSettled();

  // Automation hook for the Playwright validation script (scripts/screenshot.js):
  // shift-clicking a specific 3D node is not reliable headlessly.
  (window as unknown as Record<string, unknown>).__kg = {
    selectNode: (id: string, shift = false) => handleNodeClick(id, shift),
    nodeCount: data.graph.nodes.length,
  };
}

boot();
