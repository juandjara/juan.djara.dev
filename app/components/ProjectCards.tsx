import type { Lang } from "@/lib/lang.server"
import type { Project } from "@/lib/types"

const translations = {
  es: {
    More: "Y más"
  },
  en: {
    More: "And more"
  }
}

export default function ProjectCards({
  projects,
  lang
}: {
  projects: Project[]
  lang: Lang
}) {
  const cards = projects.slice(0, 3)
  return (
    <div className="pt-32 sm:flex flex-wrap justify-center gap-6 items-center h-full">
      {cards.map((p) => (
        <div key={p.link} className="relative pb-6 sm:pb-0">
          <div className="mx-auto rounded-xl w-[300px] h-[300px] border border-primary dark:border-primary-dark shadow-primary dark:shadow-primary-dark shadow-md hover:shadow-lg transition-all transform hover:-translate-y-4 ease-in-out duration-300">
            <a href={p.link} className="absolute inset-0 opacity-0">
              <span className="sr-only">{p.title}</span>
            </a>
            <img
              src={p.backgroundUrl}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <p className="text-center sm:text-left text-lg py-2 text-slate-600 dark:text-slate-300">
            {p.title}
          </p>
        </div>
      ))}
      <div>
        <p className="text-center">
          <a
            className="text-primary hover:underline"
            href="https://github.com/juandjara?tab=repositories"
          >
            ... {translations[lang ?? "en"]["More"]}
          </a>
        </p>
      </div>
    </div>
  )
}
