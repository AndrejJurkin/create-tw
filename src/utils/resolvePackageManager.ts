import { PackageManager } from "./getPackageManager.js";

// The --yes is to automatically accept latest version prompt
// We use npx to install the latest version of scaffolding tools
export function resolvePacakgeManager(packageManager: PackageManager) {
  return packageManager === "npm" ? "npx --yes" : packageManager;
}
