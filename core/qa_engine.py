from __future__ import annotations

import yaml
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

from . import llm_utils


@dataclass
class AnswerResult:
    answer: str
    confidence: float


class QAEngine:
    def __init__(self, yaml_path: Path):
        self.questions = {}
        if yaml_path.exists():
            with open(yaml_path, "r", encoding="utf-8") as f:
                self.questions = yaml.safe_load(f) or {}
        self.yaml_path = yaml_path

    def lookup(self, question: str) -> Optional[AnswerResult]:
        if question in self.questions:
            return AnswerResult(self.questions[question], 1.0)
        return None

    def answer(self, question: str) -> AnswerResult:
        result = self.lookup(question)
        if result:
            return result
        generated = llm_utils.answer_question(question)
        confidence = 0.6
        if generated:
            confidence = 0.8
        return AnswerResult(generated, confidence)

    def record_answer(self, question: str, answer: str):
        self.questions[question] = answer
        with open(self.yaml_path, "w", encoding="utf-8") as f:
            yaml.safe_dump(self.questions, f)
