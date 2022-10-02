<script setup>
useHead({
    title: 'Nuxt 3',
    link: [{ rel: 'icon', type: 'svg', href: 'https://api.iconify.design/logos:nuxt-icon.svg' }],
    script: [
        {
            src: "https://buttons.github.io/buttons.js"
        }
    ]
})
</script>
<template>
    <div class="min-h-screen w-full font-sans bg-gradient-to-b from-gray-900 to-slate-800 flex flex-col text-white">
        <header class="py-8">
            <div>
                <div class="flex justify-center items-center mt-10 py-6">
                    <h1 class="text-4xl font-bold md:text-6xl">Create Tailwind</h1>
                </div>
                <div class="flex justify-center items-center space-x-3">
                    <a class="github-button" href="https://github.com/andrejjurkin/create-tailwind-app"
                        data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-star"
                        data-size="large" data-show-count="true"
                        aria-label="Star andrejjurkin/create-tailwind-app on GitHub">
                        Star
                    </a>
                    <a class="github-button" href="https://github.com/andrejjurkin/create-tailwind-app/discussions"
                        data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                        data-icon="octicon-comment-discussion" data-size="large"
                        aria-label="Discuss andrejjurkin/create-tailwind-app on GitHub">
                        Discuss
                    </a>
                </div>
            </div>
        </header>

        <main>
            <div class="text-center space-y-3">
                <h1 class="text-base cursor-pointer md:text-2xl">
                    Nuxt <span class="text-green-500">3</span> Project created using
                    <a href="https://v3.nuxtjs.org/getting-started/installation">
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-sky-500 to-green-500 font-bold">nuxi
                            init</span>
                    </a>
                </h1>

                <h4>Officially maintained by Nuxt Labs</h4>
            </div>
        </main>

        <footer class="mt-40 md:mt-48">
            <div class="flex justify-center items-center">
                <a href="https://github.com/andrejjurkin/create-tailwind-app">
                    Create Tailwind
                </a>
            </div>
        </footer>
    </div>
</template>

