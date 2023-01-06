import Head from "next/head";
import Script from "next/script";
import Image from "next/image";

import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={inter.className} >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col items-center justify-between py-6 text-center lg:py-24 ">
        <div className="absolute inset-0 -z-10 bg-[url(https://res.cloudinary.com/dd4p0ksdu/image/upload/v1672967091/R_jdasay.png)] bg-[length:300px] bg-repeat opacity-10  brightness-0 "></div>
        <header>
          <div className="mb-4 flex items-center justify-center gap-3">
            <h1 className="ml-3.5 whitespace-nowrap text-4xl font-black text-sky-400 lg:text-5xl">
              Create Tailwind
            </h1>
            <svg
              viewBox="0 0 592 356"
              className="h-w-12 w-12 rounded-lg bg-sky-400 fill-white py-3 px-2"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M296 0C217.086 0 167.753 39.5556 148 118.667C177.613 79.1273 212.14 64.296 251.581 74.1727C274.128 79.8073 290.122 96.1768 308.044 114.295C336.951 143.828 370.675 177.976 444 177.976C522.914 177.976 572.247 138.42 592 59.309C562.419 98.8808 527.892 113.712 488.419 103.803C465.872 98.1684 449.878 81.7989 431.956 63.6807C402.953 34.0019 369.374 0 296 0ZM148 177.976C69.0859 177.976 19.7526 217.531 0 296.642C29.645 257.103 64.1719 242.272 103.581 252.148C126.128 257.783 142.122 274.153 160.044 292.319C188.951 321.804 222.674 356 296 356C374.914 356 424.247 316.444 444 237.333C414.419 276.873 379.892 291.672 340.419 281.73C317.872 276.096 301.878 259.726 283.956 241.608C255.049 212.075 221.326 177.879 148 177.879V177.976Z"
              />
            </svg>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <a
              className="github-button"
              href="https://github.com/andrejjurkin/create-tailwind-app"
              data-color-scheme="no-preference: dark; light: dark; dark: dark;"
              data-icon="octicon-star"
              data-size="large"
              rel="noreferrer"
              data-show-count="true"
              aria-label="Star andrejjurkin/create-tailwind-app on GitHub">
              Star
            </a>
            <a
              className="github-button"
              href="https://github.com/andrejjurkin/create-tailwind-app/discussions"
              data-color-scheme="no-preference: dark; light: dark; dark: dark;"
              data-icon="octicon-comment-discussion"
              data-size="large"
              aria-label="Discuss andrejjurkin/create-tailwind-app on GitHub">
              Discuss
            </a>
          </div>
        </header>
        <main>
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={240}
            height={37}
            priority
            className="ml-4"
          />
          <h2 className="mt-6 text-lg">
            Project created using <br />
            <a
              target="_blank"
              href="https://nextjs.org/docs/api-reference/create-next-app"
              className="font-bold underline-offset-4 hover:text-sky-400 hover:underline">
              create-next-app
            </a>
          </h2>
        </main>
        <footer>
          <h2 className="mb-4 text-xl font-bold text-sky-400">Docs</h2>
          <div className="grid  grid-cols-2 gap-6 font-medium">
            <a
              target="_blank"
              className="w-full rounded-lg border border-black/25 bg-white py-4 px-12 transition-all ease-out   hover:border-sky-600 hover:bg-sky-400  hover:text-white"
              href="https://tailwindcss.com/docs">
              TailwindCSS
            </a>
            <a
              target="_blank"
              className="w-full rounded-lg border border-black/25 bg-white py-4 px-12 transition-all ease-out  hover:border-sky-600 hover:bg-sky-400  hover:text-white"
              href="https://nextjs.org/docs">
              NextJS
            </a>
          </div>
        </footer>
      </div>
      <Script src="https://buttons.github.io/buttons.js" />
    </div>
  );
}
