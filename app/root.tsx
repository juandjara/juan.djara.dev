import {
  isRouteErrorResponse,
  Links,
  Outlet,
  ScrollRestoration
} from "react-router"

import appCSS from "./app.css?url"
import type { Route } from "./+types/root"
import { Link } from "react-router"
import Header from "./components/Header"
import { getTheme, setTheme, toggleTheme } from "./lib/themeCoookie.server"
import type { RootData } from "./lib/types"
import { getPost, getSiteData } from "./lib/content.server"
import Footer from "./components/Footer"
import {
  getLang,
  setLang,
  supportedLanguages,
  type Lang
} from "./lib/lang.server"
import useRootData from "./lib/useRootData"
import { redirect } from "react-router"

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://api.fontshare.com" },
  {
    rel: "preconnect",
    href: "https://cdn.fontshare.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap"
  },
  {
    rel: "stylesheet",
    href: "https://api.fontshare.com/v2/css?f[]=gambetta@500&display=swap"
  },
  {
    rel: "stylesheet",
    href: appCSS
  }
]

export async function loader({ request }: Route.LoaderArgs) {
  const [lang, theme, siteData] = await Promise.all([
    getLang(request),
    getTheme(request),
    getSiteData()
  ])
  const footer = await getPost("footer", lang)
  return {
    lang,
    langOptions: supportedLanguages,
    theme,
    siteData,
    footer
  } satisfies RootData
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData()
  const action = form.get("action")
  const pathname = String(form.get("pathname") ?? "/")
  if (action === "theme") {
    const newTheme = await toggleTheme(request)
    return redirect(pathname, {
      headers: {
        "Set-Cookie": await setTheme(newTheme)
      }
    })
  }
  if (action === "lang") {
    const lang = form.get("lang") as Lang | null
    return redirect(pathname, {
      headers: {
        "Set-Cookie": await setLang(lang)
      }
    })
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang, theme } = useRootData()
  return (
    <html lang={lang} className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Juan D. Jara" />
        <meta
          name="description"
          content="Sitio web personal de Juan D. Jara, desarrollador web. Redes, notas y proyectos"
        />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "😞 Sorry, there was an oopsie."
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container pb-4 pt-16 mx-auto prose dark:prose-invert">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="overflow-x-auto p-4 w-full">
          <code>{stack}</code>
        </pre>
      )}
      <Link
        to=".."
        className="text-base inline-block mr-2 px-3 py-2 rounded-sm no-underline bg-sky-200 hover:bg-sky-200/50 transition-colors"
      >
        Go back
      </Link>
    </main>
  )
}
