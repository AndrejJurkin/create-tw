/* eslint-disable @typescript-eslint/no-empty-function */
import chalk from "chalk";
import { PKG_ROOT } from "./../constants";
import fs from "fs-extra";
import path from "path";
import { PackageManager } from "../utils/getPackageManager.js";
import { createViteCommand } from "./commands/createVite.js";
import { createNextCommand } from "./commands/createNext.js";
import { createAstroCommand } from "./commands/createAstro.js";
import { createNuxtCommand } from './commands/createNuxt.js';
import createSvelteCommand from "./commands/createSvelte.js";
import createSolidCommand from "./commands/createSolid.js";

/**
 * Node dependency
 */
export interface Dependency {
  package: string;
  type: "dev" | "prod";
}

/**
 * Tailwind CSS Plugin definition
 */
export interface Plugin {
  package: string;
  addConfigImport: boolean;
}

/**
 * Nuxt module definition
 */
export interface Module {
  package: string;
  type: "dev" | "prod";
}

/**
 * The extra dependencies that we allow to select from when creating a new application.
 */
export const supportedDependencies: readonly Dependency[] = [
  {
    package: "prettier",
    type: "dev",
  },
  {
    package: "clsx",
    type: "dev",
  },
  {
    package: "tailwind-merge",
    type: "prod",
  },
];

/**
 * The '@nuxtjs/tailwindcss' module helps you set up Tailwind CSS (version 3) in your Nuxt 3 application in seconds.
 */
export const supportedNuxtModule: readonly Module[] = [
  {
    package: "@nuxtjs/tailwindcss",
    type: "dev",
  }
]

/**
 * The TailwindCSS plugins that we allow to select from when creating a new application.
 */
export const supportedPlugins: readonly Plugin[] = [
  {
    package: "@tailwindcss/typography",
    addConfigImport: true,
  },
  {
    package: "@tailwindcss/forms",
    addConfigImport: true,
  },
  {
    package: "@tailwindcss/aspect-ratio",
    addConfigImport: true,
  },
  {
    package: "@tailwindcss/line-clamp",
    addConfigImport: true,
  },
  {
    package: "daisyui",
    addConfigImport: true,
  },
  {
    package: "prettier-plugin-tailwindcss",
    addConfigImport: true,
  },
];

/**
 * The app ids that we currently support.
 */
export const supportedTemplateIds = [
  "nextjs",
  "nextjs-ts",
  "nuxtjs",
  "nuxtjs-ts",
  "vanilla",
  "vanilla-ts",
  "react",
  "react-ts",
  "vue",
  "vue-ts",
  "astro",
  "astro-ts",
  "svelte-kit",
  "svelte-kit-ts",
  "preact",
  "preact-ts",
  "solid",
  "solid-ts",
] as const;

export type Dependencies = typeof supportedDependencies[number];
export type NuxtModule = typeof supportedNuxtModule[number];
export type Plugins = typeof supportedPlugins[number];
export type TemplateId = typeof supportedTemplateIds[number];
export type Language = "ts" | "js";

/**
 * The user input that is passed to the CLI.
 */
export interface UserInput {
  // The name of the project specified by the user, either from arguments or read from stdin.
  projectName: string;

  // Additional dependencies to install specified by the user.
  dependencies: Dependencies[];

  // The Nuxt module(s) to install specified by the user
  modules: NuxtModule[]

  // TailwindCSS plugins to install specified by the user.
  plugins: Plugins[];

  // The package manager to use, it is the one the user used to run the CLI
  packageManager: PackageManager;

  // The directory to create the application in. Calculated based on the app name.
  projectDir: string;

  // The app config by app id.
  appConfig: AppConfig;
}

export interface AppConfig {
  templateId: TemplateId;
  displayName: string;
  modules?: Module[];
  dependencies?: Dependencies[];
  plugins?: Plugins[];
  language: Language;
  templateDir: string;
  scaffoldingTool: string;
  twConfigExtension: string;
  twDependencies?: readonly Dependency[];
  skipTailwindInstall?: boolean;
  copyTemplate: (userInput: UserInput) => Promise<void>;
  deleteFiles?: (userInput: UserInput) => Promise<void>;
  getCssOutputPath: (userInput: UserInput) => string;
  createInstallCommand: (userInput: UserInput) => string | Promise<void>;
}

export const NEXTJS_CONFIG: AppConfig = {
  templateId: "nextjs",
  displayName: `Next.js ${chalk.dim("(create-next-app)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/nextjs"),
  scaffoldingTool: "create-next-app",
  twConfigExtension: ".js",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(NEXTJS_CONFIG.templateDir, "index.jsx"),
      path.join(projectDir, "pages", "index.js"),
    );
  },
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "styles/Home.module.css"));
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "styles", "globals.css");
  },
  createInstallCommand: createNextCommand,
};

export const NEXTJS_TS_CONFIG: AppConfig = {
  templateId: "nextjs-ts",
  displayName: `${chalk.bold("Next.js TS")} ${chalk.dim("(create-next-app)")}`,
  language: "ts",
  templateDir: path.join(PKG_ROOT, "templates/nextjs-ts"),
  scaffoldingTool: "create-next-app",
  twConfigExtension: ".js",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(NEXTJS_TS_CONFIG.templateDir, "index.tsx"),
      path.join(projectDir, "pages", "index.tsx"),
    );
  },
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "styles/Home.module.css"));
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "styles", "globals.css");
  },
  createInstallCommand: createNextCommand,
};

export const NUXTJS_CONFIG: AppConfig = {
  templateId: "nuxtjs",
  displayName: `Nuxt ${chalk.dim("(nuxi init)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/nuxtjs"),
  scaffoldingTool: "nuxi init",
  twConfigExtension: ".js",
    copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(NUXTJS_CONFIG.templateDir, "app.vue"),
      path.join(projectDir, "app.vue"),
      );

    await fs.copy(
      path.join(NUXTJS_CONFIG.templateDir, "nuxt.config.js"),
      path.join(projectDir, "nuxt.config.js"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "assets", "main.css");
  },
  createInstallCommand: createNuxtCommand,
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "nuxt.config.ts"));
  },
}


export const NUXTJS_TS_CONFIG: AppConfig = {
  templateId: "nuxtjs-ts",
  displayName: `${chalk.bold("Nuxt TS")} ${chalk.dim("(nuxi init)")}`,
  language: "ts",
  templateDir: path.join(PKG_ROOT, "templates/nuxtjs-ts"),
  scaffoldingTool: "nuxi init",
  twConfigExtension: ".ts",
    copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(NUXTJS_CONFIG.templateDir, "app.vue"),
      path.join(projectDir, "app.vue"),
      );
      
    await fs.copy(
      path.join(NUXTJS_TS_CONFIG.templateDir, "nuxt.config.ts"),
      path.join(projectDir, "nuxt.config.ts"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "assets", "main.css");
  },
  createInstallCommand: createNuxtCommand,

}

export const VANILLA_CONFIG: AppConfig = {
  templateId: "vanilla",
  displayName: `Vanilla ${chalk.dim("(create-vite)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/vanilla"),
  scaffoldingTool: "create-vite",
  twConfigExtension: ".cjs",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(VANILLA_CONFIG.templateDir, "index.html"),
      path.join(projectDir, "index.html"),
    );
    await fs.copy(
      path.join(VANILLA_CONFIG.templateDir, "main.js"),
      path.join(projectDir, "main.js"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "style.css");
  },
  createInstallCommand: createViteCommand,
};

export const VANILLA_TS_CONFIG: AppConfig = {
  templateId: "vanilla-ts",
  displayName: `Vanilla ${chalk.dim("(TypeScirpt, create-vite)")}`,
  language: "ts",
  templateDir: path.join(PKG_ROOT, "templates/vanilla-ts"),
  scaffoldingTool: "create-vite",
  twConfigExtension: ".cjs",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(VANILLA_TS_CONFIG.templateDir, "index.html"),
      path.join(projectDir, "index.html"),
    );
    await fs.copy(
      path.join(VANILLA_TS_CONFIG.templateDir, "main.ts"),
      path.join(projectDir, "src/main.ts"),
    );
  },
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "src/counter.ts"));
    await fs.remove(path.join(projectDir, "src/typescript.svg"));
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src", "style.css");
  },
  createInstallCommand: createViteCommand,
};

export const REACT_CONFIG: AppConfig = {
  templateId: "react",
  displayName: `React ${chalk.dim("(create-vite)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/react"),
  scaffoldingTool: "create-vite",
  twConfigExtension: ".cjs",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(REACT_CONFIG.templateDir, "App.jsx"),
      path.join(projectDir, "src/App.jsx"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src/index.css");
  },
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "src/app.css"));
  },
  createInstallCommand: createViteCommand,
};

export const REACT_TS_CONFIG: AppConfig = {
  templateId: "react-ts",
  displayName: `React ${chalk.dim("(TypeScript, create-vite)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/react-ts"),
  scaffoldingTool: "create-vite",
  twConfigExtension: ".cjs",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(REACT_TS_CONFIG.templateDir, "App.tsx"),
      path.join(projectDir, "src/App.tsx"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src/index.css");
  },
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "src/app.css"));
  },
  createInstallCommand: createViteCommand,
};

export const VUE_CONFIG: AppConfig = {
  templateId: "vue",
  displayName: `Vue ${chalk.dim("(create-vite)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/vue"),
  scaffoldingTool: "create-vite",
  twConfigExtension: ".cjs",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(VUE_CONFIG.templateDir, "App.vue"),
      path.join(projectDir, "src/App.vue"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src/style.css");
  },
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "src/components"));
  },
  createInstallCommand: createViteCommand,
};

export const VUE_TS_CONFIG: AppConfig = {
  templateId: "vue-ts",
  displayName: `Vue ${chalk.dim("(TypeScript, create-vite)")}`,
  language: "ts",
  templateDir: path.join(PKG_ROOT, "templates/vue-ts"),
  scaffoldingTool: "create-vite",
  twConfigExtension: ".cjs",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(VUE_CONFIG.templateDir, "App.vue"),
      path.join(projectDir, "src/App.vue"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src/style.css");
  },
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "src/components"));
  },
  createInstallCommand: createViteCommand,
};

export const ASTRO_CONFIG: AppConfig = {
  templateId: "astro",
  displayName: `Astro ${chalk.dim("(create-astro)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/astro"),
  scaffoldingTool: "create-astro",
  twConfigExtension: ".cjs",
  skipTailwindInstall: true,
  copyTemplate: async () => {},
  getCssOutputPath: () => "",
  createInstallCommand: createAstroCommand,
  deleteFiles: async () => {},
};

export const ASTRO_TS_CONFIG: AppConfig = {
  ...ASTRO_CONFIG,
};

export const SVELTE_KIT_CONFIG: AppConfig = {
  templateId: "svelte-kit",
  displayName: `Svelte Kit ${chalk.dim("(create-svelte)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/svelte-kit"),
  scaffoldingTool: "create-svelte",
  twConfigExtension: ".cjs",
  twDependencies: [
    {
      package: "svelte-preprocess",
      type: "dev",
    },
  ],
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(SVELTE_KIT_CONFIG.templateDir, "+layout.svelte"),
      path.join(projectDir, "src/routes/+layout.svelte"),
    );
    await fs.copy(
      path.join(SVELTE_KIT_CONFIG.templateDir, "+page.svelte"),
      path.join(projectDir, "src/routes/+page.svelte"),
    );
    await fs.copy(
      path.join(SVELTE_KIT_CONFIG.templateDir, "svelte.config.js"),
      path.join(projectDir, "svelte.config.js"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src/style.css");
  },
  createInstallCommand: createSvelteCommand,
  deleteFiles: async () => {},
};

export const SVELTE_KIT_TS_CONFIG: AppConfig = {
  ...SVELTE_KIT_CONFIG,
};

export const PREACT_CONFIG: AppConfig = {
  templateId: "preact",
  displayName: `Preact ${chalk.dim("(create-vite)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/preact"),
  scaffoldingTool: "create-vite",
  twConfigExtension: ".cjs",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(PREACT_CONFIG.templateDir, "index.js"),
      path.join(projectDir, "src/app.jsx"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src/index.css");
  },
  createInstallCommand: createViteCommand,
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "src/app.css"));
  },
};

export const PREACT_TS_CONFIG: AppConfig = {
  templateId: "preact-ts",
  displayName: `Preact ${chalk.dim("(TypeScirpt, create-vite)")}`,
  language: "ts",
  templateDir: path.join(PKG_ROOT, "templates/preact-ts"),
  scaffoldingTool: "create-vite",
  twConfigExtension: ".cjs",
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(PREACT_TS_CONFIG.templateDir, "index.js"),
      path.join(projectDir, "src/app.tsx"),
    );
  },
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "src/app.css"));
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src", "index.css");
  },
  createInstallCommand: createViteCommand,
};

export const SOLID_CONFIG: AppConfig = {
  templateId: "solid",
  displayName: `Solid ${chalk.dim("(degit solidjs/templates/js)")}`,
  language: "js",
  templateDir: path.join(PKG_ROOT, "templates/solid"),
  scaffoldingTool: "degit",
  twConfigExtension: ".cjs",
  deleteFiles: async ({ projectDir }) => {
    await fs.remove(path.join(projectDir, "pnpm-lock.yaml"));
    await fs.remove(path.join(projectDir, "src/assets"));
    await fs.remove(path.join(projectDir, "src/App.module.css"));
    await fs.remove(path.join(projectDir, "src/logo.svg"));
  },
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(SOLID_CONFIG.templateDir, "App.jsx"),
      path.join(projectDir, "src/App.jsx"),
    );
  },
  getCssOutputPath: ({ projectDir }) => {
    return path.join(projectDir, "src", "index.css");
  },
  createInstallCommand: createSolidCommand,
};

export const SOLID_TS_CONFIG: AppConfig = {
  ...SOLID_CONFIG,
  templateId: "solid-ts",
  displayName: `Solid ${chalk.dim("(degit solidjs/templates/ts)")}`,
  language: "ts",
  templateDir: path.join(PKG_ROOT, "templates/solid-ts"),
  copyTemplate: async ({ projectDir }) => {
    await fs.copy(
      path.join(SOLID_TS_CONFIG.templateDir, "App.tsx"),
      path.join(projectDir, "src/App.tsx"),
    );
  },
};

export const CONFIG_BY_ID: Record<string, AppConfig> = {
  nextjs: NEXTJS_CONFIG,
  "nextjs-ts": NEXTJS_TS_CONFIG,
  nuxtjs: NUXTJS_CONFIG,
  "nuxtjs-ts": NUXTJS_TS_CONFIG,
  vanilla: VANILLA_CONFIG,
  "vanilla-ts": VANILLA_TS_CONFIG,
  react: REACT_CONFIG,
  "react-ts": REACT_TS_CONFIG,
  vue: VUE_CONFIG,
  "vue-ts": VUE_TS_CONFIG,
  astro: ASTRO_CONFIG,
  "astro-ts": ASTRO_TS_CONFIG,
  "svelte-kit": SVELTE_KIT_CONFIG,
  "svelte-kit-ts": SVELTE_KIT_TS_CONFIG,
  preact: PREACT_CONFIG,
  "preact-ts": PREACT_TS_CONFIG,
  solid: SOLID_CONFIG,
  "solid-ts": SOLID_TS_CONFIG,
};

export const getConfig = (configId: string) => CONFIG_BY_ID[configId];

