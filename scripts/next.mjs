import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = resolve(root, "node_modules/next/dist/bin/next");
const nextArgs = process.argv.slice(2);
const nodeArgs = process.allowedNodeEnvironmentFlags.has("--no-webstorage")
  ? ["--no-webstorage"]
  : [];

const child = spawn(process.execPath, [...nodeArgs, nextBin, ...nextArgs], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
