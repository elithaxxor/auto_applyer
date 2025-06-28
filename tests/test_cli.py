import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from typer.testing import CliRunner

import main
from core.provider import JobPosting


class DummyProvider:
    def search_jobs(self, query: str):
        return [JobPosting(id="1", title="Python Dev", company="ACME", link="")]

    def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        return True

    def supports_easy_apply(self) -> bool:
        return True


def test_search_command(monkeypatch):
    runner = CliRunner()
    monkeypatch.setattr(main, "providers", {"dummy": DummyProvider()})
    result = runner.invoke(main.app, ["search", "dummy", "Python"])
    assert result.exit_code == 0
    assert "1: Python Dev @ ACME" in result.output


def test_apply_command(monkeypatch, tmp_path):
    runner = CliRunner()
    resume_file = tmp_path / "resume.txt"
    resume_file.write_text("my resume")
    monkeypatch.setattr(main, "providers", {"dummy": DummyProvider()})
    recorded = []
    monkeypatch.setattr(main.tracker, "add_application", lambda app: recorded.append(app))
    monkeypatch.setattr(main, "generate_cover_letter", lambda job_desc, resume: "cover")
    result = runner.invoke(
        main.app,
        ["apply", "dummy", "job123", str(resume_file)],
    )
    assert result.exit_code == 0
    assert "Applied successfully" in result.output
    assert recorded
    assert recorded[0].job_id == "job123"
