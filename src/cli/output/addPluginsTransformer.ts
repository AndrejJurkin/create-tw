import * as recast from "recast";

const addPluginsTransformer = (plugins: string[]) => {
  return (code: any) => {
    const ast = recast.parse(code);

    recast.visit(ast, {
      visitProperty(path: any) {
        if (path.node.key.name === "plugins") {
          path.node.value.elements = [
            ...path.node.value.elements,
            ...plugins.map((plugin) => recast.parse(`require('${plugin}')`)),
          ];
        }
        this.traverse(path);
      },
    });

    return recast.print(ast).code;
  };
};

export default addPluginsTransformer;
