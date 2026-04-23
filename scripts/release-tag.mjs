#!/usr/bin/env node
/**
 * Create an annotated git tag using the latest commit subject and body as the tag message.
 * Usage: npm run release:tag -- 1.0.6
 *        npm run release:tag -- v1.0.6
 */
import { execFileSync } from "node:child_process"
import { exit } from "node:process"

function runGit(args, opts = {}) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"], ...opts }).trim()
}

const raw = process.argv[2]
if (!raw || raw === "-h" || raw === "--help") {
  console.error("Usage: npm run release:tag -- <version>")
  console.error("Example: npm run release:tag -- 1.0.6   → creates annotated tag v1.0.6")
  console.error("The tag message is taken from the latest commit (subject + body).")
  exit(1)
}

const tag = raw.startsWith("v") ? raw : `v${raw}`

try {
  runGit(["rev-parse", "-q", "--verify", `refs/tags/${tag}`], { stdio: "ignore" })
  console.error(`Tag already exists: ${tag}`)
  exit(1)
} catch {
  // no such tag
}

let subject
let body
try {
  subject = runGit(["log", "-1", "--pretty=%s"])
  body = runGit(["log", "-1", "--pretty=%b"])
} catch {
  console.error("Failed to read git log. Run from the use-react repo root.")
  exit(1)
}

const message = body ? `${subject}\n\n${body}` : subject

execFileSync("git", ["tag", "-a", tag, "-m", message], { stdio: "inherit" })

console.log(`Created annotated tag ${tag} with message from HEAD commit.`)
console.log(`Push with: git push origin ${tag}`)
