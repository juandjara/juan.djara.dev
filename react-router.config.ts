import type { Config } from "@react-router/dev/config"
import { writeFile } from "fs/promises"
import path from "path"
import { defaultLanguage, supportedLanguages } from "./app/lib/lang"

export default {
  ssr: false,
  prerender: supportedLanguages.map((lang) => `/${lang}`),
  // Netlify picks the language for `/` at the edge, from the first entry of
  // Accept-Language, or from the `nf_lang` cookie set by LangSelect
  async buildEnd({ reactRouterConfig }) {
    const rules = supportedLanguages
      .filter((lang) => lang !== defaultLanguage)
      .map((lang) => `/  /${lang}/  302!  Language=${lang}`)
    rules.push(`/  /${defaultLanguage}/  302!`)
    await writeFile(
      path.join(reactRouterConfig.buildDirectory, "client", "_redirects"),
      rules.join("\n") + "\n"
    )
  }
} satisfies Config
