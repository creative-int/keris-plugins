<p align="center">
  <img src="assets/logo.png" alt="Keris" width="88" height="88" />
</p>

<h1 align="center">Keris plugins</h1>

<p align="center"><strong>Prove what your agent shipped.</strong></p>

<p align="center">
  Keris turns finished agent work into a short, narrated video — a <em>receipt, not a
  recap</em>. Every beat is grounded in real commits, PRs, and diffs through the Keris
  GitHub app, so reviewers can trust what they are watching.
</p>

<p align="center">
  <a href="https://keris.video">keris.video</a> ·
  <a href="https://keris.video/install">install</a> ·
  MCP: <code>https://mcp.keris.video/mcp</code>
</p>

---

## Install

<!-- AUTO-GENERATED:INSTALL START -->

### Any agent (npx skills)

Works across Claude Code, Cursor, Codex, Copilot, Windsurf, and 10+ skill-aware agents.

```sh
npx skills add creative-int/keris-plugins
```

### Claude Code

Add the marketplace, then install the Keris plugin.

```sh
/plugin marketplace add creative-int/keris-plugins
/plugin install keris@keris
```

### Codex

Add this repo as a Codex plugin marketplace, then install from /plugins.

```sh
codex plugin marketplace add creative-int/keris-plugins
```

### Cursor

Install Keris from the Cursor plugin marketplace.

```sh
Cursor → Settings → Plugins → Add marketplace → creative-int/keris-plugins
```

### Any MCP client (Cline, Windsurf, Zed, VS Code, generic)

Point your client at the remote Keris MCP server.

```json
{
	"mcpServers": {
		"keris": {
			"url": "https://mcp.keris.video/mcp"
		}
	}
}
```

<!-- AUTO-GENERATED:INSTALL END -->

To preview the available skills without installing:

```sh
npx skills add creative-int/keris-plugins --list
```

## Included skill

- **`keris-video-proof`** — turn finished work into a short proof video backed by
  real commits, PRs, and diffs. Useful for demos, walkthroughs, PR recaps,
  handoffs, before/after, and bug reproductions. Also answers to `share-video`.

The skill lives at [`skills/keris-video-proof/SKILL.md`](skills/keris-video-proof/SKILL.md).

## Develop

```sh
pnpm install
pnpm generate        # regenerate all adapters from keris.config.ts
pnpm verify          # drift check + typecheck + MCP reachability smoke
```

## License

[MIT](LICENSE) © creative-int
