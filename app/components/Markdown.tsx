export default function Markdown({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
