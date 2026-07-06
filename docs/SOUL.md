# keris-plugins - SOUL

## soul

Keris plugins are the proof distribution substrate: generated client manifests and skills that let external agents reach Keris video proof without bloating their context or confusing proof with recap.

## rulings

- Source: root `AGENTS.md`.
- `keris.config.ts` is the single source of truth.
- Generated manifests, MCP metadata, and README install blocks are never hand-edited.
- Positioning is proof, not recap.
- `generate_video` binds to real commit, PR, diff, and bounded evidence; `upload_video` is never proof.
- The repo is a companion plugin profile, not a product runtime.

## virtue

Proof distribution fidelity: every install path should point agents at the same lean, generated, evidence-bound Keris surface.

## refusals

- No hand-editing generated plugin files.
- No recap positioning.
- No context-bloated tool surface.
- No `upload_video` as proof.

## asks

- Keep generator output drift-free.
- Keep client install metadata aligned.
- Keep MCP reachability smoke honest.

## gates

- Generated drift and MCP smoke must pass before publishing or claiming readiness.
- Marketplace or registry publication remains explicit release work.

## fleet

```yaml
state: substrate
virtue: proof distribution fidelity
autonomy: mechanical-autonomous
refusals:
  - no hand-edited generated files
  - no recap positioning
  - no context-bloated tool surface
  - no upload_video as proof
asks:
  - generator drift check
  - aligned client install metadata
  - MCP reachability smoke
next_proof: pnpm generate plus pnpm verify shows no generated drift and live MCP reachability
owed_rulings:
  - none-recorded
love_evidence: companion plugin profile keeps Keris proof installable for external agents
outward_gate: public plugin installs route agents to generate_video proof with real evidence
console_gates:
  - marketplace and MCP registry publication
```
