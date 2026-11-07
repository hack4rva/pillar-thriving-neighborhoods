import type { EvidenceStatus, GraphEdge, GraphNode } from './types';

/**
 * Visual language. Semantic categories are differentiated by shape + color +
 * border/dash treatment + label, never color alone. Evidence status controls
 * line style (solid documented, dashed proposed, dotted inferred/unverified,
 * red-tinted disputed, gray dashed unknown).
 */

export interface TypeStyle {
  group: string;
  color: string;
  shape: 'sphere' | 'box' | 'octahedron' | 'cone' | 'torus' | 'tetrahedron' | 'icosahedron' | 'cylinder' | 'wiresphere';
  icon: string; // 1-2 char code shown in legend and 2D fallback
}

const T = (group: string, color: string, shape: TypeStyle['shape'], icon: string): TypeStyle =>
  ({ group, color, shape, icon });

/**
 * Hues carry the semantic group (red problems, amber people, blue government,
 * teal organizations, green money, violet interventions, slate knowledge).
 * Values are held dark enough to stay legible as filled shapes against the
 * light canvas and as legend swatches carrying white text.
 */
export const TYPE_STYLES: Record<string, TypeStyle> = {
  Problem: T('Problems & needs', '#d13b3b', 'icosahedron', 'P!'),
  Need: T('Problems & needs', '#c26a12', 'octahedron', 'N'),
  Risk: T('Problems & needs', '#a8322a', 'cone', 'R!'),

  Population: T('People & communities', '#c8901a', 'sphere', 'Po'),
  Community: T('People & communities', '#c8901a', 'sphere', 'Co'),
  ConstituentGroup: T('People & communities', '#a97400', 'sphere', 'G'),
  Person: T('People & communities', '#d9ad4a', 'sphere', 'Pe'),

  GovernmentAgency: T('Government', '#1f6feb', 'box', 'Gv'),
  LegislativeBody: T('Government', '#14509c', 'box', 'Lg'),
  DecisionPoint: T('Government', '#5b90e0', 'tetrahedron', 'D?'),

  Organization: T('Organizations', '#128a78', 'box', 'O'),
  Nonprofit: T('Organizations', '#0f7a63', 'box', 'Np'),
  Foundation: T('Organizations', '#0f7a63', 'box', 'F'),
  University: T('Organizations', '#1a8fb0', 'box', 'U'),
  Vendor: T('Organizations', '#5f8c80', 'box', 'V'),
  Employer: T('Organizations', '#128a78', 'box', 'E'),
  TrainingProvider: T('Organizations', '#128a78', 'box', 'T'),
  Investor: T('Organizations', '#128a78', 'box', 'I'),
  Donor: T('Organizations', '#128a78', 'box', 'Dn'),

  Fund: T('Money', '#1f8a3f', 'cylinder', '$'),
  Grant: T('Money', '#4d9420', 'cylinder', '$G'),
  Budget: T('Money', '#1f8a3f', 'cylinder', '$B'),
  Contract: T('Money', '#6b8f14', 'cylinder', '$C'),
  Donation: T('Money', '#4d9420', 'cylinder', '$D'),
  Investment: T('Money', '#4d9420', 'cylinder', '$I'),
  TaxIncentive: T('Money', '#4d9420', 'cylinder', '$T'),
  Legislation: T('Money', '#187a5c', 'tetrahedron', 'L§'),

  Program: T('Interventions', '#7a3fd0', 'torus', 'Pg'),
  Project: T('Interventions', '#6242c4', 'sphere', 'Pj'),
  Proposal: T('Interventions', '#9a63e0', 'cone', 'Pr'),
  Policy: T('Interventions', '#4f5fd4', 'tetrahedron', 'Pl'),
  Service: T('Interventions', '#94409f', 'torus', 'Sv'),
  Credential: T('Interventions', '#7a3fd0', 'torus', 'Cr'),
  JobFamily: T('Interventions', '#7a3fd0', 'sphere', 'J'),
  Outcome: T('Interventions', '#199e80', 'octahedron', 'Ou'),

  GeographicRegion: T('Knowledge & context', '#4f6c8f', 'sphere', 'Ge'),
  Dataset: T('Knowledge & context', '#1287ac', 'box', 'Ds'),
  Evidence: T('Knowledge & context', '#5c8168', 'octahedron', 'Ev'),
  Claim: T('Knowledge & context', '#7d7458', 'octahedron', 'Cl'),
  ResearchQuestion: T('Knowledge & context', '#9c8100', 'tetrahedron', '?'),

  UnknownEntity: T('Unknown', '#6b7688', 'wiresphere', '??'),
};

export const DEFAULT_STYLE: TypeStyle = T('Other', '#5f6b7e', 'sphere', '·');

export const styleFor = (node: GraphNode): TypeStyle => TYPE_STYLES[node.type] ?? DEFAULT_STYLE;

export interface EdgeStyle {
  dash: number[] | null; // null = solid
  colorOverride: string | null;
  opacity: number;
  label: string;
}

export const EVIDENCE_EDGE_STYLES: Record<EvidenceStatus, EdgeStyle> = {
  documented: { dash: null, colorOverride: null, opacity: 0.85, label: 'documented (solid)' },
  externally_verified: { dash: null, colorOverride: null, opacity: 0.95, label: 'externally verified (solid)' },
  proposed: { dash: [4, 2.5], colorOverride: null, opacity: 0.7, label: 'proposed (dashed)' },
  reported_but_unverified: { dash: [1.2, 2.2], colorOverride: null, opacity: 0.6, label: 'reported, unverified (dotted)' },
  inferred: { dash: [1.2, 2.2], colorOverride: null, opacity: 0.55, label: 'inferred (dotted)' },
  hypothetical: { dash: [1.2, 3.2], colorOverride: null, opacity: 0.5, label: 'hypothetical (sparse dotted)' },
  disputed: { dash: [5, 2], colorOverride: '#c62828', opacity: 0.8, label: 'disputed (red dashed)' },
  unknown: { dash: [2.5, 2.5], colorOverride: '#7b8798', opacity: 0.55, label: 'unknown (gray dashed)' },
};

/** Base edge color by semantic family (financial = money green, evidential = sage, structural = slate). */
export function edgeBaseColor(edge: GraphEdge): string {
  if (edge.financial) return EDGE_FAMILY_COLORS.money;
  if (['HAS_EVIDENCE', 'SUPPORTED_BY', 'CONTRADICTED_BY', 'INFERRED_FROM', 'CITED_BY'].includes(edge.type)) return EDGE_FAMILY_COLORS.evidence;
  if (['AFFECTS', 'EXPERIENCES_NEED', 'FAILS_TO_REACH'].includes(edge.type)) return EDGE_FAMILY_COLORS.affects;
  return EDGE_FAMILY_COLORS.structural;
}

/** Shared by the renderer and the legend so the two never drift apart. */
export const EDGE_FAMILY_COLORS = {
  money: '#1f8a3f',
  evidence: '#5c8168',
  affects: '#c26a12',
  structural: '#6b7c96',
} as const;

export function edgeWidth(edge: GraphEdge): number {
  const amount = edge.financial?.amountUSD;
  if (amount == null) return edge.financial ? 1.2 : 0.6;
  // $500K -> ~1.1, $5M -> ~2.2, $50M -> ~3.3, $90M -> ~3.6
  return Math.max(0.8, (Math.log10(amount) - 4.6) * 1.1);
}

export const FINANCIAL_STATUS_LABELS: Record<string, string> = {
  proposed: 'Proposed', approved: 'Approved', committed: 'Committed',
  disbursed: 'Disbursed', partially_disbursed: 'Partially disbursed',
  completed: 'Completed', canceled: 'Canceled', unknown: 'Unknown',
};
