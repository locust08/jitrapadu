import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "review:build"], { stdio: "inherit" });
process.exit(result.status ?? 1);
