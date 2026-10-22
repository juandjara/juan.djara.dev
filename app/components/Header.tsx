import useRootData from "@/lib/useRootData"
import DarkModeToggle from "./DarkModeToggle"
import LangSelect from "./LangSelect"

export default function Header() {
  const { siteData } = useRootData()
  return (
    <header className="flex flex-wrap items-start justify-end gap-2 p-4 md:fixed top-0 right-0 left-0 z-10">
      <img
        src="/images/avatar.jpeg"
        width="72"
        height="72"
        className="rounded-full"
      />
      <div className="self-center ml-2 font-serif">
        <h1 className="text-4xl font-medium opacity-75">{siteData?.title}</h1>
        <p className="text-lg">{siteData?.subtitle}</p>
      </div>
      <div className="flex-grow"></div>
      <LangSelect />
      <DarkModeToggle />
    </header>
  )
}
