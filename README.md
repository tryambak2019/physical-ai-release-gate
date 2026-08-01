# Robot Release Gate

**Test whether the complete machine still performs its physical task—not only whether its components pass.**

A small working prototype exploring a release-testing gap in Physical AI: an AI-runtime update can preserve model outputs and improve throughput while making the complete robot less reliable under operating load.

## The experiment

An AI-runtime update produces identical model outputs, 30% higher throughput, and passing build/API checks. During the complete moving task, however, queueing under operating load makes one time-sensitive command arrive **180 ms late**. The package has passed the pickup point before the gripper closes, so the release gate blocks the update.

This tests an outcome independent of the update's component metrics:

- component checks: model-output equivalence, throughput, build, and APIs;
- complete-task checks: successful pickup and task completion;
- release rule: block when the physical task regresses against the current version.

## [View the two-scene demo](https://tryambak2019.github.io/physical-ai-release-gate/)

The demo is self-contained and deterministic. No backend or model download is required.

## What this proves—and what it does not

It makes the release-gate hypothesis concrete: replay the same complete task, measure the physical outcome, and turn that evidence into a deployment decision.

It is **not** yet Sim2Real. This browser prototype does not model contact physics, transfer a controller to hardware, or measure a simulation-to-reality gap. It also does not establish that robotics teams lack end-to-end timing tests; that is a customer-discovery question.

## Next experiment

Reproduce the late-command failure in MuJoCo with an existing robot-arm model, then compare the predicted failure boundary with a hardware replay. The technical question is whether a simulator-backed release gate catches full-task regressions that component checks miss. The market question is whether smaller robotics teams need this in CI.

## Run locally

Open `index.html`, or serve the directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Scope

This is an exploration artifact, not a production safety system. The animation transparently visualizes deterministic timing logic in `app.js`; it is not prerecorded footage or a claim of real-robot validation.
