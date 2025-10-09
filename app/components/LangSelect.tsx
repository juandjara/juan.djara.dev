import useRootData from "@/lib/useRootData"
import { useRevalidator } from "react-router"
import { useFetcher } from "react-router"
import { useLocation } from "react-router"
import { useSubmit } from "react-router"
import { Form } from "react-router"
import { Fragment } from "react"
import clsx from "clsx"

export default function LangSelect() {
  const { lang, langOptions } = useRootData()
  const pathname = useLocation().pathname

  if (!langOptions) {
    return null
  }

  return (
    <Form action="/" method="post">
      <input type="hidden" name="pathname" value={pathname} />
      <input type="hidden" name="action" value="lang" />
      {langOptions.map((l, i) => (
        <Fragment key={l}>
          {i > 0 ? <span className="separator"> | </span> : null}
          <button
            value={l}
            name="lang"
            className={clsx(
              "w-10 p-2 rounded-md dark:hover:bg-white/10 hover:bg-black/10 cursor-pointer",
              {
                "opacity-60": lang !== l
              }
            )}
          >
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </Form>
  )
}
