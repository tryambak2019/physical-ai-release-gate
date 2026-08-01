# Robot Release Gate

**Test how the machine behaves—not just whether the code runs.**

A small working prototype exploring a release-testing gap in Physical AI: a software update can improve conventional metrics while making the complete robot less reliable.

## The experiment

An AI-runtime update reports higher throughput, unchanged prediction accuracy, and passing software tests. Under the complete task, however, a decision arrives **180 ms late**. The conveyor has already moved the parcel; the gripper closes on stale coordinates, misses the pickup, and the release is blocked.

This deliberately tests an outcome independent of the update itself:

- software checks: build, API, prediction accuracy, throughput;
- physical checks: successful pickup, collision/drop, and task completion;
- release rule: block when physical behavior regresses against the current version.

## [View the two-scene demo](https://tryambak2019.github.io/physical-ai-release-gate/)

The demo is self-contained and deterministic. No backend or model download is required.

## What this proves—and what it does not

It proves the release-gate idea can be made concrete: compare the current and proposed versions on the same task, measure the physical outcome, and turn that evidence into a deployment decision.

It is **not** yet Sim2Real. This browser prototype does not model contact physics, transfer a controller to hardware, or measure a simulation-to-reality gap.

## Next experiment

Reproduce the stale-observation failure in MuJoCo with an existing robot-arm model, then compare the predicted failure boundary with a hardware replay. The question is whether a simple release gate can catch failures that component-level software tests miss—and whether smaller robotics teams need this in CI.

## Run locally

Open `index.html`, or serve the directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Scope

This is an exploration artifact, not a production safety system. The animation is a transparent visualization of deterministic timing logic in `app.js`; it is not prerecorded footage or a claim of real-robot validation.
