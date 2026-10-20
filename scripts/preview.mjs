import { cp, access } from "node:fs/promises";
import { spawn } from "node:child_process";
const server = ".next/standalone/server.js";
try { await access(server); } catch { console.error("Run npm run build before npm run preview."); process.exit(1); }
await cp("public", ".next/standalone/public", { recursive: true });
await cp(".next/static", ".next/standalone/.next/static", { recursive: true });
const child = spawn(process.execPath, [server], {
  stdio: "inherit",
  env: { ...process.env, PORT: process.env.PORT || "3001", HOSTNAME: "0.0.0.0" },
});
child.on("exit", code => process.exit(code ?? 0));


