# Create TailwindCSS Project (create-tw)
![image](https://user-images.githubusercontent.com/6149523/182625742-6957eed3-e12b-4ee8-a514-2a5f5d784e6b.png)

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

NOTE: Add the `-ts` postfix to the ID to install with TypeScript

### Include template id to skip input steps

```bash
npx create-tw@latest --template <id>
# OR
yarn create tw --template <id>
```
