import { type MarkdownData } from "./content.server"
import type { SocialItem } from "@/components/Social"
import type { Lang } from "./lang"

export type SiteData = {
  title: string
  subtitle: string
  socials: SocialItem[]
}

export type RootData = {
  lang?: Lang
  langOptions?: readonly Lang[]
  footer?: MarkdownData
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
