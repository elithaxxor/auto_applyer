from __future__ import annotations

from pathlib import Path
from typing import Optional

import typer
from core import tracker

from core.llm_utils import generate_cover_letter
from providers.linkedin import LinkedInProvider
from providers.indeed import IndeedProvider
from providers.greenhouse import GreenhouseProvider

app = typer.Typer()

providers = {
    "linkedin": LinkedInProvider(),
    "indeed": IndeedProvider(),
    "greenhouse": GreenhouseProvider(),
}


@app.command()
def search(provider: str, query: str):
    prov = providers[provider]
    jobs = prov.search_jobs(query)
    for job in jobs:
        typer.echo(f"{job.id}: {job.title} @ {job.company}")


@app.command()
def apply(provider: str, job_id: str, resume_path: Path, cover_letter: Optional[Path] = None):
    prov = providers[provider]
    resume_text = resume_path.read_text()
    if cover_letter and cover_letter.exists():
        cover = cover_letter.read_text()
    else:
        cover = generate_cover_letter("", resume_text)
    success = prov.apply_to_job(job_id, resume_text, cover)
    if success:
        tracker.add_application(
            tracker.Application(
                job_id=job_id,
                title="",
                company="",
                provider=provider,
                date_applied="",
            )
        )
        typer.echo("Applied successfully")
    else:
        typer.echo("Failed to apply")


@app.command()
def status():
    apps = tracker.list_applications()
    for app_ in apps:
        typer.echo(f"{app_.job_id} - {app_.status}")


@app.command()
def follow_up():
    typer.echo("Follow-up feature not implemented")


if __name__ == "__main__":
    app()
