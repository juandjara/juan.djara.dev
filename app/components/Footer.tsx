import useRootData from "@/lib/useRootData"
import Social from "./Social"
import Markdown from "./Markdown"

export default function Footer() {
  const { footer1, footer2, siteData } = useRootData()
  return (
    <footer className="max-w-prose mx-auto text-center px-2 py-8 text-slate-500 dark:text-slate-300">
      {siteData ? (
        <div className="flex flex-wrap gap-6 justify-center my-4 text-primary">
          {siteData.socials.map((s) => (
            <Social key={s.link} {...s} />
          ))}
        </div>
      ) : null}
      <div className="above-canvas">
        <div className="flex justify-center gap-4 py-8">
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
        {footer1 ? <Markdown html={footer1.html} /> : null}
        <div className="flex gap-2 flex-wrap items-center justify-center py-8 max-w-prose mx-auto">
          <a href="https://cyrneko.eu">
            <img alt="cyrneko" src="/88x31/cyrneko.png" />
          </a>
          <a href="https://broto.solar">
            <img alt="broto" src="/88x31/broto.webp" />
          </a>
          <a href="https://jbc.lol/">
            <img alt="jbtn" src="/88x31/jbtn.svg" />
          </a>
          <a href="https://wafrn.net">
            <img alt="wafrn" src="/88x31/wafrn.webp" />
          </a>
          <a href="https://starlightnet.work">
            <img alt="starlightnetwork" src="/88x31/starlightnetwork.webp" />
          </a>
          <a href="https://cybernetica.cc">
            <img alt="cybernetica" src="/88x31/cybernetica.png" />
          </a>
          <img alt="firefox" src="/88x31/firefox.png" />
          <img alt="vscodium" src="/88x31/vscodium.gif" />
          <img alt="anythingbutchrome" src="/88x31/anythingbutchrome.gif" />
          <img alt="ublockorigin" src="/88x31/ublockorigin.webp" />
          <img alt="bestviewedcomp" src="/88x31/bestviewedcomp.gif" />
          <iframe
            src="//incr.easrng.net/badge?key=juandjara"
            style={{ background: "url(//incr.easrng.net/bg.gif)" }}
            title="increment badge"
            width="88"
            height="31"
          ></iframe>
        </div>
        {footer2 ? <Markdown html={footer2.html} /> : null}
        <div className="flex justify-center py-4">
          <img alt="" src="/88x31/djara-dev.png" />
        </div>
      </div>
    </footer>
  )
}
