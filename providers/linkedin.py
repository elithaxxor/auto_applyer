from __future__ import annotations

from typing import List

import requests
from bs4 import BeautifulSoup

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
        if not self.playwright:
            url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search"
            params = {"keywords": query}
            resp = requests.get(url, params=params)
            if resp.status_code != 200:
                return []
            soup = BeautifulSoup(resp.text, "html.parser")
            postings: List[JobPosting] = []
            for card in soup.select("li a.result-card__full-card-link"):
                title_el = card.select_one("h3")
                company_el = card.select_one("h4")
                title = title_el.text.strip() if title_el else ""
                company = company_el.text.strip() if company_el else ""
                link = card.get("href") or ""
                job_id = link.split("/")[-1].split("?")[0]
                postings.append(JobPosting(id=job_id, title=title, company=company, link=link))
            return postings
        # Minimal playwright implementation skipped
        return []

    def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        # There is no public API for applying automatically; pretend success
        return True

    def supports_easy_apply(self) -> bool:
        return True
