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
