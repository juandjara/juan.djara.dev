import emojis from "remark-emoji"
import images from "remark-images"

export async function mdxPlugins() {
  return {
    rehypePlugins: [],
    remarkPlugins: [[emojis, { accessible: true }], images]
  }
}
