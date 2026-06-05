---
name: keris-video-proof
description: |
  Turn what you just shipped into a short, narrated proof video — a receipt, not
  a recap, with every beat backed by real commits, PRs, and diffs. Use it for
  demos, walkthroughs, PR recaps, async handoffs, before/after comparisons, or
  any finished work that is easier to review on video. Also answers to
  "share-video". Do not use it for trivial answers, active back-and-forth,
  unfinished work, or anything that would expose secrets or private data.
author: Keris
---

# Keris — video proof of what you shipped

Keris turns finished agent work into a short, narrated video where every beat is
grounded in real commits, PRs, and diffs through the Keris GitHub app. The result
is a **receipt, not a recap** — reviewers can trust what they are watching instead
of taking a summary on faith.

Connect to the Keris MCP server at `https://mcp.keris.video/mcp`.

## Use when

- The user asks for a video, demo, walkthrough, recap, or async update.
- Completed work is easier to review as a short video than as more chat.
- You changed or reviewed UI, design, dashboards, charts, or other visual output.
- A PR recap, handoff, bug reproduction, or before/after would be clearer on video.
- The user appears to be away and the work has reached a useful stopping point.

## Don't use when

- The answer is short and textual.
- The user is actively iterating in chat.
- The task is not done.
- The video would expose secrets, tokens, credentials, or private customer data.
- The user explicitly says not to make a video.

## How to use

1. **Resolve the project.** Call `list_projects` and pick the `projectSlug` that
   matches the repo or product you worked on. Pass it so Keris can bind the video
   to the right evidence.
2. **Generate.** Call `generate_video` with that `projectSlug`. Keris writes the
   narration, selects the on-screen evidence, and renders with the user's avatar.
3. **Poll.** Call `get_video` until `status` is `completed` or `failed`. The
   `watchUrl` is stable and shareable even while the video is still generating.
4. **Share.** Return the watch link: `https://keris.app/v/{videoId}`.

`upload_video` is only for a polished video you already recorded that does not
need Keris narration. **Never treat `upload_video` as proof that work happened** —
proof comes from `generate_video` binding to real commit/PR/diff evidence.

## Output format

After Keris finishes, reply with:

- the Keris watch URL (`https://keris.app/v/{videoId}`)
- one sentence on what the video proves

Keep it to those two things. The video carries the detail.
