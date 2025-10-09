import { bundleMDX } from "mdx-bundler"
import { mdxPlugins } from "./mdxPlugins.server"
import { fileExists, safeJoin } from "./files.server"
import path from "path"
import fs from "fs/promises"
import type { ProjectFrontMatter, SiteData } from "./types"

process.env.ESBUILD_BINARY_PATH = path.join(
  process.cwd(),
  "node_modules",
  "esbuild",
  "bin",
  "esbuild"
)

const CONTENT_PATH = path.join(process.cwd(), "content")
const PUBLIC_PATH = path.join(process.cwd(), "public")

export type MDXData<
  F extends {
    [key: string]: any
  } = {}
> = {
  code: string
  frontmatter: F
}

async function renderMDX(fullPath: string) {
  const plugins = await mdxPlugins()
  const cwd = path.dirname(fullPath)
  const mdx = await bundleMDX({
    cwd,
    file: fullPath,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...plugins.remarkPlugins
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...plugins.rehypePlugins
      ]
      return options
    },
    esbuildOptions(options) {
      options.outdir = cwd.replace("/content/", "/public/")
      options.loader = options.loader || {}
      options.loader[".png"] = "file"
      options.loader[".svg"] = "file"
      options.loader[".jpg"] = "file"
      options.publicPath = "/"
      return options
    }
  })

  return { code: mdx.code, frontmatter: mdx.frontmatter }
}

export async function readMDX(filePath: string) {
  const fullPath = safeJoin(CONTENT_PATH, filePath)
  return renderMDX(fullPath)
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
    return renderMDX(fullPath)
  } else if (await fileExists(fallbackPath)) {
    return renderMDX(fallbackPath)
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
          description: post.code,
          ...(post.frontmatter as ProjectFrontMatter)
        }
      })
  )

  return posts.sort((a, b) => {
    return a.order - b.order
  })
}
