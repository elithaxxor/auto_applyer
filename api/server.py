from __future__ import annotations

from fastapi import FastAPI, UploadFile, File

from core import tracker
from main import providers
from core.llm_utils import generate_cover_letter

app = FastAPI()


@app.post("/apply")
async def apply(provider: str, job_id: str, resume: UploadFile = File(...)):
    prov = providers[provider]
    resume_text = (await resume.read()).decode()
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
        return {"status": "ok"}
    return {"status": "failed"}


@app.get("/status")
async def status(job_id: str):
    apps = [a for a in tracker.list_applications() if a.job_id == job_id]
    if apps:
        return apps[0].__dict__
    return {"error": "not found"}


@app.get("/history")
async def history():
    return [a.__dict__ for a in tracker.list_applications()]


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    content = (await file.read()).decode()
    # For now, just return keywords
    keywords = generate_cover_letter(content, content)
    return {"keywords": keywords}
