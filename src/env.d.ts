/// <reference types="vite/client" />

// Extend the ImportMeta interface to include our custom environment variables. Without
// these declarations TypeScript may report that `import.meta.env` does not exist or
// that specific VITE_ variables are missing. See https://vitejs.dev/guide/env-and-mode.html
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_GOOGLE_API_KEY?: string;
  // You can define other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
