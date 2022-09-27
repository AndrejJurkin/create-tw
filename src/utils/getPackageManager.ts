export type PackageManager = "npm" | "yarn" | "pnpm";

/**
 * @link https://stackoverflow.com/a/69301988
 * 
 * @returns best guess at user's package manager
 */
export default function getPackageManager() {
  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const agent = process.env.npm_config_user_agent;

  if (!agent) {
      // This environment variable is set on Linux but I'm not sure about other OSes.
      const parent = process.env._;

      if (!parent) {
          // No luck, assume npm
          return "npm";
      }

      if (parent.endsWith("pnpx") || parent.endsWith("pnpm")) return "pnpm";
      if (parent.endsWith("yarn")) return "yarn";

      // Assume npm for anything else
      return "npm";
  }

  const [program] = agent.split("/");

  if (program === "yarn") return "yarn";
  if (program === "pnpm") return "pnpm";

  // Assume npm
  return "npm";
};