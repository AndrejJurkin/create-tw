import path from "path";
import { fileURLToPath } from "url";

export const APP_NAME = "create-tailwind-app";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const COMMON_TEMPLATES_ROOT = path.join(
  PKG_ROOT,
  "src/templates/common",
);
