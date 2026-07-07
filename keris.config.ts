/**
 * Canonical source of truth for every Keris install adapter.
 *
 * One config in — every client manifest out. Run `pnpm generate` to (re)emit
 * `.mcp.json`, the Cursor / Codex / Claude Code plugin manifests, the MCP
 * Registry `server.json`, and the README install block. Never hand-edit the
 * generated files; edit this config and regenerate.
 */

export interface KerisConfig {
	/** Machine-facing id (plugin name, mcp server key). */
	name: string;
	/** Human-facing name. */
	displayName: string;
	version: string;
	/** Short marketing line. */
	tagline: string;
	/** One-sentence description (manifests, marketplace cards). */
	shortDescription: string;
	/** Paragraph for marketplace long-description surfaces. */
	longDescription: string;
	homepage: string;
	repository: string;
	license: string;
	owner: { name: string; email: string };
	/** Marketplace category. */
	category: string;
	keywords: string[];
	/** Logo path, repo-relative. */
	logo: string;
	mcp: {
		/** Server key used in `.mcp.json` and as the registry short name. */
		id: string;
		/** Remote Streamable HTTP MCP endpoint. */
		url: string;
		transport: "streamable-http";
	};
	/** Reverse-DNS name for the official MCP Registry server.json. */
	registryName: string;
	skill: {
		/** Proof-first skill directory under skills/. */
		name: string;
		/** Discovery aliases (e.g. "share-video"). */
		aliases: string[];
	};
}

export const keris: KerisConfig = {
	name: "keris",
	displayName: "Keris",
	version: "0.1.0",
	tagline: "Prove what your agent shipped.",
	shortDescription:
		"Turn agent work into a short, narrated proof video — every beat backed by real commits, PRs, and diffs.",
	longDescription:
		"Keris turns what your coding agent just shipped into a short, narrated video — a receipt, not a recap. Every generated proof is grounded in real commits, PRs, diffs, and bounded evidence through the Keris GitHub app, so reviewers can trust what they are watching. Use generate_video for proof-bound agent work, then share a stable keris.video watch link your team can keep up with.",
	homepage: "https://keris.video",
	repository: "https://github.com/creative-int/keris-plugins",
	license: "MIT",
	owner: { name: "creative-int", email: "support@keris.app" },
	category: "Productivity",
	keywords: [
		"keris",
		"agent-skills",
		"mcp",
		"video",
		"proof",
		"evidence",
		"changelog",
		"pr-recap",
	],
	logo: "./assets/logo.png",
	mcp: {
		id: "keris",
		url: "https://mcp.keris.video/mcp",
		transport: "streamable-http",
	},
	registryName: "io.github.creative-int/keris",
	skill: {
		name: "keris-video-proof",
		aliases: ["share-video"],
	},
};

export default keris;
