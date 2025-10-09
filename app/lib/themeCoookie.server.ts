import { createCookie } from "react-router"

export const themeCookie = createCookie("color-scheme", {
  sameSite: "lax",
  path: "/",
  httpOnly: true
})

export async function getTheme(request: Request) {
  const cookieHeader = request.headers.get("Cookie")
  const cookieValue = (await themeCookie.parse(cookieHeader)) as
    | "light"
    | "dark"
    | null
  const themeHeader = request.headers.get("Sec-CH-Prefers-Color-Scheme") as
    | "light"
    | "dark"
    | null

  return cookieValue || themeHeader || "light"
}

export async function toggleTheme(request: Request) {
  const theme = await getTheme(request)
  const newTheme = theme === "light" ? "dark" : "light"
  return newTheme
}

export async function setTheme(theme: "light" | "dark") {
  const cookie = await themeCookie.serialize(theme)
  return cookie
}
