export type PackageManager = "npm" | "yarn" | "pnpm";

// TODO: Add support for pnpm
export default function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.includes("yarn")) {
      return "yarn";
    }

    if (userAgent.includes("npm")) {
      return "npm";
    }

    if (userAgent.includes("pnpm")) {
      return "pnpm";
    }
  }

  return "npm";
}
