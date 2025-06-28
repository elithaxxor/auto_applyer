from __future__ import annotations

import sqlite3
from dataclasses import dataclass
from pathlib import Path
from typing import Optional, List

DATABASE_FILE = Path("applications.db")


def init_db():
    conn = sqlite3.connect(DATABASE_FILE)
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS applications (
            job_id TEXT PRIMARY KEY,
            title TEXT,
            company TEXT,
            provider TEXT,
            date_applied TEXT,
            status TEXT,
            follow_up_dt TEXT,
            notes TEXT
        )
        """
    )
    conn.commit()
    conn.close()


@dataclass
class Application:
    job_id: str
    title: str
    company: str
    provider: str
    date_applied: str
    status: str = "applied"
    follow_up_dt: Optional[str] = None
    notes: Optional[str] = None


def add_application(app: Application):
    conn = sqlite3.connect(DATABASE_FILE)
    cur = conn.cursor()
    cur.execute(
        """
        INSERT OR REPLACE INTO applications(job_id,title,company,provider,date_applied,status,follow_up_dt,notes)
        VALUES (?,?,?,?,?,?,?,?)
        """,
        (
            app.job_id,
            app.title,
            app.company,
            app.provider,
            app.date_applied,
            app.status,
            app.follow_up_dt,
            app.notes,
        ),
    )
    conn.commit()
    conn.close()


def list_applications() -> List[Application]:
    conn = sqlite3.connect(DATABASE_FILE)
    cur = conn.cursor()
    cur.execute("SELECT job_id,title,company,provider,date_applied,status,follow_up_dt,notes FROM applications")
    rows = cur.fetchall()
    conn.close()
    return [Application(*row) for row in rows]


init_db()
