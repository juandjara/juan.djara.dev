import useRootData from "@/lib/useRootData"
import { Link } from "react-router"
import { Fragment } from "react"
import clsx from "clsx"

// Netlify's `Language` redirect for `/` reads this cookie before Accept-Language
function rememberLang(lang: string) {
  document.cookie = `nf_lang=${lang}; path=/; max-age=31536000; samesite=lax`
}

export default function LangSelect() {
  const { lang, langOptions } = useRootData()

  if (!langOptions) {
    return null
  }

  return (
    <nav>
      {langOptions.map((l, i) => (
        <Fragment key={l}>
          {i > 0 ? <span className="separator"> | </span> : null}
          <Link
            to={`/${l}/`}
            hrefLang={l}
            aria-current={lang === l ? "page" : undefined}
            onClick={() => rememberLang(l)}
            className={clsx(
              "inline-block w-10 p-2 text-center rounded-md dark:hover:bg-white/10 hover:bg-black/10",
              {
                "opacity-60": lang !== l
              }
            )}
          >
            {l.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </nav>
  )
}
