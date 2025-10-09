import { useMatches } from "react-router"
import type { RootData } from "./types"
import { useActionData } from "react-router"

export default function useRootData() {
  const m = useMatches()
  const actionData = useActionData<Pick<RootData, "lang" | "theme">>()
  const data = m[0].loaderData as RootData

  if (!data) {
    return {}
  }

  if (!actionData) {
    return data
  }

  return {
    ...data,
    theme: actionData.theme ?? data.theme,
    lang: actionData.lang ?? data.lang
  }
}
