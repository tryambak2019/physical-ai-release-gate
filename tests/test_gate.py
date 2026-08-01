from copy import deepcopy

from gate import evaluate


POLICY = {
    "minimum_pickup_success_rate": 1.0,
    "maximum_p99_decision_latency_ms": 100,
    "maximum_dropped_packages": 0,
}

PASSING_RUN = {
    "name": "baseline",
    "throughput_fps": 100,
    "model_outputs_match_reference": True,
    "pickup_success_rate": 1.0,
    "p99_decision_latency_ms": 72,
    "dropped_packages": 0,
}


def test_baseline_passes():
    assert evaluate(PASSING_RUN, POLICY)["decision"] == "PASS"


def test_latency_at_budget_passes():
    run = deepcopy(PASSING_RUN)
    run["p99_decision_latency_ms"] = 100
    assert evaluate(run, POLICY)["decision"] == "PASS"


def test_latency_above_budget_blocks():
    run = deepcopy(PASSING_RUN)
    run["p99_decision_latency_ms"] = 101
    assert evaluate(run, POLICY)["decision"] == "BLOCK"


def test_higher_throughput_cannot_override_task_failure():
    run = deepcopy(PASSING_RUN)
    run.update(throughput_fps=1000, pickup_success_rate=0.0)
    decision = evaluate(run, POLICY)
    assert decision["decision"] == "BLOCK"
    assert "pickup success below minimum" in decision["failures"]


def test_drop_always_blocks():
    run = deepcopy(PASSING_RUN)
    run["dropped_packages"] = 1
    assert evaluate(run, POLICY)["decision"] == "BLOCK"
