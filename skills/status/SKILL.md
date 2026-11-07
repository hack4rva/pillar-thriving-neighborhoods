---
name: status
description: Check running research task status by run ID
user-invocable: true
argument-hint: <run_id>
allowed-tools: Bash(parallel-cli:*)
metadata:
  author: parallel
---

> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Check Research Status

## Run ID: $ARGUMENTS

```bash
parallel-cli research status "$ARGUMENTS" --json
```

If CLI not found, tell user to run `/parallel:setup`.
