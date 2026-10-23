import { getPost, getProjects } from "@/lib/content.server"
import Markdown from "@/components/Markdown"
import { useLoaderData } from "react-router"
import { BeachNightBgLight } from "@/components/svg/BeachNightBgLight"
import { BeachNightBgBlue } from "@/components/svg/BeachNightBgBlue"
import { parseLang } from "@/lib/lang"
import type { Route } from "./+types/($lang)._index"
import ProjectCards from "@/components/ProjectCards"
import Canvas from "@/components/Canvas"

export async function loader({ params }: Route.LoaderArgs) {
  const lang = parseLang(params.lang)
  const post = await getPost("index", lang)
  const projects = await getProjects()
  return { lang, post, projects }
}

export default function Index() {
  const { lang, post, projects } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="snap-start grid">
        <div className="grid-layer">
          <Canvas />
        </div>
        <div className="grid-layer">
          <BeachNightBgLight className="h-full w-full dark:hidden" />
          <BeachNightBgBlue className="h-full w-full hidden dark:block" />
        </div>
        <div className="grid-layer">
          <ProjectCards lang={lang} projects={projects} />
        </div>
      </div>
      <main className="above-canvas snap-start prose prose-orange dark:prose-yellow px-4 py-8 prose-xl mx-auto dark:prose-invert">
        <Markdown html={post.html} />
      </main>
    </>
  )
}
