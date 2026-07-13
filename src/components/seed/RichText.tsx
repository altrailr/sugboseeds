// Minimal renderer for Payload's default Lexical richText field.
// Handles paragraphs + bold/italic/underline text — enough for the
// Main Bio / Germination / Growing Conditions style content blocks.
// If you later add links, lists, etc. in the editor, extend the
// `renderNode` switch below to match.

type LexicalNode = {
  type: string
  text?: string
  format?: number
  children?: LexicalNode[]
}

function renderText(node: LexicalNode, key: number) {
  let el: React.ReactNode = node.text
  const format = node.format || 0
  if (format & 1) el = <strong key={key}>{el}</strong> // bold
  if (format & 2) el = <em key={key}>{el}</em> // italic
  if (format & 4) el = <u key={key}>{el}</u> // underline
  return <span key={key}>{el}</span>
}

function renderNode(node: LexicalNode, key: number): React.ReactNode {
  if (node.type === 'text') return renderText(node, key)
  if (node.type === 'paragraph') {
    return (
      <p key={key}>
        {node.children?.map((child, i) => renderNode(child, i))}
      </p>
    )
  }
  // Fallback: render children if any, otherwise nothing.
  return node.children ? (
    <div key={key}>{node.children.map((child, i) => renderNode(child, i))}</div>
  ) : null
}

export function RichText({ content }: { content: any }) {
  const root: LexicalNode[] | undefined = content?.root?.children
  if (!root || root.length === 0) return null
  return <>{root.map((node, i) => renderNode(node, i))}</>
}
