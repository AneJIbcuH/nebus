import { fileURLToPath } from "url";

export default defineNuxtConfig({
  dir: {
    pages: "./src/app/routes",
    layouts: "./src/app/layouts",
    plugins: "./src/app/plugins",
    middleware: "./src/app/middleware",
  },
  alias: {
    "@": "./src",
    "~": "./src",
    "@app": "./src/app",
    "@pages": "./src/pages",
    "@widgets": "./src/widgets",
    "@features": "./src/features",
    "@entities": "./src/entities",
    "@shared": "./src/shared",
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url)),
        "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
        "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
        "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      },
    },
  },
  imports: {
    dirs: [
      "src/shared/composables",
      "src/entities/*/model",
      "src/features/*/model",
    ],
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2026-02-12",
  modules: ["@pinia/nuxt"],
  css: ["@/shared/assets/styles/main.scss"],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
});
