import sys
import os
from unittest.mock import patch

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import providers.linkedin as linkedin
import providers.indeed as indeed
import providers.greenhouse as greenhouse
from core.provider import JobPosting


def test_indeed_search_jobs_parses_results():
    html = (
        '<a class="tapItem" data-jk="abc123" title="Dev" href="#">'
        '<span class="companyName">Inc</span></a>'
    )
    with patch('requests.get') as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.text = html
        prov = indeed.IndeedProvider()
        jobs = prov.search_jobs("dev")
        assert jobs == [JobPosting(id='abc123', title='Dev', company='Inc', link='https://www.indeed.com/viewjob?jk=abc123')]


def test_linkedin_search_jobs_parses_results():
    html = (
        '<li><a class="result-card__full-card-link" href="/jobs/view/123">'
        '<h3>Engineer</h3><h4>LLC</h4></a></li>'
    )
    with patch('requests.get') as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.text = html
        prov = linkedin.LinkedInProvider()
        prov.playwright = None
        jobs = prov.search_jobs("eng")
        assert jobs == [JobPosting(id='123', title='Engineer', company='LLC', link='/jobs/view/123')]


def test_greenhouse_search_jobs_parses_results():
    data = {"jobs": [{"id": 1, "title": "Analyst", "absolute_url": "http://gh/1"}]}
    with patch('requests.get') as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = data
        prov = greenhouse.GreenhouseProvider('test')
        jobs = prov.search_jobs('analyst')
        assert jobs == [JobPosting(id='1', title='Analyst', company='test', link='http://gh/1')]
