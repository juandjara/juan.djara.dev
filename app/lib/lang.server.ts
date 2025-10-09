import { createCookie } from "react-router"
import { pick } from "@escapace/accept-language-parser"

export const supportedLanguages = ["es", "en"] as const
export const defaultLanguage = "en"
export type Lang = (typeof supportedLanguages)[number] // use a proper type with options

export const langCookie = createCookie("selected-lang", {
  sameSite: "lax",
  path: "/",
  httpOnly: true
})

function getDefaultLang(request: Request) {
  const header = request.headers.get("Accept-Language")
  if (header) {
    // @ts-expect-error willingly casting `readonly string[]` to `string[]`
    const matches = pick(header, supportedLanguages, { type: "lookup" })
    const lang = matches[0] as Lang
    return lang || defaultLanguage
  }
  return defaultLanguage
}

export async function getLang(request: Request) {
  const header = request.headers.get("Cookie")
  const cookie = (await langCookie.parse(header)) as Lang | null
  if (cookie) {
    return cookie
  }
  return getDefaultLang(request)
}

export async function setLang(lang: Lang | null) {
  const cookie = await langCookie.serialize(lang ?? "")
  return cookie
}
