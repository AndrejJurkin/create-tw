import path from "path";
import { fileURLToPath } from "url";

export const APP_NAME = "create-tw";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const COMMON_TEMPLATES_ROOT = path.join(PKG_ROOT, "templates/common");

/**
 * - developper friendly
 * Made installation of deps by default
 * Set to false, deps won't be installed but
 * the project will be ready for install.
 * default set to true
 */
export const INSTALL_DEP = true;

/**
 * Developer friendly
 * Don't force Ctrc+C to kill the process,
 * when an installation is done, you can do another one
 * after it until you kill the process
 * Default set to false
 */

export const REPEATED = false;

