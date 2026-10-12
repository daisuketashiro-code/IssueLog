import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

function parseEnvFile(text: string) {
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

export function loadLocalEnv() {
  const paths = [resolve(process.cwd(), ".env")];
  try {
    paths.push(resolve(fileURLToPath(import.meta.url), "../../.env"));
  } catch {
    // Next のバンドル後は import.meta.url が使えないことがある。cwd 側で足りる。
  }

  for (const path of paths) {
    if (!existsSync(path)) continue;
    parseEnvFile(readFileSync(path, "utf8"));
    return;
  }
}
