import execAsync from "./execAsync";
import { PackageManager } from "./getPackageManager";

interface Options {
  packageManager: PackageManager;
  dev: boolean;
  projectDir: string;
  packages: string[];
}

export default async function installPackages(options: Options) {
  const { packageManager, dev, projectDir, packages } = options;

  if (!packages.length) {
    return;
  }

  const installCommand = packageManager === "npm" ? "install" : "add";
  const flags = dev ? "-D" : "";
  const cmd = `${
    packageManager as string
  } ${installCommand} ${flags} ${packages.join(" ")}`;

  await execAsync(cmd, { cwd: projectDir });
}
