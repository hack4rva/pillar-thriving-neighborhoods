#!/usr/bin/env bash
#
# Copy this knowledge-graph app into another pillar repo.
#
#   ./scripts/port-to-pillar.sh <target-repo-dir> <shortName> <pillarName>
#
# The app code is identical in every pillar; only pillar.config.json and the
# generated data/ differ. Curated records are pillar-specific research work, so
# the target starts with empty ones and builds its graph from the deterministic
# parsers (evidence log + source inventory) alone.
set -euo pipefail

TARGET_REPO="${1:?usage: port-to-pillar.sh <target-repo-dir> <shortName> <pillarName>}"
SHORT_NAME="${2:?missing shortName}"
PILLAR_NAME="${3:?missing pillarName}"

SRC="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$TARGET_REPO/knowledge-graph"
REPO_ID="$(basename "$TARGET_REPO")"

[ -d "$TARGET_REPO" ] || { echo "no such repo: $TARGET_REPO" >&2; exit 1; }

rm -rf "$DEST"
mkdir -p "$DEST"

# Source only. Generated data, dependencies, and screenshots stay behind.
rsync -a \
  --exclude 'node_modules/' \
  --exclude 'dist/' \
  --exclude 'data/' \
  --exclude 'public/data/' \
  --exclude 'docs/' \
  --exclude 'README.md' \
  --exclude '.tmp*' \
  "$SRC/" "$DEST/"

# data/ is generated output, except the JSON Schema, which is source.
mkdir -p "$DEST/data"
cp -R "$SRC/data/schema" "$DEST/data/schema"

# Only the pillar-neutral docs travel. The rest describe the Built Environment
# corpus (CIP projects, DPW, funding methodology) and would be false here.
mkdir -p "$DEST/docs"
cp "$SRC/docs/architecture.md" "$SRC/docs/evidence-policy.md" "$DEST/docs/"

cat > "$DEST/README.md" <<EOF
# Knowledge Graph and Evidence Explorer

An evidence-backed knowledge graph of the **$PILLAR_NAME** pillar research
corpus, with an interactive explorer for tracing claims, sources, gaps, and the
organizations behind them.

## Where the graph comes from

Extraction is deterministic and reads two files in this repository:

- \`admin/evidence_log.md\` — claims, documented gaps, and risks
- \`data/source_inventory.csv\` — inventoried data sources

Claims become Evidence nodes, gaps become ResearchQuestion nodes, risks become
Risk nodes, and inventoried sources become Dataset nodes. Publishers named in
the corpus become Organization nodes, and a claim is linked to a source only
when the two share a URL, when the claim names the source, or when both cite
the same distinctive domain — every edge traces back to a literal match you can
check by reading the rows.

## No funding layer

This pillar's corpus contains no financial dataset, so the graph has no funding
layer and the money-based views (Overview, Money Flow, Timeline, Needs vs
Money) are hidden rather than shown empty. Only the Built Environment pillar
has a capital-projects export.

## Running it

\`\`\`bash
cd knowledge-graph
npm install
npm run dev      # http://localhost:5173
\`\`\`

Other targets: \`npm run validate\` (schema and referential integrity),
\`npm test\`, \`npx vite build\`. The generated \`data/\` is committed, so the app
runs without re-extraction; \`node scripts/extract.js\` regenerates it.

## Curated records

\`extraction/records/*.json\` are empty here. They hold hand-authored entities
and relationships with excerpt-level provenance, verified against source files
at build time. Populating them is how this graph gets richer — never copy
another pillar's records.
EOF

# Curated records are hand-authored per pillar; never inherit another's.
cat > "$DEST/extraction/records/entities.json" <<'EOF'
[]
EOF
cp "$DEST/extraction/records/entities.json" "$DEST/extraction/records/relationships.json"
cp "$DEST/extraction/records/entities.json" "$DEST/extraction/records/flows.json"
cp "$DEST/extraction/records/entities.json" "$DEST/extraction/records/questions.json"
cp "$DEST/extraction/records/entities.json" "$DEST/extraction/records/review.json"
cat > "$DEST/extraction/records/external.json" <<'EOF'
{ "evidence": [], "entities": [], "relationships": [], "flows": [], "nodeUpdates": [], "answers": [] }
EOF
cat > "$DEST/extraction/aliases.json" <<'EOF'
{ "_comment": "Alias resolution: maps abbreviations and informal names to canonical node IDs. Populate as this pillar's graph is curated." }
EOF

# No projectsCsv: only the Built Environment corpus ships a capital-projects
# export, so other pillars have no cost, phase, or funding-flow data.
cat > "$DEST/pillar.config.json" <<EOF
{
  "repoId": "$REPO_ID",
  "pillarName": "$PILLAR_NAME",
  "shortName": "$SHORT_NAME",
  "description": "Evidence and source graph for the $PILLAR_NAME pillar, built from the repository's evidence log and source inventory. This corpus contains no financial dataset, so there is no funding layer.",
  "sources": {
    "evidenceLog": "admin/evidence_log.md",
    "sourceInventory": "data/source_inventory.csv",
    "projectsCsv": null
  },
  "derive": true
}
EOF

node -e "
const fs = require('fs');
const p = '$DEST/package.json';
const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
pkg.name = '$REPO_ID'.replace(/^pillar-/, '') + '-knowledge-graph';
fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
"

echo "ported -> $DEST  (repoId=$REPO_ID)"
