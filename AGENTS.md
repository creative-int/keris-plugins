# Keris plugins — agent guide

Public distribution repo for Keris: the `keris-video-proof` skill + plugin
manifests for Cursor, Codex, and Claude Code, plus `.mcp.json` and the MCP
Registry `server.json`. Installable via `npx skills add creative-int/keris-plugins`
and the three client plugin marketplaces.

## The one rule: generate, don't hand-edit

`keris.config.ts` is the **single source of truth**. Every manifest, `.mcp.json`,
`server.json`, and the README install block are emitted from it by
`tooling/generate.ts`. Edit the config, then:

```sh
pnpm generate     # rewrite all generated files
pnpm verify       # check:generated (drift) + typecheck + MCP reachability smoke
```

Never hand-edit the generated files (`.mcp.json`, `.claude-plugin/*`,
`.codex-plugin/*`, `.cursor-plugin/*`, `server.json`, the README `AUTO-GENERATED`
block). CI runs `check:generated` and fails on drift.

## To add a client

Add its install steps to `installClients` in `tooling/generate.ts` and, if it
needs a manifest, add the manifest builder to the `files` map. Regenerate.

## Scope

- v0: skill + 3 client manifests + `.mcp.json` + `server.json`, generated.
- v0.2 (deferred): optional, proof-aware, non-blocking stop hooks.

Positioning is **proof, not recap** — `generate_video` binds to real commit / PR /
diff evidence; `upload_video` is never proof. Keep the agent-facing tool surface
lean so it does not bloat context.

CLAUDE.md is a symlink to this file.

## Platform posture

tooling — keris plugins repo; no product surface. (D7, native-cohesion campaign 2026-06-10; see ~/.agents/artifacts/audits/native-cohesion-20260610/CANON-DECISIONS.md)

## Companion plugin profile

This repo intentionally uses the `agent-plugin-companion` profile rather than the full app-family turborepo profile. It is a public agent-facing distribution repo for Keris, so it owns generated plugin manifests, skills, MCP metadata, and install documentation — not product runtime surfaces.

Required root contract for this profile:

- `AGENTS.md` plus `CLAUDE.md -> AGENTS.md`
- `README.md`, `LICENSE`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `.nvmrc`, `.gitignore`, `.github/workflows/verify.yml`
- canonical config at `keris.config.ts`
- generator and smoke tooling under `tooling/`
- distributed skills under `skills/`
- generated client adapters: `.mcp.json`, `server.json`, `.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`

Intentional omissions: `apps/`, `packages/`, `TESTING.md`, `knip.json`, `codecov.yml`, `biome.json`, `turbo.json`, `pnpm-workspace.yaml`, and `.npmrc` until the plugin pack grows into a workspace or needs private GitHub Packages.
