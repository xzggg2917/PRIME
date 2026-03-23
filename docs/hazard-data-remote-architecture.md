# Hazard Data Remote Architecture for PRIME

## Goal
Build a scalable hazard-evaluation data layer for route safety precheck without loading full public databases locally.

## Core Principle
Never load full datasets into memory. Use:
- Remote source of truth
- Local persistent cache (bounded)
- In-memory hot cache (small)
- Deterministic feature extraction for scoring

## Recommended Public Data Sources
These are common public options for chemical metadata and hazard context:
1. PubChem PUG REST
- Strength: broad compound coverage, standard identifiers, structured properties.
- Use in PRIME: identifier normalization, synonym resolution, basic hazard-related signals.

2. EPA CompTox Dashboard data interfaces
- Strength: toxicity and environmental risk context.
- Use in PRIME: toxicology enrichments for risk flags.

3. ECHA information pages / downloadable datasets (where licensing and access permit)
- Strength: regulatory perspective (especially EU context).
- Use in PRIME: compliance-oriented hazard confirmation.

Note:
- Availability and response shape can change; wrap each source behind adapter modules.
- Respect source terms of use, attribution, and rate limits.

## Layered Architecture

### L0: Renderer (UI)
- Sends chemical queries by CAS / InChIKey / Name.
- Shows status: cache hit, remote fallback, confidence.

### L1: Main Process Query Service
- Entry point for all hazard lookups via IPC.
- Runs source adapters and cache policy.
- Produces a single normalized response schema for renderer.

### L2: Local Cache (SQLite preferred)
- Stores normalized minimal records only.
- TTL expiration and LRU-like cleanup.
- Keeps app responsive and offline-tolerant for recent lookups.

### L3: Remote Adapters
- `pubchemAdapter`
- `comptoxAdapter`
- `echaAdapter` (optional, depending on practical access)
- Each adapter maps source-specific fields to unified schema.

## Data Flow
1. User submits one or more chemicals.
2. System normalizes identifier (CAS/InChIKey preferred).
3. Check hot cache (memory map).
4. If miss, check SQLite cache and TTL.
5. If miss/stale, call remote adapters in sequence or parallel-with-timeout.
6. Normalize and merge source results.
7. Store normalized result in SQLite and hot cache.
8. Convert normalized result into model features.
9. Feed deterministic safety scoring engine.

## Minimal Unified Record Schema

```json
{
  "query": {
    "input": "Acetone",
    "normalizedKey": "67-64-1",
    "keyType": "CAS"
  },
  "identity": {
    "name": "Acetone",
    "cas": "67-64-1",
    "inchiKey": "CSCPPACGZOOCGX-UHFFFAOYSA-N",
    "smiles": "CC(=O)C"
  },
  "hazard": {
    "ghs": ["Flam. Liq. 2", "Eye Irrit. 2", "STOT SE 3"],
    "hStatements": ["H225", "H319", "H336"],
    "cmr": false,
    "flammable": true,
    "acuteToxicityClass": null,
    "environmentalHazard": false
  },
  "sources": [
    {
      "name": "pubchem",
      "version": "api-live",
      "retrievedAt": "2026-03-22T12:00:00.000Z"
    }
  ],
  "quality": {
    "confidence": 0.82,
    "conflicts": [],
    "missingFields": ["acuteToxicityClass"]
  },
  "cache": {
    "cachedAt": "2026-03-22T12:00:00.000Z",
    "expiresAt": "2026-03-29T12:00:00.000Z"
  }
}
```

## Feature Extraction for Safety Model
Convert raw hazard data to compact model features:
- `isCMR` (0/1)
- `isHighlyFlammable` (0/1)
- `dangerSignalCount` (int)
- `warningSignalCount` (int)
- `hasAcuteToxicityHighClass` (0/1)
- `hasEnvironmentalHazard` (0/1)
- `sourceAgreementScore` (0..1)
- `dataCompleteness` (0..1)

This keeps the scoring layer stable even if source schemas change.

## SQLite Cache Schema (Minimal)

```sql
CREATE TABLE IF NOT EXISTS chemical_cache (
  key TEXT PRIMARY KEY,
  key_type TEXT NOT NULL,
  input_name TEXT,
  canonical_name TEXT,
  cas TEXT,
  inchi_key TEXT,
  smiles TEXT,
  hazard_json TEXT NOT NULL,
  quality_json TEXT NOT NULL,
  sources_json TEXT NOT NULL,
  cached_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  last_used_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chemical_cache_expires_at
ON chemical_cache(expires_at);

CREATE INDEX IF NOT EXISTS idx_chemical_cache_last_used_at
ON chemical_cache(last_used_at);
```

## Cache Policy
- Default TTL: 7 days
- High-risk chemicals TTL: 1-3 days
- Cleanup trigger: app startup + every N queries
- Cleanup rule:
  - Delete expired entries
  - If row count > threshold (for example 50k), drop oldest `last_used_at`

## API Contract (IPC)

### Renderer -> Main
`hazard:lookup`

Request:
```json
{
  "chemicals": [
    {"input": "67-64-1", "type": "CAS"},
    {"input": "CSCPPACGZOOCGX-UHFFFAOYSA-N", "type": "INCHIKEY"},
    {"input": "acetone", "type": "NAME"}
  ],
  "forceRefresh": false
}
```

Response:
```json
{
  "items": [
    {
      "input": "67-64-1",
      "status": "ok",
      "record": {}
    }
  ],
  "meta": {
    "cacheHit": 1,
    "remoteHit": 0,
    "errors": []
  }
}
```

## Integration With Existing Safety Precheck
Current safety model already uses:
- danger/warning counts
- CMR and flammability flags

Bridge rule:
1. Manual input remains editable.
2. If hazard lookup succeeds, suggest auto-filled defaults.
3. User can accept or override auto-filled fields.
4. Final scoring always deterministic and transparent.

## Phased Implementation Plan

### Phase 1 (MVP, 2-3 days)
- Add IPC: `hazard:lookup`
- Implement `pubchemAdapter`
- Add SQLite cache table and TTL
- Add "Auto-fill from chemical" UI section in safety panel

### Phase 2
- Add second source adapter (CompTox)
- Add source conflict resolution and confidence weighting
- Batch lookup for route reagent lists

### Phase 3
- Add incremental refresh job and offline diagnostics
- Add exportable evidence card per risk conclusion
- Add model audit log for each recommendation

## Conflict Resolution Rules (Deterministic)
If multiple sources disagree:
1. Prefer explicit classification over missing value.
2. If one source says CMR=true and another missing, keep true.
3. If direct contradiction, keep conservative (higher risk) and lower confidence.
4. Record conflict in `quality.conflicts` for user visibility.

## Performance Targets
- Single lookup cached: < 50 ms
- Single lookup remote: 0.5 s to 3 s (network dependent)
- Batch of 20 reagents with mixed cache/remote: < 8 s
- Renderer remains interactive; all remote work in main process async pipeline.

## Security and Reliability
- Validate/escape all remote payload fields before rendering.
- Timeout each adapter call (for example 4 s).
- Retry at most once for transient failure.
- Never block scoring on remote failure; fallback to manual input with reduced confidence.

## Why This Solves "Huge Data" Problem
- No full-database local import.
- Only query what users actually use.
- Keep a bounded, expiring local cache.
- Preserve deterministic risk scoring and transparency.

## Suggested Next Coding Step
Implement source abstraction and cache first:
1. `src/services/hazardClient.js` (orchestrator)
2. `src/services/hazardAdapters/pubchemAdapter.js`
3. `src/services/hazardCache.js` (SQLite wrapper)
4. IPC in `src/main.js`: `hazard:lookup`
5. renderer wiring in `src/renderer/app.js`
