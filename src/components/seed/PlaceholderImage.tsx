type MediaDoc = {
  url?: string | null
  alt?: string | null
} | null | undefined

/**
 * Renders a real <img> if `media` has a URL, otherwise shows a dashed
 * placeholder block so the layout looks correct before photos are added.
 */
export function SeedImage({
  media,
  fallbackLabel = 'Photo placeholder',
  className,
}: {
  media: MediaDoc
  fallbackLabel?: string
  className?: string
}) {
  if (media?.url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={media.url} alt={media.alt || ''} className={className} />
  }
  return (
    <div className={`img-placeholder ${className || ''}`}>
      {fallbackLabel}
    </div>
  )
}
