import { type MDXData } from "./content.server"
import type { SocialItem } from "@/components/Social"
import type { Lang } from "./lang.server"

export type SiteData = {
  title: string
  subtitle: string
  socials: SocialItem[]
}

export type RootData = {
  lang?: Lang
  langOptions?: readonly Lang[]
  theme?: "light" | "dark"
  footer?: MDXData
  siteData?: SiteData
}

export type ProjectFrontMatter = {
  link: string
  image: string
  order: number
  backgroundUrl: string
  title: string
}

export type Project = ProjectFrontMatter & {
  description: string
}
