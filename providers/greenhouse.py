from __future__ import annotations

from typing import List

from core.provider import BaseProvider, JobPosting


class GreenhouseProvider(BaseProvider):
    def search_jobs(self, query: str) -> List[JobPosting]:
        # Example search via greenhouse.io boards (stub)
        return []

    def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        # Stub: not implemented
        return True

    def supports_easy_apply(self) -> bool:
        return False
