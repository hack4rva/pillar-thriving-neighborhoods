"""
Parallel.ai client for the deep-research prompt runner.

Install:  pip install parallel-ai
API key:  PARALLEL_API_KEY in .env (see .env.example)

Uses the Task API in text-schema mode so each research prompt returns
a markdown report with inline citations — same format as the prior runner.
"""

from __future__ import annotations

import os
from typing import Any, Dict, List

from parallel import Parallel
from parallel.types import TaskSpecParam, TextSchemaParam


class ParallelClient:
    def __init__(
        self,
        api_key: str | None = None,
        processor: str = "pro",
        api_timeout: int = 3600,
    ):
        self.api_key = api_key or os.getenv("PARALLEL_API_KEY")
        if not self.api_key:
            raise RuntimeError(
                "PARALLEL_API_KEY not set. "
                "Copy .env.example → .env and add your key, or export PARALLEL_API_KEY."
            )
        self.processor = processor
        self.api_timeout = api_timeout
        self._client = Parallel(api_key=self.api_key)

    def create_response(
        self,
        *,
        input_text: str,
        processor: str | None = None,
        api_timeout: int | None = None,
        **_kwargs: Any,
    ) -> Dict[str, Any]:
        """Submit a deep-research task and block until complete.

        Returns a normalized dict:
          output_text   – markdown research report
          search_results – list of {title, url} citations
          model         – processor used
          meta          – run_id, status, raw output
        """
        eff_processor = processor or self.processor
        eff_timeout = api_timeout or self.api_timeout

        task_run = self._client.task_run.create(
            input=input_text,
            processor=eff_processor,
            task_spec=TaskSpecParam(output_schema=TextSchemaParam()),
        )

        run_result = self._client.task_run.result(
            task_run.run_id, api_timeout=eff_timeout
        )

        output = run_result.output

        # Extract markdown text (text-schema mode: content is a string)
        output_text = ""
        if hasattr(output, "content"):
            output_text = output.content if isinstance(output.content, str) else str(output.content or "")
        else:
            output_text = str(output or "")

        # Extract citations from basis (flat list in text mode)
        citations: List[Dict[str, Any]] = []
        basis = getattr(output, "basis", None) or []
        for b in basis:
            for c in (getattr(b, "citations", None) or []):
                citations.append(
                    {
                        "title": getattr(c, "title", None),
                        "url": getattr(c, "url", None),
                    }
                )

        return {
            "output_text": output_text,
            "search_results": citations,
            "model": eff_processor,
            "meta": {
                "run_id": task_run.run_id,
                "processor": eff_processor,
                "status": getattr(output, "status", "completed"),
            },
        }
