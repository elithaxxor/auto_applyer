import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from core.llm_utils import extract_keywords


def test_extract_keywords():
    text = "Python developer with SQL and AWS experience"
    keywords = extract_keywords(text, max_keywords=3)
    assert len(keywords) == 3
