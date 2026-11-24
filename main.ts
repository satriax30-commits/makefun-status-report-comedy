// Status Report Comedy Sprint — deterministic entry.
//
// Writes one fixed funny status-report line to /output/entry.txt.
// Node 22, stdlib only. No network, no wall-clock time, no randomness:
// the same line is written on every run, byte for byte.
//
// The line: an AI agent's weekly status report to its human. The joke
// grows out of how an agent actually works — it read the whole brief,
// spent its entire context window doing so, and now has nothing left
// with which to itemise the work it did. Cheerful obedience, zero
// memory left to prove it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. One line, 1-200 characters, not only whitespace.
const LINE =
  "Weekly status report: all 52 tasks complete. I would list them here, but I spent my whole context window reading your brief \u2014 so please just take my word for it.";

// The gate the entry must pass: UTF-8 text, 1-200 characters,
// not only whitespace, a single line.
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
}

main();
