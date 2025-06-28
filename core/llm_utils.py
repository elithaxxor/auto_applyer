from __future__ import annotations

import os
from typing import List

import openai

openai.api_key = os.getenv("OPENAI_API_KEY", "test")


def extract_keywords(text: str, max_keywords: int = 5) -> List[str]:
    """Use OpenAI to extract keywords from a job description."""
    try:
        prompt = f"Extract {max_keywords} keywords from the following text:\n{text}"
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )
        keywords = response.choices[0].message.content.strip().split(",")
        return [k.strip() for k in keywords][:max_keywords]
    except Exception:
        # Fallback simple split
        words = text.split()
        return list(dict.fromkeys(words))[:max_keywords]


def tailor_resume(resume: str, keywords: List[str]) -> str:
    prompt = (
        "Improve the following resume to highlight these keywords: "
        f"{', '.join(keywords)}\n{resume}"
    )
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content.strip()
    except Exception:
        return resume


def generate_cover_letter(job_desc: str, resume: str) -> str:
    prompt = f"Write a short cover letter for this job: {job_desc}\nResume: {resume}"
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content.strip()
    except Exception:
        return ""
