# Green Chemistry Assessor (Desktop)

An English desktop software prototype for quantitative and qualitative assessment based on the 12 Principles of Green Chemistry.

## Features in this scaffold
- Electron desktop app (installable/runtime as local desktop software)
- 12-principle assessment form
- Route Safety Precheck panel (deterministic local hazard screening)
- Per-principle score (0.00 to 1.00)
- Total score (0.00 to 12.00)
- Radar chart visualization (12 axes)
- Local file persistence using JSON in the app data directory
- No browser cache or localStorage-based persistence

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the desktop app:
   ```bash
   npm start
   ```

## Recommendation Engine Mode
The recommendation and comparison report now runs in deterministic local mode only.
- No cloud model configuration is required.
- No API key is required.
- Reports are generated from local structured analysis and validation logic.

## Safety Precheck Model (Local)
The Safety Precheck provides a fast route-level laboratory safety estimate from user-entered context:
- Hazard inventory (Danger/Warning counts, CMR, flammability)
- Operation envelope (temperature, pressure, runaway potential)
- Protection architecture (engineering controls, monitoring coverage, PPE dependence)

Output includes:
- Risk grade (`Low`, `Moderate`, `High`, `Critical`)
- Safety score (0-100)
- Confidence score based on input completeness
- Primary risk drivers and suggested mitigations

## Route Reactant Table Input
Safety Precheck now uses a unified reactant table for both single and multiple inputs.

How to try:
1. Open the route safety prediction page.
2. Add one or more reactant rows (`Reactant`, `Eq`, `Amount (g)`).
3. Click `Analyze Route Risk`.
4. The app performs hazard lookup for each row and aggregates route-level risk.
5. Safety score, risk grade, evidence cards, and stage heatmap refresh immediately.

Behavior:
- Supports one-row and multi-row workflows in the same UI.
- Lookup responses are cached locally until TTL expires.

## Project Structure
- `src/main.js` - Electron main process and IPC
- `src/preload.js` - Secure bridge between renderer and main process
- `src/services/storage.js` - JSON file persistence
- `src/renderer/index.html` - UI layout
- `src/renderer/styles.css` - UI styles
- `src/renderer/app.js` - App logic and scoring
- `src/renderer/chart.js` - Radar chart rendering (canvas)

## Notes
This is an initial framework and interface prototype so you can iterate later with your exact questionnaire and scoring rules.

## Architecture Docs
- Remote hazard-data architecture: [docs/hazard-data-remote-architecture.md](docs/hazard-data-remote-architecture.md)
- Paper writing kit (ML-ready pre-assessment): [docs/ml-ready-preassessment-paper-kit.md](docs/ml-ready-preassessment-paper-kit.md)
