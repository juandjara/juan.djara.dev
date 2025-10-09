import useRootData from "@/lib/useRootData"
import Social from "./Social"
import MDX from "./MDX"

export default function Footer() {
  const { footer, siteData } = useRootData()
  return (
    <footer className="text-center px-2 py-8 text-slate-500 dark:text-slate-300">
      {siteData ? (
        <div className="flex flex-wrap gap-7 justify-center my-4 mx-auto text-primary">
          {siteData.socials.map((s) => (
            <Social key={s.link} {...s} />
          ))}
        </div>
      ) : null}
      <div className="flex justify-center gap-4 py-4">
        <a
          className="text-primary hover:underline"
          href="https://wafring.jbc.lol/prev/javascript@app.wafrn.net/"
        >
          ← prev |
        </a>
        <a className="" href="https://wafring.jbc.lol/rand/">
          Wafrn Webring
        </a>
        <a
          className="text-primary hover:underline"
          href="https://wafring.jbc.lol/next/javascript@app.wafrn.net/"
        >
          | next →
        </a>
      </div>
      {footer ? <MDX code={footer.code} /> : null}
    </footer>
  )
}
