export function App() {
  return (
    <header className="py-16 mt-14">
      <h1 className="text-5xl font-bold text-center mb-2">
        Create Tailwind App
      </h1>
      <p className="text-center mb-6 text-xl">
        Please support this project by starring the repository on GitHub.
      </p>
      <div className="flex flex-row justify-center items-center gap-4">
        <a
          className="github-button"
          href="https://github.com/andrejjurkin/create-tailwind-app"
          data-color-scheme="no-preference: dark; light: dark; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star andrejjurkin/create-tailwind-app on GitHub"
        >
          Star
        </a>
        <a
          className="github-button"
          href="https://github.com/andrejjurkin/create-tailwind-app/discussions"
          data-color-scheme="no-preference: dark; light: dark; dark: dark;"
          data-icon="octicon-comment-discussion"
          data-size="large"
          aria-label="Discuss andrejjurkin/create-tailwind-app on GitHub"
        >
          Discuss
        </a>
      </div>
    </header>
  );
}