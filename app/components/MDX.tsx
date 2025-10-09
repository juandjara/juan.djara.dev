import { getMDXComponent } from "mdx-bundler/client"
import { useMemo } from "react"

export default function MDX({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  return <Component />
}
