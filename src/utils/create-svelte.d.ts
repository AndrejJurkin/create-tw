// Create Svelte is not typed unfortunately.
// We need to maintain this manually for now.
declare module "create-svelte" {
  interface Options {
    name: string;
    template: "default" | "skeleton";
    types: "typescript" | "checkjs" | null;
    prettier: boolean;
    eslint: boolean;
    playwright: boolean;
  }

  export function create(cwd: unknown, option: Options): Promise<void>;
}
