export const supportedLanguages = ["es", "en"] as const
export const defaultLanguage = "en"
export type Lang = (typeof supportedLanguages)[number]

export function parseLang(param: string | undefined) {
  if (!param) {
    return defaultLanguage
  }
  if ((supportedLanguages as readonly string[]).includes(param)) {
    return param as Lang
  }
  throw new Response("Not found", { status: 404 })
}
