---
name: result
description: Get completed research task result by run ID
user-invocable: true
argument-hint: <run_id>
allowed-tools: Bash(parallel-cli:*)
metadata:
  author: parallel
---

> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Get Research Result

## Run ID: $ARGUMENTS

```bash
parallel-cli research poll "$ARGUMENTS" --json
```

Present results in a clear, organized format.

If CLI not found, tell user to run `/parallel:setup`.
