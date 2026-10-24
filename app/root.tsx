import {
  isRouteErrorResponse,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs
} from "react-router"

import appCSS from "./app.css?url"
import type { Route } from "./+types/root"
import { Link } from "react-router"
import Header from "./components/Header"
import type { RootData } from "./lib/types"
import { getPost, getSiteData } from "./lib/content.server"
import Footer from "./components/Footer"
import { parseLang, supportedLanguages } from "./lib/lang"
import useRootData from "./lib/useRootData"

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

export async function loader({ params }: Route.LoaderArgs) {
  const lang = parseLang(params.lang)
  const [siteData, footer1, footer2] = await Promise.all([
    getSiteData(),
    getPost("footer1", lang),
    getPost("footer2", lang)
  ])
  return {
    lang,
    langOptions: supportedLanguages,
    siteData,
    footer1,
    footer2
  } satisfies RootData
}

// `lang` belongs to a child route, so root would otherwise keep stale data
export function shouldRevalidate({
  currentParams,
  nextParams,
  defaultShouldRevalidate
}: ShouldRevalidateFunctionArgs) {
  return currentParams.lang !== nextParams.lang || defaultShouldRevalidate
}

// Runs before first paint so the stored or system theme applies without a flash
const themeScript = `(function () {
  var theme
  try { theme = localStorage.getItem("theme") } catch (e) {}
  var dark = theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches
  if (dark) document.documentElement.classList.add("dark")
})()`

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useRootData()
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
        <Scripts />
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
