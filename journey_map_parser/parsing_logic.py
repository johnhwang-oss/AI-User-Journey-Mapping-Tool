"""Rule-based parsing utilities for transforming raw A&R interview notes
into a structured journey map representation.

This module intentionally keeps logic deterministic and conservative so that
no information is fabricated. Fields remain empty when no explicit evidence is
found in the source notes.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Dict, List, Sequence


PHASE_HEADING_PATTERN = re.compile(
    r"^(?:(?:phase|step|stage|process)\s*\d*|overall (?:action|phase|step))[:\-\s]+(.+)$",
    re.IGNORECASE,
)

SIMPLE_HEADING_PATTERN = re.compile(r"^[A-Z][A-Za-z0-9 &]{2,50}:")

QUOTE_PATTERN = re.compile(r'"([^"]{3,160})"|\'([^\']{3,160})\'')

TOOL_PATTERNS = (
    re.compile(r"(?:using|uses|use|leverages|via|through|in)\s+([A-Z][\w &/+-]{2,40})", re.I),
    re.compile(r"tools?\s+(?:like|such as)\s+([A-Z][\w &/+-]{2,40})", re.I),
)

COLLABORATOR_PATTERN = re.compile(
    r"(?:with|alongside|collaborates?\s+with)\s+([A-Z][^,.;]{2,60})",
    re.IGNORECASE,
)

FREQUENCY_TERMS = (
    "daily",
    "weekly",
    "monthly",
    "quarterly",
    "annually",
    "per pitch",
    "per-pitch",
    "each release",
    "every release",
    "ongoing",
    "ad hoc",
    "real-time",
)

EMOTION_TERMS = (
    "frustrated",
    "confused",
    "overwhelmed",
    "anxious",
    "stressed",
    "excited",
    "relieved",
    "satisfied",
    "confident",
    "hopeful",
    "energized",
)

PAIN_POINT_CUES = (
    "pain",
    "problem",
    "issue",
    "blocked",
    "bottleneck",
    "difficult",
    "hard",
    "time-consuming",
    "slow",
    "challenge",
    "lack",
    "missing",
)

OPPORTUNITY_CUES = (
    "opportunity",
    "could",
    "improve",
    "efficient",
    "streamline",
    "helpful",
    "useful",
    "valuable",
    "ideal",
    "wish",
    "would like",
)


@dataclass
class PhaseDraft:
    name: str
    lines: List[str]


def _normalise_line(line: str) -> str:
    return re.sub(r"\s+", " ", line.strip())


def _split_into_phases(notes: str) -> List[PhaseDraft]:
    phases: List[PhaseDraft] = []
    current_phase: PhaseDraft | None = None

    for raw_line in notes.splitlines():
        line = _normalise_line(raw_line)
        if not line:
            if current_phase is not None:
                current_phase.lines.append("")
            continue

        heading_match = PHASE_HEADING_PATTERN.match(line)
        simple_heading_match = SIMPLE_HEADING_PATTERN.match(line)

        if heading_match:
            # Commit previous phase before starting a new one
            if current_phase is not None:
                phases.append(current_phase)

            heading = heading_match.group(1).strip().rstrip(":")
            current_phase = PhaseDraft(name=heading or "Unlabelled Phase", lines=[])
            continue

        if simple_heading_match and line.count(" ") <= 6:
            if current_phase is not None:
                phases.append(current_phase)
            heading = line.rstrip(":")
            current_phase = PhaseDraft(name=heading, lines=[])
            continue

        if current_phase is None:
            current_phase = PhaseDraft(name="Overall Journey", lines=[])

        current_phase.lines.append(line)

    if current_phase is not None:
        phases.append(current_phase)

    if not phases:
        phases.append(PhaseDraft(name="Overall Journey", lines=[_normalise_line(notes)]))

    return phases


def _coalesce_lines(lines: Sequence[str]) -> List[str]:
    """Group contiguous text into paragraphs to preserve context."""

    paragraphs: List[str] = []
    buffer: List[str] = []

    for line in lines:
        if not _normalise_line(line):
            if buffer:
                paragraphs.append("\n".join(buffer).strip())
                buffer.clear()
            continue
        buffer.append(_normalise_line(line))

    if buffer:
        paragraphs.append("\n".join(buffer).strip())

    return paragraphs


def _extract_task_candidates(paragraphs: Sequence[str]) -> List[str]:
    candidates: List[str] = []
    for paragraph in paragraphs:
        if not paragraph:
            continue

        bullet_lines = [
            _normalise_line(part)
            for part in re.split(r"\s*\n\s*", paragraph)
            if _normalise_line(part)
        ]

        used_bullets = False
        for line in bullet_lines:
            if line[:1] in {"-", "*", "•", "●"}:
                candidates.append(line[1:].strip())
                used_bullets = True

        if used_bullets:
            continue

        sentences = [
            sentence.strip()
            for sentence in re.split(r"(?<=[.!?])\s+", paragraph)
            if sentence.strip() and len(sentence.split()) >= 4
        ]

        candidates.extend(sentences)

    seen: set[str] = set()
    unique_candidates: List[str] = []
    for candidate in candidates:
        key = candidate.lower()
        if key not in seen:
            seen.add(key)
            unique_candidates.append(candidate)

    return unique_candidates


def _choose_task_title(text: str) -> str:
    if ":" in text:
        return text.split(":", 1)[0].strip()
    if "-" in text[:60]:
        return text.split("-", 1)[0].strip()
    words = text.strip().split()
    return " ".join(words[:8]).rstrip(",;")


def _extract_by_keywords(text: str, keywords: Sequence[str]) -> str:
    lower_text = text.lower()
    for keyword in keywords:
        idx = lower_text.find(keyword)
        if idx != -1:
            window_start = max(0, idx - 40)
            window_end = min(len(text), idx + 80)
            snippet = text[window_start:window_end].strip()
            # Ensure the keyword is visible in the snippet
            if keyword not in snippet.lower():
                return text[idx : idx + len(keyword)]
            return snippet
    return ""


def _extract_tool(text: str) -> str:
    for pattern in TOOL_PATTERNS:
        match = pattern.search(text)
        if match:
            tool = match.group(1).strip().rstrip(".,")
            tool_lower = tool.lower()
            for delimiter in (" with ", " for ", " to ", " so ", " that "):
                marker = tool_lower.find(delimiter)
                if marker > 2:
                    tool = tool[:marker].strip()
                    break
            if len(tool) > 48:
                tool = tool[:48].rstrip(" ,;:-")
            return tool
    return ""


def _extract_collaborators(text: str) -> str:
    match = COLLABORATOR_PATTERN.search(text)
    if match:
        collaborator = match.group(1).strip()
        collaborator = collaborator.rstrip(".,")
        collab_lower = collaborator.lower()
        for term in FREQUENCY_TERMS:
            if collab_lower.endswith(term):
                collaborator = collaborator[: -len(term)].rstrip(" ,;:-")
                break
        return collaborator
    return ""


def _extract_frequency(text: str) -> str:
    lower_text = text.lower()
    for term in FREQUENCY_TERMS:
        if term in lower_text:
            return term
    return ""


def _extract_emotion(text: str) -> str:
    lower_text = text.lower()
    for term in EMOTION_TERMS:
        if term in lower_text:
            return term
    return ""


def _extract_key_quote(text: str) -> str:
    quote = QUOTE_PATTERN.search(text)
    if quote:
        # Determine which capturing group matched
        return next(group for group in quote.groups() if group)
    return ""


def _build_task_payload(task_text: str) -> Dict[str, str]:
    payload = {
        "task": _choose_task_title(task_text) or task_text[:80],
        "tool_used": _extract_tool(task_text),
        "emotion": _extract_emotion(task_text),
        "pain_point": _extract_by_keywords(task_text, PAIN_POINT_CUES),
        "opportunity": _extract_by_keywords(task_text, OPPORTUNITY_CUES),
        "key_quote": _extract_key_quote(task_text),
        "collaborators": _extract_collaborators(task_text),
        "frequency": _extract_frequency(task_text),
    }

    # Ensure we never output fabricated values (convert None -> "")
    for key, value in payload.items():
        if not value:
            payload[key] = ""
    return payload


def parse_interview_notes(
    notes: str, a_r_name: str, region: str, genre_focus: str
) -> Dict[str, object]:
    """Parse raw interview notes into a structured journey map dictionary."""

    notes = notes or ""
    phases_draft = _split_into_phases(notes)

    parsed_journey: Dict[str, object] = {
        "user_name": (a_r_name or "").strip(),
        "region": (region or "").strip(),
        "genre_focus": (genre_focus or "").strip(),
        "phases": [],
    }

    for phase in phases_draft:
        paragraphs = _coalesce_lines(phase.lines)
        task_candidates = _extract_task_candidates(paragraphs)

        tasks = [_build_task_payload(text) for text in task_candidates]

        parsed_journey["phases"].append(
            {
                "overall_action": phase.name.strip(),
                "tasks": tasks,
            }
        )

    return parsed_journey
