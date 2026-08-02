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

export const TYPE_STYLES: Record<string, TypeStyle> = {
  Problem: T('Problems & needs', '#e06666', 'icosahedron', 'P!'),
  Need: T('Problems & needs', '#e69a50', 'octahedron', 'N'),
  Risk: T('Problems & needs', '#c9564d', 'cone', 'R!'),

  Population: T('People & communities', '#e8c752', 'sphere', 'Po'),
  Community: T('People & communities', '#e8c752', 'sphere', 'Co'),
  ConstituentGroup: T('People & communities', '#d9b23e', 'sphere', 'G'),
  Person: T('People & communities', '#f0e3a1', 'sphere', 'Pe'),

  GovernmentAgency: T('Government', '#5aa2ff', 'box', 'Gv'),
  LegislativeBody: T('Government', '#3f7fd4', 'box', 'Lg'),
  DecisionPoint: T('Government', '#9fc3ff', 'tetrahedron', 'D?'),

  Organization: T('Organizations', '#45c4b0', 'box', 'O'),
  Nonprofit: T('Organizations', '#2ea88b', 'box', 'Np'),
  Foundation: T('Organizations', '#2ea88b', 'box', 'F'),
  University: T('Organizations', '#57b8d8', 'box', 'U'),
  Vendor: T('Organizations', '#8fb3a9', 'box', 'V'),
  Employer: T('Organizations', '#45c4b0', 'box', 'E'),
  TrainingProvider: T('Organizations', '#45c4b0', 'box', 'T'),
  Investor: T('Organizations', '#45c4b0', 'box', 'I'),
  Donor: T('Organizations', '#45c4b0', 'box', 'Dn'),

  Fund: T('Money', '#68d16f', 'cylinder', '$'),
  Grant: T('Money', '#8fd668', 'cylinder', '$G'),
  Budget: T('Money', '#68d16f', 'cylinder', '$B'),
  Contract: T('Money', '#a5cf5f', 'cylinder', '$C'),
  Donation: T('Money', '#8fd668', 'cylinder', '$D'),
  Investment: T('Money', '#8fd668', 'cylinder', '$I'),
  TaxIncentive: T('Money', '#8fd668', 'cylinder', '$T'),
  Legislation: T('Money', '#4fae8a', 'tetrahedron', 'L§'),

  Program: T('Interventions', '#a678e8', 'torus', 'Pg'),
  Project: T('Interventions', '#8f6fd8', 'sphere', 'Pj'),
  Proposal: T('Interventions', '#c9a2f5', 'cone', 'Pr'),
  Policy: T('Interventions', '#7e8ff0', 'tetrahedron', 'Pl'),
  Service: T('Interventions', '#b56fc4', 'torus', 'Sv'),
  Credential: T('Interventions', '#a678e8', 'torus', 'Cr'),
  JobFamily: T('Interventions', '#a678e8', 'sphere', 'J'),
  Outcome: T('Interventions', '#6fd8c0', 'octahedron', 'Ou'),

  GeographicRegion: T('Knowledge & context', '#7d97b8', 'sphere', 'Ge'),
  Dataset: T('Knowledge & context', '#56c3e8', 'box', 'Ds'),
  Evidence: T('Knowledge & context', '#9ab8a4', 'octahedron', 'Ev'),
  Claim: T('Knowledge & context', '#b8b09a', 'octahedron', 'Cl'),
  ResearchQuestion: T('Knowledge & context', '#e0c33c', 'tetrahedron', '?'),

  UnknownEntity: T('Unknown', '#98a2b3', 'wiresphere', '??'),
};

export const DEFAULT_STYLE: TypeStyle = T('Other', '#8b98ad', 'sphere', '·');

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
  disputed: { dash: [5, 2], colorOverride: '#e06666', opacity: 0.8, label: 'disputed (red dashed)' },
  unknown: { dash: [2.5, 2.5], colorOverride: '#98a2b3', opacity: 0.55, label: 'unknown (gray dashed)' },
};

/** Base edge color by semantic family (financial = money green, evidential = sage, structural = slate). */
export function edgeBaseColor(edge: GraphEdge): string {
  if (edge.financial) return '#68d16f';
  if (['HAS_EVIDENCE', 'SUPPORTED_BY', 'CONTRADICTED_BY', 'INFERRED_FROM', 'CITED_BY'].includes(edge.type)) return '#9ab8a4';
  if (['AFFECTS', 'EXPERIENCES_NEED', 'FAILS_TO_REACH'].includes(edge.type)) return '#e69a50';
  return '#6b7c96';
}

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
