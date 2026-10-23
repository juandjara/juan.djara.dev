import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Connect, type Plugin } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { defaultLanguage, supportedLanguages } from "./app/lib/lang"

// local version of the `/` redirect Netlify applies at the edge
function langRedirect(): Plugin {
  const redirect: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url?.split("?")[0] !== "/") {
      return next()
    }
    const cookie = /(?:^|;\s*)nf_lang=([^;]+)/.exec(req.headers.cookie ?? "")
    const preferred =
      cookie?.[1] ?? req.headers["accept-language"]?.split(",")[0]
    const primary = preferred?.split(";")[0].trim().split("-")[0].toLowerCase()
    const lang =
      supportedLanguages.find((l) => l === primary) ?? defaultLanguage
    res.writeHead(302, { Location: `/${lang}/` }).end()
  }
  return {
    name: "lang-redirect",
    configureServer(server) {
      server.middlewares.use(redirect)
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect)
    }
  }
}

export default defineConfig({
  plugins: [tailwindcss(), langRedirect(), reactRouter(), tsconfigPaths()]
})
