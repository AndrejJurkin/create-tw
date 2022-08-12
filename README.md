<img width="1232" alt="image" src="https://user-images.githubusercontent.com/6149523/183829179-d46d555e-d4a0-4dec-9032-be30cc765038.png">

# Create Tailwind (create-tw)
### The easiest way to get started with TailwindCSS.
It uses popular scaffolding scripts like `create-next-app` or `create-vite` to scaffold projects and then configures TailwindCSS to work with your project out of the box.

#### npx
```bash
npx create-tw@latest

# OR

npx create-tw@latest <project-name> --template <id>
```
#### yarn
```bash
yarn create tw

# OR

yearn create tw <project-name> --template <id> 
```

### Currently in very early stage of development
Ideas, suggestions and bug reports are much appreciated.
In the following days I'm planning to add support for React, Vue & Svelte with Vite. 



### Scaffolding tools

|id        | Template   | Tool            |
|:---------|:-----------|:----------------|
|nextjs    | Next.js    | create-next-app |
|vanilla   | Vanilla    | create-vite     |
|react     | React      | create-vite     |
|vue       | Vue        | create-vite     |
|astro     | Astro      | create-astro    |
|svelte-kit| Svelte Kit | create-svelte   |
|preact    | Preact     | create-vite     |

NOTE: Add the `-ts` postfix to the ID to install with TypeScript

### Include template id to skip input steps

```bash
npx create-tw@latest --template <id>
# OR
yarn create tw --template <id>
```
