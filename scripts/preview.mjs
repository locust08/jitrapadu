import { access } from "node:fs/promises";
import { spawn } from "node:child_process";
try { await access('.next/BUILD_ID'); } catch { console.error("Run npm run build before npm run preview."); process.exit(1); }
// Keep the checkout as cwd so the local CMS database and upload paths stay consistent.
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', process.env.PORT || '3001', '--hostname', 'localhost'], {
  stdio: "inherit",
  env: process.env,
});
child.on("exit", code => process.exit(code ?? 0));


