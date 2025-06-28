from __future__ import annotations

from typing import List

import requests

from core.provider import BaseProvider, JobPosting


class GreenhouseProvider(BaseProvider):
    """Provider for Greenhouse-hosted job boards."""

    def __init__(self, board: str):
        self.board = board

    def search_jobs(self, query: str) -> List[JobPosting]:
        url = f"https://boards-api.greenhouse.io/v1/boards/{self.board}/jobs"
        resp = requests.get(url, params={"content": True})
        if resp.status_code != 200:
            return []
        data = resp.json()
        postings: List[JobPosting] = []
        for job in data.get("jobs", []):
            if query.lower() in job.get("title", "").lower():
                postings.append(
                    JobPosting(
                        id=str(job.get("id")),
                        title=job.get("title", ""),
                        company=self.board,
                        link=job.get("absolute_url", ""),
                    )
                )
        return postings

    def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        # Greenhouse boards typically require form submissions via browser
        return False

    def supports_easy_apply(self) -> bool:
        return False
