import core.tracker as tracker


def test_add_and_list_application(monkeypatch, tmp_path):
    db_file = tmp_path / "apps.db"
    monkeypatch.setattr(tracker, "DATABASE_FILE", db_file)
    tracker.init_db()
    app = tracker.Application(
        job_id="1",
        title="Engineer",
        company="ACME",
        provider="dummy",
        date_applied="2024-01-01",
    )
    tracker.add_application(app)
    apps = tracker.list_applications()
    assert len(apps) == 1
    assert apps[0].job_id == "1"
    assert apps[0].company == "ACME"
