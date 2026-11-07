#!/usr/bin/env bash
#
# Port, extract, validate, build, and smoke-test one pillar's explorer.
#
#   ./scripts/build-pillar.sh <target-repo-dir> <shortName> <pillarName> [port]
set -euo pipefail

TARGET="${1:?usage: build-pillar.sh <target-repo-dir> <shortName> <pillarName> [port]}"
SHORT="${2:?missing shortName}"
FULL="${3:?missing pillarName}"
PORT="${4:-4180}"

SRC="$(cd "$(dirname "$0")/.." && pwd)"
"$SRC/scripts/port-to-pillar.sh" "$TARGET" "$SHORT" "$FULL" >/dev/null

cd "$TARGET/knowledge-graph"
npm install --silent >/dev/null 2>&1 || npm install >/dev/null

echo "--- $SHORT"
node scripts/extract.js 2>&1 | head -1
npm run validate 2>&1 | tail -1
npx vite build >/dev/null 2>&1

npx vite preview --port "$PORT" >/tmp/kg-preview-$PORT.log 2>&1 &
PREVIEW_PID=$!
trap 'kill $PREVIEW_PID 2>/dev/null || true' EXIT
sleep 4
node scripts/verify-pillar.mjs "http://localhost:$PORT/" "/tmp/kg-$SHORT.png"
