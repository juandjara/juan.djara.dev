import { getPost, getProjects } from "@/lib/content.server"
import MDX from "@/components/MDX"
import { useLoaderData } from "react-router"
import useRootData from "@/lib/useRootData"
import { BeachNightBgLight } from "@/components/svg/BeachNightBgLight"
import { BeachNightBgBlue } from "@/components/svg/BeachNightBgBlue"
import { getLang } from "@/lib/lang.server"
import type { Route } from "./+types/_index"
import ProjectCards from "@/components/ProjectCards"

export async function loader({ request }: Route.LoaderArgs) {
  const lang = await getLang(request)
  const post = await getPost("index", lang)
  const projects = await getProjects()
  return { post, projects }
}

export default function Index() {
  const { theme, lang } = useRootData()
  const { post, projects } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="snap-start grid">
        <div className="grid-layer">
          {theme === "light" ? (
            <BeachNightBgLight className="h-full w-full" />
          ) : (
            <BeachNightBgBlue className="h-full w-full" />
          )}
        </div>
        <div className="grid-layer">
          <ProjectCards lang={lang!} projects={projects} />
        </div>
      </div>
      <main className="snap-start prose prose-orange dark:prose-yellow px-4 py-8 prose-xl mx-auto dark:prose-invert">
        <MDX code={post.code} />
      </main>
    </>
  )
}
