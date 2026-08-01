"""Deterministic release policy for robot task evidence."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def evaluate(run: dict[str, Any], policy: dict[str, Any]) -> dict[str, Any]:
    """Return an auditable decision without combining safety rules into a score."""
    failures: list[str] = []

    if run["pickup_success_rate"] < policy["minimum_pickup_success_rate"]:
        failures.append("pickup success below minimum")
    if run["p99_decision_latency_ms"] > policy["maximum_p99_decision_latency_ms"]:
        failures.append("p99 decision latency exceeds budget")
    if run["dropped_packages"] > policy["maximum_dropped_packages"]:
        failures.append("dropped-package limit exceeded")

    return {
        "name": run["name"],
        "decision": "PASS" if not failures else "BLOCK",
        "failures": failures,
        "evidence": run,
    }


def evaluate_file(source: Path) -> dict[str, Any]:
    payload = json.loads(source.read_text(encoding="utf-8"))
    decisions = [evaluate(run, payload["policy"]) for run in payload["runs"]]
    return {
        "policy": payload["policy"],
        "decisions": decisions,
        "release_allowed": all(item["decision"] == "PASS" for item in decisions[1:]),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("scenario", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    result = evaluate_file(args.scenario)
    rendered = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.write_text(rendered, encoding="utf-8")
    print(rendered, end="")
    return 0 if result["release_allowed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
