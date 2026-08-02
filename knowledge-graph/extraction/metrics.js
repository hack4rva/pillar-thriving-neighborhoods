/** Data-quality metrics over any schema-conformant graph (used by pipeline and tests). */
export function computeMetrics(nodes, edges, flows, evidenceRecords, reviewQueue, brokenEdges, verification) {
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const financialEdges = edges.filter((e) => e.financial);
  const sum = (arr) => arr.reduce((acc, v) => acc + (v ?? 0), 0);

  const documentedFunding = financialEdges.filter(
    (e) => ['documented', 'externally_verified'].includes(e.evidenceStatus) && e.financial.amountUSD != null
  );
  const proposedFunding = financialEdges.filter(
    (e) => ['proposed', 'hypothetical'].includes(e.evidenceStatus) && e.financial.amountUSD != null
  );
  const disbursedEstimate = flows.filter((f) => f.rollup?.disbursedUSD != null);
  const unknownDestinationFlows = flows.filter((f) =>
    f.stages.some((s) => nodeById.get(s.to)?.type === 'UnknownEntity' || s.evidenceStatus === 'unknown')
  );
  const unknownSourceFlows = flows.filter((f) =>
    f.stages.some((s) => nodeById.get(s.from)?.type === 'UnknownEntity')
  );

  // Needs with no funded intervention: a need is "funded" if some node that
  // ADDRESSES it (or the problem it belongs to) receives a FUNDS edge.
  const fundedTargets = new Set(financialEdges.map((e) => e.target));
  const needs = nodes.filter((n) => n.type === 'Need');
  const needsWithNoFunding = needs.filter((need) => {
    const addressers = edges
      .filter((e) => e.type === 'ADDRESSES' && e.target === need.id)
      .map((e) => e.source);
    return !addressers.some((a) => fundedTargets.has(a));
  });

  const claims = nodes.filter((n) => n.type === 'Claim');
  const claimsWithEvidence = new Set(
    edges.filter((e) => e.type === 'HAS_EVIDENCE').map((e) => e.source)
  );
  const claimsLackingPrimaryEvidence = claims.filter((c) => !claimsWithEvidence.has(c.id));

  const withProvenance = [...nodes, ...edges].filter((r) => (r.provenance?.length ?? 0) > 0);

  return {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    financialFlows: flows.length,
    financialEdges: financialEdges.length,
    totalDocumentedFundingUSD: sum(documentedFunding.map((e) => e.financial.amountUSD)),
    totalProposedFundingUSD: sum(proposedFunding.map((e) => e.financial.amountUSD)),
    totalDisbursedUSDEstimate: sum(disbursedEstimate.map((f) => f.rollup.disbursedUSD)),
    disbursedEstimateNote:
      'Estimate: completed-phase CIP projects assumed fully spent; the corpus has no expenditure ledger.',
    flowsWithUnknownDestination: unknownDestinationFlows.length,
    flowsWithUnknownSource: unknownSourceFlows.length,
    fundingWithUnknownDestinationUSD: sum(
      unknownDestinationFlows.map((f) => f.amountUSD).filter((v) => v != null)
    ),
    intendedBeneficiaryNodes: nodes.filter((n) =>
      ['Population', 'Community', 'ConstituentGroup'].includes(n.type)
    ).length,
    needsTotal: needs.length,
    needsWithNoFunding: needsWithNoFunding.map((n) => n.id),
    fundingFlowsWithNoDocumentedOutcome: flows.length,
    outcomeNote: 'No outcome measurements are documented anywhere in the corpus (see q:outcome-measurements).',
    claimsTotal: claims.length,
    claimsLackingPrimaryEvidence: claimsLackingPrimaryEvidence.map((c) => c.id),
    inferredRelationships: edges.filter((e) => e.evidenceStatus === 'inferred').length,
    disputedRelationships: edges.filter((e) => e.evidenceStatus === 'disputed').length,
    reportedButUnverifiedRelationships: edges.filter((e) => e.evidenceStatus === 'reported_but_unverified').length,
    brokenReferences: brokenEdges.length,
    duplicateCandidates: reviewQueue.filter((r) => r.id.startsWith('r:dup-')).length,
    reviewQueueSize: reviewQueue.length,
    evidenceRecords: evidenceRecords.length,
    provenanceCoverage:
      Math.round((withProvenance.length / (nodes.length + edges.length)) * 1000) / 10,
    provenanceVerification: verification,
  };
}
