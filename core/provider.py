from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

@dataclass
class JobPosting:
    id: str
    title: str
    company: str
    link: str


class BaseProvider(ABC):
    """Abstract base class for job board providers."""

    @abstractmethod
    def search_jobs(self, query: str) -> List[JobPosting]:
        """Search for jobs matching the query."""

    @abstractmethod
    def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        """Apply to a job and return True if successful."""

    @abstractmethod
    def supports_easy_apply(self) -> bool:
        """Return True if provider supports one-click apply."""
