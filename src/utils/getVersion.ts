import packageJson from "../../package.json";

export function getVersion() {
  return packageJson.version;
}
