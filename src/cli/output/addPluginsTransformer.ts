/* eslint-disable @typescript-eslint/no-explicit-any */
import * as recast from "recast";
import { Plugin } from "../config.js";

/**
 * Create recast transformer that adds tailwind plugins to tailwind.config.js
 *
 * @param plugins tailwind plugins
 * @returns transformer function that adds tailwind plugins to tailwind.config.js
 */
const addPluginsTransformer = (plugins: Plugin[]) => {
  return (code: any) => {
    const ast = recast.parse(code);

    recast.visit(ast, {
      visitProperty(path: any) {
        if (path.node.key.name === "plugins") {
          path.node.value.elements = [
            ...path.node.value.elements,
            ...plugins
              .filter((p) => p.addConfigImport)
              .map((plugin) => recast.parse(`require("${plugin.package}")`)),
          ];
        }
        this.traverse(path);
      },
    });

    return recast.print(ast).code;
  };
};

export default addPluginsTransformer;
