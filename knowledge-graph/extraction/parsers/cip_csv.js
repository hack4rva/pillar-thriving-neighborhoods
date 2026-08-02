import { parse } from 'csv-parse/sync';
import {
  readRepoFile, makeNode, makeEdge, nodeId, parseMoney, parseLooseDate, slug,
} from '../lib.js';

const CSV_PATH = 'research/COR_CIP_Dashboard_projects.csv';

const CIP_FUND = 'n:fund:richmond-cip-budget';
const CITY = 'n:region:city-of-richmond';
const ARPA = 'n:legislation:arpa';

/** Map CIP dashboard phase to a financial flow status (documented estimate). */
export function phaseToFinancialStatus(phase) {
  const p = (phase || '').toLowerCase();
  if (p.includes('completed')) return 'completed';
  if (p.includes('construction') && !p.includes('pre')) return 'partially_disbursed';
  // The problem statement describes the dashboard as "125 funded projects",
  // so pre-construction phases are treated as committed, not proposed.
  return 'committed';
}

/**
 * Parse the CIP dashboard export into Project/Person nodes, FUNDS/MANAGES/
 * LOCATED_IN edges, and one financial flow per project.
 *
 * Privacy: manager emails and phone numbers in the CSV are deliberately NOT
 * copied into the graph (see docs/evidence-policy.md); only name + role are
 * kept, since managers appear in a documented public organizational role.
 */
export function parseCipCsv() {
  const raw = readRepoFile(CSV_PATH);
  const rows = parse(raw, { columns: true, skip_empty_lines: true, bom: true, trim: false });

  const nodes = [];
  const edges = [];
  const flows = [];
  const reviewItems = [];
  const seenPeople = new Map();
  const projectIds = new Map();

  for (const row of rows) {
    const objectId = row.OBJECTID;
    const name = (row.Name || '').trim();
    if (!name) continue;
    const rowLoc = `row OBJECTID=${objectId}`;
    const prov = (note) => [{ sourceDoc: CSV_PATH, sourceLocation: rowLoc, ...(note ? { note } : {}) }];

    let pid = nodeId('project', name);
    if (projectIds.has(pid)) pid = nodeId('project', `${name}-${objectId}`);
    projectIds.set(pid, objectId);

    const cost = parseMoney(row.Cost);
    const completion = parseLooseDate(row.Completion);
    const phase = (row.Phase || '').trim();
    const statusNarrative = (row.Status || '').trim();
    const financialStatus = phaseToFinancialStatus(phase);

    nodes.push(makeNode({
      id: pid,
      type: 'Project',
      label: name,
      description: (row.Description || '').trim(),
      evidenceStatus: 'documented',
      provenance: prov(),
      attrs: {
        category: (row.Category || '').trim(),
        costUSD: cost,
        costRaw: (row.Cost || '').trim(),
        locationText: (row.Location || '').trim(),
        phase,
        statusNarrative,
        completionRaw: (row.Completion || '').trim(),
        completionYear: completion?.year ?? null,
        completionSortKey: completion?.sortKey ?? null,
        objectId,
        financialStatus,
      },
    }));

    if (cost === null) {
      reviewItems.push({
        id: `r:cip-missing-cost-${slug(name)}`,
        itemType: 'anomaly',
        proposed: pid,
        sourceExcerpt: `Cost="${row.Cost}"`,
        sourceLocation: `${CSV_PATH} ${rowLoc}`,
        rationale: 'CIP project row has no parseable cost; the FUNDS edge is emitted without an amount.',
        confidence: 'high',
        alternatives: ['Obtain cost from the live CIP dashboard'],
        decisionRequested: 'Confirm project cost from an official source.',
      });
    }

    const flowId = `f:cip-${slug(name)}`;
    edges.push(makeEdge({
      source: CIP_FUND,
      target: pid,
      type: 'FUNDS',
      description: `Richmond CIP budget funds "${name}"${cost !== null ? ` (${row.Cost.trim()})` : ' (amount not parseable)'}`,
      evidenceStatus: 'documented',
      confidence: 'high',
      provenance: prov('Cost column of the CIP dashboard export'),
      financial: {
        amountUSD: cost,
        currency: 'USD',
        mechanism: 'capital improvement program budget',
        status: financialStatus,
        fundingPeriod: completion?.raw ?? null,
        restricted: true,
        restrictions: 'Capital budget tied to the specific project scope described in the CIP dashboard.',
      },
      flowId,
    }));

    // One financial flow per project: unknown upstream sources are modeled
    // once in the shared f:cip-budget-sources flow (see records/flows.json).
    flows.push({
      id: flowId,
      label: `CIP → ${name}`,
      repo: 'pillar-thriving-built-environment',
      purpose: (row.Description || '').trim().slice(0, 300),
      stages: [
        {
          from: CIP_FUND, to: pid,
          mechanism: 'capital improvement program budget',
          amountUSD: cost,
          evidenceStatus: 'documented',
          note: `Phase: ${phase || 'unknown'}`,
        },
        {
          from: pid, to: 'n:population:richmond-residents',
          mechanism: 'infrastructure delivered as public works',
          amountUSD: null,
          evidenceStatus: 'inferred',
          note: 'Residents benefit via the built infrastructure; no per-beneficiary dollar accounting exists in the corpus.',
        },
      ],
      amountUSD: cost,
      currency: 'USD',
      status: financialStatus,
      fundingPeriod: completion?.raw ?? null,
      mechanism: 'capital improvement program budget',
      restricted: true,
      restrictions: 'Capital budget tied to the project scope in the CIP dashboard.',
      evidenceStatus: 'documented',
      confidence: 'high',
      provenance: prov(),
      rollup: {
        originatingUSD: cost,
        committedUSD: cost,
        disbursedUSD: financialStatus === 'completed' ? cost : null,
        reachingFinalUSD: null,
        pctReachingFinal: null,
        isEstimate: true,
        methodology:
          'Committed = CIP dashboard cost. Disbursed is only filled for Completed-phase projects (assumed fully spent; the corpus documents no expenditure ledger). Amount reaching final beneficiaries is not calculable: no administrative-overhead or contractor breakdown exists in the corpus.',
      },
      unknowns: [
        'Mix of funding sources behind this project (bonds, state, federal) is not documented in the corpus.',
        'Actual expenditure to date is not documented (dashboard is quarterly and narrative-only).',
      ],
    });

    // Project manager (public organizational role; contact info withheld).
    const manager = (row.Manager || '').trim();
    if (manager) {
      const personId = nodeId('person', manager);
      if (!seenPeople.has(personId)) {
        seenPeople.set(personId, true);
        nodes.push(makeNode({
          id: personId,
          type: 'Person',
          label: manager,
          description: 'DPW project manager (per CIP dashboard export). Contact details withheld per privacy policy.',
          evidenceStatus: 'documented',
          provenance: prov('Manager column; email/phone deliberately omitted'),
          attrs: { role: 'DPW Project Manager', organization: 'Richmond Department of Public Works' },
        }));
        edges.push(makeEdge({
          source: 'n:agency:richmond-dpw',
          target: personId,
          type: 'EMPLOYS',
          description: `${manager} manages CIP projects for DPW`,
          evidenceStatus: 'documented',
          confidence: 'high',
          provenance: prov(),
        }));
      }
      edges.push(makeEdge({
        source: personId,
        target: pid,
        type: 'MANAGES',
        description: `${manager} is the project manager for "${name}"`,
        evidenceStatus: 'documented',
        confidence: 'high',
        provenance: prov(),
      }));
    }

    edges.push(makeEdge({
      source: pid,
      target: CITY,
      type: 'LOCATED_IN',
      description: `Located at: ${(row.Location || '').trim() || 'location text missing'}`,
      evidenceStatus: 'documented',
      confidence: 'high',
      provenance: prov('Location column (descriptive text, not geocoded)'),
    }));

    // Documented external funding mentions inside descriptions/status text.
    const desc = `${row.Description || ''} ${row.Status || ''}`;
    if (/American Rescue Plan Act|ARPA/i.test(desc)) {
      const arpaFlowId = `f:arpa-${slug(name)}`;
      edges.push(makeEdge({
        source: ARPA,
        target: pid,
        type: 'FUNDS',
        description: `"${name}" is partially funded through the American Rescue Plan Act (ARPA); the ARPA portion is not documented.`,
        evidenceStatus: 'documented',
        confidence: 'high',
        provenance: prov('Description column mentions ARPA'),
        financial: {
          amountUSD: null,
          currency: 'USD',
          mechanism: 'federal COVID-19 recovery appropriation (ARPA)',
          status: 'unknown',
          fundingPeriod: null,
          restricted: true,
          restrictions: 'ARPA funds carry federal eligibility and reporting requirements (not detailed in the corpus).',
        },
        flowId: arpaFlowId,
      }));
      flows.push({
        id: arpaFlowId,
        label: `ARPA → City of Richmond → ${name}`,
        repo: 'pillar-thriving-built-environment',
        purpose: 'Partial funding of the project via federal ARPA dollars.',
        stages: [
          {
            from: 'n:agency:us-federal-government', to: ARPA,
            mechanism: 'federal legislation/appropriation',
            amountUSD: null,
            evidenceStatus: 'inferred',
            note: 'ARPA is a federal act; the federal origin is inferred from its name, not stated in the corpus.',
          },
          {
            from: ARPA, to: 'n:agency:city-of-richmond',
            mechanism: 'federal-to-local fiscal recovery funds',
            amountUSD: null,
            evidenceStatus: 'inferred',
            note: "The corpus does not document the City's ARPA allocation.",
          },
          {
            from: 'n:agency:city-of-richmond', to: pid,
            mechanism: 'ARPA-funded capital project',
            amountUSD: null,
            evidenceStatus: 'documented',
            note: `CIP dashboard: "This project is partially funded through the American Rescue Plan Act (ARPA)." Total project cost ${row.Cost || 'unknown'}; ARPA portion undocumented.`,
          },
          // Only the Southside Community Center has an inferable final beneficiary
          // (Southside residents, from the project name). Other ARPA projects end
          // at the project node: the corpus does not identify their beneficiaries.
          ...(pid === 'n:project:southside-community-center' ? [{
            from: pid, to: 'n:region:southside-richmond',
            mechanism: 'community facility service delivery',
            amountUSD: null,
            evidenceStatus: 'inferred',
            note: 'The Southside Community Center serves Southside residents (inferred from project name/description).',
          }] : []),
        ],
        amountUSD: null,
        currency: 'USD',
        status: phaseToFinancialStatus(phase),
        fundingPeriod: completion?.raw ?? null,
        mechanism: 'federal ARPA pass-through',
        restricted: true,
        restrictions: 'Federal ARPA eligibility and reporting rules apply (not detailed in the corpus).',
        evidenceStatus: 'documented',
        confidence: 'medium',
        provenance: prov('Description column mentions ARPA'),
        rollup: {
          originatingUSD: null,
          committedUSD: null,
          disbursedUSD: null,
          reachingFinalUSD: null,
          pctReachingFinal: null,
          isEstimate: true,
          methodology: 'No amounts calculable: the ARPA portion of the project cost is not documented anywhere in the corpus.',
        },
        unknowns: [
          'Dollar amount of the ARPA contribution to this project.',
          "The City of Richmond's total ARPA allocation and its internal allocation process.",
        ],
      });
    }
  }

  return { nodes, edges, flows, reviewItems, filesExamined: [CSV_PATH], rowCount: rows.length };
}
