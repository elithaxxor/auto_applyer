from __future__ import annotations

from typing import List

from core.provider import BaseProvider, JobPosting


class LinkedInProvider(BaseProvider):
    """LinkedIn provider using Playwright (stub)."""

    def __init__(self):
        try:
            from playwright.sync_api import sync_playwright
            self.playwright = sync_playwright().start()
        except Exception:
            self.playwright = None

    def search_jobs(self, query: str) -> List[JobPosting]:
        # Stub: return empty list
        return []

    def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        # Stub: pretend success
        return True

    def supports_easy_apply(self) -> bool:
        return True
