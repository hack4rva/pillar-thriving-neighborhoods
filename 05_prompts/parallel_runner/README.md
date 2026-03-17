# Parallel.ai Research Runner

Runs the prompts in `05_prompts/research/` through the [Parallel.ai Task API](https://docs.parallel.ai) and saves results to `research/`.

## Setup

1. Install the SDK:
   ```bash
   pip install parallel-ai
   ```

2. Copy `.env.example` to `.env` and add your key:
   ```bash
   cp 05_prompts/parallel_runner/.env.example 05_prompts/parallel_runner/.env
   # edit .env and set PARALLEL_API_KEY=your_key_here
   ```

## Usage

**Run all pending prompts** (skips prompts that already have output):
```bash
python 05_prompts/parallel_runner/run_all.py
# or
make run-all
```

**Run a single prompt:**
```bash
python 05_prompts/parallel_runner/run_one.py 05_prompts/research/A1_problem_landscape_resident_service.txt
# or
make run-one PROMPT=05_prompts/research/A1_problem_landscape_resident_service.txt
```

**Use the main batch script** (same logic, at repo root):
```bash
python scripts/run_all_deep_research.py
python scripts/run_all_deep_research.py --processor pro-fast --limit 10
```

## Processor Selection

Edit `config.yaml` or pass `--processor`:

| Processor | Speed | Best for |
|-----------|-------|----------|
| `pro` | 2–10 min | Default — good depth, moderate cost |
| `pro-fast` | 30s–5 min | Faster, same cost tier |
| `ultra` | 5–25 min | Hardest prompts, higher cost |
| `ultra-fast` | 1–10 min | Fast + deep |

See [Parallel.ai processor docs](https://docs.parallel.ai/task-api/guides/choose-a-processor) for full details.

## Outputs

Each prompt produces two files in `research/`:
- `<basename>.md` — Markdown research report with inline citations
- `<basename>.json` — Run metadata (run_id, processor, status)

## Contents

- `parallel_client.py` — SDK wrapper (text-schema mode)
- `run_one.py` — Single-prompt runner
- `run_all.py` — Batch runner with skip/overwrite logic
- `config.yaml` — Processor and path configuration
- `.env.example` — API key template
- `Makefile` — Convenience targets
