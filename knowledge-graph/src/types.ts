export type EvidenceStatus =
  | 'documented' | 'externally_verified' | 'proposed' | 'reported_but_unverified'
  | 'inferred' | 'hypothetical' | 'disputed' | 'unknown';

export type FinancialStatus =
  | 'proposed' | 'approved' | 'committed' | 'disbursed' | 'partially_disbursed'
  | 'completed' | 'canceled' | 'unknown';

export interface Provenance {
  sourceDoc: string;
  sourceLocation: string;
  excerpt?: string;
  note?: string;
  evidenceLogId?: string;
  /** Evidence record this element was extracted from, for corpus-derived data. */
  claimId?: string;
  /** Primary source cited by the claim, and its title. */
  url?: string;
  sourceTitle?: string;
}

export interface GraphNode {
  id: string;
  type: string;
  label: string;
  repo: string;
  description?: string;
  aliases?: string[];
  evidenceStatus: EvidenceStatus;
  provenance: Provenance[];
  attrs?: Record<string, unknown>;
  notes?: string;
  extractedAt?: string;
}

export interface FinancialInfo {
  amountUSD: number | null;
  currency: 'USD';
  mechanism?: string | null;
  status: FinancialStatus;
  fundingPeriod?: string | null;
  restricted?: boolean | null;
  restrictions?: string | null;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  description: string;
  repo: string;
  evidenceStatus: EvidenceStatus;
  confidence: 'high' | 'medium' | 'low';
  provenance: Provenance[];
  temporal?: { start?: string | null; end?: string | null; asOf?: string | null };
  financial?: FinancialInfo;
  flowId?: string;
  notes?: string;
  extractedAt?: string;
}

export interface FlowStage {
  from: string;
  to: string;
  mechanism?: string | null;
  amountUSD?: number | null;
  evidenceStatus: EvidenceStatus;
  note?: string;
}

export interface FinancialFlow {
  id: string;
  label: string;
  repo: string;
  purpose?: string;
  stages: FlowStage[];
  amountUSD: number | null;
  currency: 'USD';
  status: FinancialStatus;
  fundingPeriod?: string | null;
  mechanism?: string | null;
  restricted?: boolean | null;
  restrictions?: string | null;
  evidenceStatus: EvidenceStatus;
  confidence: 'high' | 'medium' | 'low';
  provenance: Provenance[];
  rollup?: {
    originatingUSD?: number | null;
    committedUSD?: number | null;
    disbursedUSD?: number | null;
    reachingFinalUSD?: number | null;
    pctReachingFinal?: number | null;
    isEstimate?: boolean;
    methodology?: string;
  };
  unknowns?: string[];
  notes?: string;
}

export interface GraphData {
  meta: {
    schemaVersion: string; generatedAt: string; repos: string[];
    counts: Record<string, number>;
    /** Present in graphs built after the pipeline became multi-pillar. */
    pillarName?: string; shortName?: string; description?: string;
  };
  nodes: GraphNode[];
  edges: GraphEdge[];
  financialFlows: FinancialFlow[];
}

export interface EvidenceRecord {
  id: string;
  claim: string;
  status: string;
  source?: string | null;
  url?: string | null;
  repo: string;
  provenance: Provenance[];
  notes?: string;
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  category: string;
  repo: string;
  relatedNodeIds?: string[];
  provenance: Provenance[];
  /** Set by external research; absent means the question is still open. */
  status?: 'open' | 'partially_answered' | 'answered';
  answer?: string;
}

export interface ReviewItem {
  id: string;
  itemType: string;
  proposed: string;
  sourceExcerpt?: string;
  sourceLocation?: string;
  rationale: string;
  confidence: string;
  alternatives?: string[];
  decisionRequested: string;
}

export interface ExtractionReport {
  generatedAt: string;
  repo: string;
  filesExamined: string[];
  provenanceVerification: Record<string, number>;
  warnings: string[];
  metrics: Record<string, unknown>;
}

// 'explore' is the network-graph mode (labeled "Network" in the UI). 'overview'
// is the default dashboard landing view.
export type Mode = 'overview' | 'explore' | 'money' | 'beneficiary' | 'problem' | 'timeline' | 'fog' | 'needs';

export interface Filters {
  repos: Set<string>;
  nodeTypes: Set<string>;
  edgeTypes: Set<string>;
  evidenceStatuses: Set<string>;
  financialStatuses: Set<string>;
  amountMin: number | null;
  amountMax: number | null;
  includeNonFinancial: boolean;
  yearMax: number | null;
  search: string;
}

export interface Selection {
  kind: 'node' | 'edge' | 'flow' | null;
  id: string | null;
  pathEndpoints?: [string, string];
  pathNodeIds?: string[];
  flowStageIndex?: number;
}
