import { useMatches } from "react-router"
import type { RootData } from "./types"

export default function useRootData() {
  const m = useMatches()
  return (m[0].loaderData as RootData | undefined) ?? {}
}
