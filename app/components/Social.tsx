export type SocialItem = {
  link: string
  label: string
  icon: string
  hidden?: boolean
}

export default function Social({
  link,
  label,
  icon
}: {
  link: string
  label: string
  icon: string
}) {
  return (
    <a
      href={link}
      rel="noreferrer"
      target="_blank"
      className="flex items-center gap-1 no-underline hover:underline"
    >
      <div
        className="w-6 h-6 not-prose inline-block"
        dangerouslySetInnerHTML={{ __html: icon }}
      ></div>
      <span rel="me" className="text-sm">
        {label}
      </span>
    </a>
  )
}
