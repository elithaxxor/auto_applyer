from __future__ import annotations

from typing import List

from bs4 import BeautifulSoup
import requests

from core.provider import BaseProvider, JobPosting


class IndeedProvider(BaseProvider):
    base_url = "https://www.indeed.com/jobs"

    def search_jobs(self, query: str) -> List[JobPosting]:
        params = {"q": query}
        resp = requests.get(self.base_url, params=params)
        if resp.status_code != 200:
            return []
        soup = BeautifulSoup(resp.text, "html.parser")
        postings: List[JobPosting] = []
        for div in soup.select("a.tapItem"):
            title = div.get("title") or ""
            job_id = div.get("data-jk") or ""
            company = div.select_one("span.companyName")
            company_name = company.text.strip() if company else ""
            link = f"https://www.indeed.com/viewjob?jk={job_id}"
            postings.append(JobPosting(id=job_id, title=title, company=company_name, link=link))
        return postings

    def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        # Indeed does not expose an API for applying automatically.
        return False

    def supports_easy_apply(self) -> bool:
        return False
