import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import remarkEmoji from "remark-emoji"
import remarkImages from "remark-images"
import frontMatter from "front-matter"
import { fileExists, safeJoin } from "./files.server"
import path from "path"
import fs from "fs/promises"
import type { ProjectFrontMatter, SiteData } from "./types"

const CONTENT_PATH = path.join(process.cwd(), "content")
const PUBLIC_PATH = path.join(process.cwd(), "public")

export type MarkdownData<
  F extends {
    [key: string]: any
  } = {}
> = {
  html: string
  frontmatter: F
}

const processor = unified()
  .use(remarkParse)
  .use(remarkEmoji, { accessible: true })
  .use(remarkImages)
  .use(remarkRehype)
  .use(rehypeStringify)

async function renderMarkdown<F extends { [key: string]: any }>(
  fullPath: string
): Promise<MarkdownData<F>> {
  const text = await fs.readFile(fullPath, { encoding: "utf-8" })
  const { attributes, body } = frontMatter<F>(text)
  const html = String(await processor.process(body))
  return { html, frontmatter: attributes }
}

export async function getPost(slug: string, lang?: string, extension = "md") {
  const fullPath = lang
    ? safeJoin(CONTENT_PATH, `${slug}.${lang}.${extension}`)
    : ""
  if (slug.endsWith(`.${extension}`)) {
    slug = slug.replace(`.${extension}`, "")
  }
  const fallbackPath = safeJoin(CONTENT_PATH, `${slug}.${extension}`)
  if (lang && (await fileExists(fullPath))) {
    return renderMarkdown(fullPath)
  } else if (await fileExists(fallbackPath)) {
    return renderMarkdown(fallbackPath)
  } else {
    throw new Response("Markdown file does not exist", { status: 404 })
  }
}

export async function readJSON<T>(filePath: string) {
  const fullPath = safeJoin(CONTENT_PATH, filePath)
  const text = await fs.readFile(fullPath, { encoding: "utf-8" })
  return JSON.parse(text) as T
}

export async function readText(filePath: string) {
  const fullPath = safeJoin(PUBLIC_PATH, filePath)
  const text = await fs.readFile(fullPath, { encoding: "utf-8" })
  return text
}

export async function getSiteData() {
  const data = await readJSON<SiteData>("index.json")
  const icons = await Promise.all(data.socials.map((s) => readText(s.icon)))
  return {
    ...data,
    socials: data.socials
      .map((d, i) => ({ ...d, icon: icons[i] }))
      .filter((s) => !s.hidden)
  }
}

export async function getProjects() {
  const fullPath = safeJoin(CONTENT_PATH, "projects")
  const directory = await fs.readdir(fullPath)

  const posts = await Promise.all(
    directory
      .filter((file) => {
        const extension = path.extname(file)
        return extension === ".md"
      })
      .map(async (file) => {
        const post = await getPost(`projects/${file}`)
        return {
          description: post.html,
          ...(post.frontmatter as ProjectFrontMatter)
        }
      })
  )

  return posts.sort((a, b) => {
    return a.order - b.order
  })
}
