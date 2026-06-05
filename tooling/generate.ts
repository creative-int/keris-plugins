/**
 * Emit every Keris install adapter from the single canonical config.
 *
 *   pnpm generate        # write all generated files
 *   pnpm generate --check  # fail if any generated file is stale (CI drift gate)
 *
 * Generated files (never hand-edit): .mcp.json, .claude-plugin/*,
 * .codex-plugin/*, .cursor-plugin/*, server.json, and the README install block.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { keris } from "../keris.config.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");
const repoGit = `${keris.repository}.git`;
const author = { name: keris.owner.name, email: keris.owner.email };

const json = (value: unknown) => `${JSON.stringify(value, null, "\t")}\n`;

/** Per-client install instructions — also the source for README + the app. */
export const installClients = [
	{
		id: "skills",
		label: "Any agent (npx skills)",
		blurb:
			"Works across Claude Code, Cursor, Codex, Copilot, Windsurf, and 10+ skill-aware agents.",
		steps: [`npx skills add ${slug()}`],
	},
	{
		id: "claude-code",
		label: "Claude Code",
		blurb: "Add the marketplace, then install the Keris plugin.",
		steps: [
			`/plugin marketplace add ${slug()}`,
			`/plugin install ${keris.name}@${keris.name}`,
		],
	},
	{
		id: "codex",
		label: "Codex",
		blurb: "Add this repo as a Codex plugin marketplace, then install from /plugins.",
		steps: [`codex plugin marketplace add ${slug()}`],
	},
	{
		id: "cursor",
		label: "Cursor",
		blurb: "Install Keris from the Cursor plugin marketplace.",
		steps: [`Cursor → Settings → Plugins → Add marketplace → ${slug()}`],
	},
	{
		id: "mcp",
		label: "Any MCP client (Cline, Windsurf, Zed, VS Code, generic)",
		blurb: "Point your client at the remote Keris MCP server.",
		steps: [json({ mcpServers: { [keris.mcp.id]: { url: keris.mcp.url } } }).trim()],
	},
];

function slug() {
	return keris.repository.replace("https://github.com/", "");
}

const files: Record<string, string> = {
	".mcp.json": json({ mcpServers: { [keris.mcp.id]: { url: keris.mcp.url } } }),

	".claude-plugin/plugin.json": json({
		name: keris.name,
		version: keris.version,
		description: keris.shortDescription,
		author,
		homepage: keris.homepage,
		repository: repoGit,
		license: keris.license,
		keywords: keris.keywords,
		displayName: keris.displayName,
		skills: "./skills",
		mcpServers: "./.mcp.json",
	}),
	".claude-plugin/marketplace.json": json({
		name: keris.name,
		owner: author,
		plugins: [
			{
				name: keris.name,
				displayName: keris.displayName,
				source: "./",
				description: keris.shortDescription,
			},
		],
	}),

	".codex-plugin/plugin.json": json({
		name: keris.name,
		version: keris.version,
		description: keris.shortDescription,
		author,
		homepage: keris.homepage,
		repository: repoGit,
		license: keris.license,
		keywords: keris.keywords,
		skills: "./skills",
		mcpServers: "./.mcp.json",
		interface: {
			displayName: keris.displayName,
			shortDescription: keris.shortDescription,
			longDescription: keris.longDescription,
			developerName: keris.owner.name,
			category: keris.category,
			logo: keris.logo,
		},
	}),

	".cursor-plugin/plugin.json": json({
		name: keris.name,
		version: keris.version,
		description: keris.shortDescription,
		author,
		homepage: keris.homepage,
		repository: repoGit,
		license: keris.license,
		keywords: keris.keywords,
		displayName: keris.displayName,
		logo: keris.logo.replace("./", ""),
		skills: "./skills",
		mcpServers: "./.mcp.json",
	}),
	".cursor-plugin/marketplace.json": json({
		name: keris.name,
		owner: author,
		metadata: { description: keris.shortDescription },
		plugins: [
			{ name: keris.name, source: ".", description: keris.shortDescription },
		],
	}),

	// Official MCP Registry server metadata (remote Streamable HTTP).
	"server.json": json({
		$schema:
			"https://static.modelcontextprotocol.io/schemas/2025-09-29/server.schema.json",
		name: keris.registryName,
		description: keris.shortDescription,
		version: keris.version,
		repository: { url: keris.repository, source: "github" },
		remotes: [{ type: keris.mcp.transport, url: keris.mcp.url }],
	}),
};

/** README install block, rendered between AUTO-GENERATED markers. */
function readmeInstallBlock() {
	const lines = installClients.map((c) => {
		const body =
			c.id === "mcp"
				? ["```json", c.steps[0], "```"].join("\n")
				: ["```sh", ...c.steps, "```"].join("\n");
		return `### ${c.label}\n\n${c.blurb}\n\n${body}`;
	});
	return lines.join("\n\n");
}

const START = "<!-- AUTO-GENERATED:INSTALL START -->";
const END = "<!-- AUTO-GENERATED:INSTALL END -->";

function applyReadme(current: string): string {
	const block = `${START}\n\n${readmeInstallBlock()}\n\n${END}`;
	const re = new RegExp(`${START}[\\s\\S]*?${END}`);
	if (!re.test(current)) {
		throw new Error("README is missing the AUTO-GENERATED:INSTALL markers.");
	}
	return current.replace(re, block);
}

let stale = 0;
const report = (rel: string) => {
	console.log(`${CHECK ? "stale" : "wrote"}: ${rel}`);
	stale += 1;
};

for (const [rel, content] of Object.entries(files)) {
	const path = join(ROOT, rel);
	const existing = safeRead(path);
	if (existing === content) continue;
	if (CHECK) report(rel);
	else {
		writeFileSync(path, content);
		report(rel);
	}
}

// README block
{
	const path = join(ROOT, "README.md");
	const current = safeRead(path);
	if (current !== null) {
		const next = applyReadme(current);
		if (next !== current) {
			if (CHECK) report("README.md (install block)");
			else {
				writeFileSync(path, next);
				report("README.md (install block)");
			}
		}
	}
}

function safeRead(path: string): string | null {
	try {
		return readFileSync(path, "utf8");
	} catch {
		return null;
	}
}

if (CHECK && stale > 0) {
	console.error(
		`\n${stale} generated file(s) are stale. Run \`pnpm generate\` and commit.`,
	);
	process.exit(1);
}
console.log(CHECK ? "generated files are up to date." : "generated all adapters.");
