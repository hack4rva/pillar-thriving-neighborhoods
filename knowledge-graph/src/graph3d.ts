import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import type { AppState } from './state';
import type { GraphEdge, GraphNode } from './types';
import { styleFor, EVIDENCE_EDGE_STYLES, edgeBaseColor, edgeWidth } from './visual';
import { fmtUSD, escapeHtml } from './data';

interface SimNode { id: string; node: GraphNode; x?: number; y?: number; z?: number }
interface SimLink { id: string; source: string | SimNode; target: string | SimNode; edge: GraphEdge }
interface Coords { x: number; y: number; z: number }

const LABEL_METRIC_THRESHOLD = 6.4;
const LARGE_GRAPH_THRESHOLD = 2500;

// Annotation/provenance nodes carry little structural signal; recede them when
// the network is idle (nothing selected) so the funded spine reads clearly.
const CONTEXT_TYPES = new Set(['ResearchQuestion', 'Evidence', 'Claim', 'Person', 'Dataset']);

/** Fog of War tiers: how solidly a graph element is known. */
type FogTier = 'lit' | 'haze' | 'disputed' | 'void';

function fogTier(evidenceStatus: string, nodeType?: string): FogTier {
  if (nodeType === 'UnknownEntity' || evidenceStatus === 'unknown') return 'void';
  if (evidenceStatus === 'disputed') return 'disputed';
  if (evidenceStatus === 'documented' || evidenceStatus === 'externally_verified') return 'lit';
  return 'haze'; // proposed / reported_but_unverified / inferred / hypothetical
}

export class Graph3D {
  private fg: ForceGraph3DInstance<SimNode, SimLink>;
  private simNodes = new Map<string, SimNode>();
  private lastKey = '';
  private frames = 0;
  /** Nodes an open research question is attached to (glowing markers in fog mode). */
  private questionNodeIds: Set<string> | null = null;
  fps = 0;
  renderedNodes = 0;
  renderedLinks = 0;

  constructor(private el: HTMLElement, private state: AppState,
              private onNodeClick: (id: string, shift: boolean) => void,
              private onLinkClick: (id: string) => void,
              private onBackground: () => void) {
    const Ctor = ForceGraph3D as unknown as {
      new (element: HTMLElement, config?: object): ForceGraph3DInstance<SimNode, SimLink>;
    };
    this.fg = new Ctor(el, { controlType: 'orbit' })
      .backgroundColor('#10141c')
      .showNavInfo(false)
      .nodeId('id')
      .linkSource('source')
      .linkTarget('target')
      .nodeThreeObject((n) => this.buildNodeObject(n))
      .nodeLabel((n) => this.nodeTooltip(n.node))
      .linkLabel((l) => this.linkTooltip(l.edge))
      .linkColor((l) => this.linkColorFor(l.edge))
      .linkOpacity(0.55)
      .linkWidth((l) => this.isHighlighted(l) ? edgeWidth(l.edge) + 1.2 : edgeWidth(l.edge))
      // three-forcegraph has no native dashed lines: render non-solid evidence
      // statuses as custom THREE.Line objects with LineDashedMaterial.
      .linkThreeObject(((l: SimLink) => this.buildDashedLink(l)) as never)
      .linkPositionUpdate(((obj: THREE.Object3D, coords: { start: Coords; end: Coords }) =>
        this.updateDashedLink(obj, coords)) as never)
      .linkDirectionalArrowLength(3.2)
      .linkDirectionalArrowRelPos(0.58)
      .linkCurvature(0)
      .onNodeClick((n, ev) => this.onNodeClick(n.id, ev.shiftKey))
      .onLinkClick((l) => this.onLinkClick(l.edge.id))
      .onBackgroundClick(() => this.onBackground())
      .warmupTicks(60)
      .cooldownTime(6000);

    // Cap repulsion range so disconnected components stay near the main
    // cluster instead of drifting to infinity (which makes zoomToFit frame a
    // mostly empty volume).
    const charge = this.fg.d3Force('charge') as unknown as {
      strength: (s: number) => void; distanceMax?: (d: number) => void;
    } | undefined;
    charge?.strength(-95);
    charge?.distanceMax?.(420);

    const countFps = () => {
      this.frames++;
      requestAnimationFrame(countFps);
    };
    requestAnimationFrame(countFps);
    setInterval(() => { this.fps = this.frames; this.frames = 0; }, 1000);

    new ResizeObserver(() => {
      this.fg.width(el.clientWidth).height(el.clientHeight);
    }).observe(el);
  }

  private isHighlighted(l: SimLink): boolean {
    return this.state.highlightedEdgeIds.has(l.edge.id);
  }

  private hasOpenQuestion(nodeId: string): boolean {
    if (!this.questionNodeIds) {
      this.questionNodeIds = new Set(
        this.state.data.questions.flatMap((q) => q.relatedNodeIds ?? []));
    }
    return this.questionNodeIds.has(nodeId);
  }

  private linkColorFor(edge: GraphEdge): string {
    const normal = EVIDENCE_EDGE_STYLES[edge.evidenceStatus].colorOverride ?? edgeBaseColor(edge);
    if (this.state.mode !== 'fog') return normal;
    switch (fogTier(edge.evidenceStatus)) {
      case 'lit': return normal;
      case 'disputed': return '#8a3030';
      default: return '#222b3c'; // haze/void: recede into the fog
    }
  }

  /** Custom dashed THREE.Line for non-solid evidence statuses; false = default solid link. */
  private buildDashedLink(l: SimLink): THREE.Object3D | false {
    const style = EVIDENCE_EDGE_STYLES[l.edge.evidenceStatus];
    if (!style.dash) return false;
    const fogHaze = this.state.mode === 'fog' && fogTier(l.edge.evidenceStatus) !== 'lit';
    const material = new THREE.LineDashedMaterial({
      color: new THREE.Color(this.linkColorFor(l.edge)),
      transparent: true,
      opacity: this.state.highlightedEdgeIds.size && !this.isHighlighted(l) ? 0.08
        : fogHaze ? 0.2 : style.opacity,
      dashSize: style.dash[0],
      gapSize: style.dash[1],
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6), 3));
    return new THREE.Line(geometry, material);
  }

  private updateDashedLink(obj: THREE.Object3D, { start, end }: { start: Coords; end: Coords }): boolean {
    if (!(obj instanceof THREE.Line)) return false;
    const pos = (obj.geometry as THREE.BufferGeometry).getAttribute('position') as THREE.BufferAttribute;
    pos.setXYZ(0, start.x, start.y, start.z);
    pos.setXYZ(1, end.x, end.y, end.z);
    pos.needsUpdate = true;
    (obj.geometry as THREE.BufferGeometry).computeBoundingSphere();
    obj.computeLineDistances();
    return true;
  }

  private nodeDim(node: GraphNode): boolean {
    const s = this.state;
    if (s.highlightedNodeIds.size && !s.highlightedNodeIds.has(node.id) &&
        s.selection.id !== node.id) return true;
    if (s.timelineYear != null && node.type === 'Project' &&
        (node.attrs?.completionSortKey as number | null) == null) return true;
    // Network mode, nothing engaged: fade context nodes so the spine stands out.
    if (s.mode === 'explore' && !s.highlightedNodeIds.size && !s.selection.id &&
        !s.focusNodeId && CONTEXT_TYPES.has(node.type)) return true;
    return false;
  }

  private buildNodeObject(sim: SimNode): THREE.Object3D {
    const node = sim.node;
    const style = styleFor(node);
    const metric = this.state.data.nodeMetric(node.id);
    const size = metric;
    const dim = this.nodeDim(node);
    const selected = this.state.selection.kind === 'node' && this.state.selection.id === node.id;
    const fog = this.state.mode === 'fog';
    const tier = fogTier(node.evidenceStatus, node.type);

    let color = new THREE.Color(style.color);
    let opacity = dim ? 0.13 : (node.evidenceStatus === 'disputed' ? 0.85 : 0.95);
    let emissive = selected ? new THREE.Color('#ffffff')
      : (node.evidenceStatus === 'disputed' ? new THREE.Color('#5a1717') : new THREE.Color('#000000'));
    let emissiveIntensity = selected ? 0.45 : 0.9;

    if (fog && !selected && !dim) {
      // Documented knowledge glows; everything else recedes into the dark.
      switch (tier) {
        case 'lit':
          emissive = color.clone();
          emissiveIntensity = 0.5;
          break;
        case 'haze':
          color = new THREE.Color('#39445a');
          opacity = 0.3;
          break;
        case 'disputed':
          color = new THREE.Color('#4a1d1d');
          emissive = new THREE.Color('#e06666');
          emissiveIntensity = 0.35;
          opacity = 0.8;
          break;
        case 'void':
          color = new THREE.Color('#05070d');
          emissive = new THREE.Color('#2b1a4d');
          emissiveIntensity = 1.0;
          opacity = 0.95;
          break;
      }
    }
    if (fog && selected && tier === 'void' && !dim) {
      // Selection must not un-void the void: stay dark, glow purple.
      color = new THREE.Color('#0a0d18');
      emissive = new THREE.Color('#8a6bff');
      emissiveIntensity = 0.9;
      opacity = 0.98;
    }

    const material = new THREE.MeshLambertMaterial({
      color, transparent: true, opacity,
      wireframe: style.shape === 'wiresphere' && !(fog && tier === 'void'),
      emissive, emissiveIntensity,
    });

    let geometry: THREE.BufferGeometry;
    switch (style.shape) {
      case 'box': geometry = new THREE.BoxGeometry(size * 1.5, size * 1.5, size * 1.5); break;
      case 'octahedron': geometry = new THREE.OctahedronGeometry(size); break;
      case 'cone': geometry = new THREE.ConeGeometry(size * 0.9, size * 1.8, 12); break;
      case 'torus': geometry = new THREE.TorusGeometry(size * 0.8, size * 0.35, 10, 20); break;
      case 'tetrahedron': geometry = new THREE.TetrahedronGeometry(size * 1.2); break;
      case 'icosahedron': geometry = new THREE.IcosahedronGeometry(size); break;
      case 'cylinder': geometry = new THREE.CylinderGeometry(size, size, size * 0.6, 18); break;
      case 'wiresphere': geometry = new THREE.SphereGeometry(size, 8, 6); break;
      default: geometry = new THREE.SphereGeometry(size, 12, 10);
    }
    const mesh = new THREE.Mesh(geometry, material);
    const group = new THREE.Group();
    group.add(mesh);

    if (fog && tier === 'void' && !dim) {
      // Dark halo shell: money emerges from (or vanishes into) this void.
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(size * 2.2, 12, 10),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color('#1a0f33'), transparent: true, opacity: 0.35,
          side: THREE.BackSide,
        }));
      group.add(halo);
    }

    const question = fog && this.hasOpenQuestion(node.id) && !dim;
    if (question) {
      const q = new SpriteText('?');
      q.color = '#ffd76b';
      q.fontWeight = 'bold';
      q.strokeColor = '#3d2e00';
      q.strokeWidth = 0.5;
      q.textHeight = Math.max(5.5, size * 1.1);
      q.position.set(0, size + (tier === 'void' ? size * 1.6 : 2.5) + 3.5, 0);
      group.add(q);
    }

    const showLabel = !dim && (
      fog
        ? (selected || tier === 'void' || tier === 'disputed' || this.state.highlightedNodeIds.has(node.id))
        : (this.state.showAllLabels || selected ||
           this.state.highlightedNodeIds.has(node.id) ||
           metric >= LABEL_METRIC_THRESHOLD ||
           ['Problem', 'Fund', 'UnknownEntity'].includes(node.type))
    );
    if (showLabel) {
      const label = node.label.length > 42 ? node.label.slice(0, 40) + '…' : node.label;
      const sprite = new SpriteText(style.shape === 'wiresphere' ? `? ${label}` : label);
      sprite.color = selected ? '#ffffff' : '#c9d4e4';
      sprite.backgroundColor = 'rgba(16,20,28,0.55)';
      sprite.padding = 1.5;
      sprite.borderRadius = 2;
      sprite.textHeight = selected ? 3.4 : 2.6;
      sprite.position.set(0, size + 4, 0);
      group.add(sprite);
    }
    return group;
  }

  private nodeTooltip(node: GraphNode): string {
    return `<div style="max-width:280px;background:#171d29;border:1px solid #2c3648;border-radius:6px;padding:6px 9px;font-size:12px;color:#dfe6f1">
      <b>${escapeHtml(node.label)}</b><br/>
      <span style="color:#8b98ad">${node.type} · ${node.evidenceStatus.replace(/_/g, ' ')}</span>
    </div>`;
  }

  private linkTooltip(edge: GraphEdge): string {
    const amt = edge.financial ? ` · <span style="color:#68d16f">${fmtUSD(edge.financial.amountUSD)}</span>` : '';
    return `<div style="max-width:300px;background:#171d29;border:1px solid #2c3648;border-radius:6px;padding:6px 9px;font-size:12px;color:#dfe6f1">
      <b>${edge.type}</b>${amt}<br/>
      <span style="color:#8b98ad">${escapeHtml(edge.description.slice(0, 140))}</span><br/>
      <span style="color:#8b98ad">${edge.evidenceStatus.replace(/_/g, ' ')}</span>
    </div>`;
  }

  /** Re-derive the rendered subset from state; keeps node positions stable. */
  update(): void {
    const visible = this.state.visibleNodeIds();
    const edges = this.state.visibleEdges(visible);

    // Drop nodes that end up isolated only in money-focused filtering? No —
    // keep all visible nodes so needs-without-funding stay discoverable.
    const nodes: SimNode[] = [];
    for (const id of visible) {
      let sim = this.simNodes.get(id);
      if (!sim) {
        sim = { id, node: this.state.data.nodeById.get(id)! };
        this.simNodes.set(id, sim);
      }
      nodes.push(sim);
    }
    const links: SimLink[] = edges.map((e) => ({ id: e.id, source: e.source, target: e.target, edge: e }));

    this.renderedNodes = nodes.length;
    this.renderedLinks = links.length;

    const key = nodes.map((n) => n.id).sort().join(',') + '|' + links.map((l) => l.id).sort().join(',');
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.fg.graphData({ nodes, links });
    }

    // Refresh style accessors (labels, dimming, highlight widths, particles).
    this.fg
      .nodeThreeObject(this.fg.nodeThreeObject())
      .linkWidth(this.fg.linkWidth())
      .linkColor(this.fg.linkColor())
      .linkThreeObject(this.fg.linkThreeObject());

    // Fog of War atmosphere: deeper black, dimmer connective tissue.
    const fog = this.state.mode === 'fog';
    this.fg.backgroundColor(fog ? '#04060b' : '#10141c').linkOpacity(fog ? 0.35 : 0.55);

    const animate = this.state.animateFlows;
    const highlights = this.state.highlightedEdgeIds;
    this.fg
      .linkDirectionalParticles((l: SimLink) => {
        if (!animate) return 0;
        if (highlights.size) return highlights.has(l.edge.id) ? 4 : 0;
        return l.edge.financial ? 2 : 0;
      })
      .linkDirectionalParticleWidth((l: SimLink) => Math.min(3, edgeWidth(l.edge) * 0.9 + 0.6))
      .linkDirectionalParticleSpeed(0.006)
      .linkDirectionalParticleColor(() => '#9fe8a4');
  }

  isLarge(): boolean {
    return this.renderedNodes + this.renderedLinks > LARGE_GRAPH_THRESHOLD;
  }

  focusOn(id: string): void {
    // When a subgraph is highlighted (money-flow path, neighborhood), frame the
    // whole highlight rather than diving into one node — a tight zoom on a hub
    // node renders an illegible wall of labels.
    if (this.state.highlightedNodeIds.size > 1) {
      this.fg.zoomToFit(900, 60, (n: { id?: string | number }) => this.state.highlightedNodeIds.has(String(n.id)));
      return;
    }
    const sim = this.simNodes.get(id);
    if (!sim || sim.x == null) return;
    const dist = 220;
    const ratio = 1 + dist / Math.hypot(sim.x, sim.y!, sim.z!);
    this.fg.cameraPosition(
      { x: sim.x * ratio, y: sim.y! * ratio, z: sim.z! * ratio },
      { x: sim.x, y: sim.y!, z: sim.z! },
      900
    );
  }

  resetCamera(): void {
    this.fg.zoomToFit(800, 40);
  }

  /** Fit the camera once the initial force layout settles. */
  fitOnceSettled(): void {
    let done = false;
    this.fg.onEngineStop(() => {
      if (done) return;
      done = true;
      this.resetCamera();
    });
    // Fallback in case the engine was already cool.
    setTimeout(() => { if (!done) { done = true; this.resetCamera(); } }, 4000);
  }

  setForces(charge: number, linkDistance: number): void {
    this.fg.d3Force('charge')?.strength(charge);
    const linkForce = this.fg.d3Force('link');
    if (linkForce) (linkForce as unknown as { distance: (d: number) => void }).distance(linkDistance);
    this.fg.d3ReheatSimulation();
  }

  rendererInfo(): string {
    try {
      const gl = (this.fg.renderer() as THREE.WebGLRenderer).getContext();
      const isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;
      return isWebGL2 ? 'WebGL2' : 'WebGL1';
    } catch {
      return 'unknown renderer';
    }
  }
}
