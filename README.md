# Create TailwindCSS Project (create-tw)

### Currently in very early stage of development
This CLI is very very early in development. In the following days I'm planning to add support for React, Vue & Svelte with Vite. Ideas, suggestions and bug reports are much appreciated.

### The easiest way to get started with TailwindCSS.

It uses popular scaffolding scripts like `create-next-app` or `create-vite` to scaffold projects and then configures TailwindCSS to work with your project out of the box.

```bash
npx create-tw@latest
# OR
yarn create tw
```

### Scaffolding tools

|id        | Template   | Tool            |
|:---------|:-----------|:----------------|
|nextjs    | Next.js    | create-next-app |
|nextjs-ts | Next.js TS | create-next-app |
|vanilla   | Vanilla    | create-vite     |
|vanilla-ts| Vanilla TS | create-vite     |

You can include template id to skip input steps

```bash
npx create-tw@latest --template <id>
# OR
yarn create tw --template <id>
```
