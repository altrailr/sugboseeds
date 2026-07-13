import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { SeedImage } from '@/components/seed/PlaceholderImage'
import { RichText } from '@/components/seed/RichText'
import '../../seed-page.css'

export default async function SeedPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'seeds',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const seed = result.docs[0]
  if (!seed) return notFound()

  const cebuanoNames = seed.cebuanoNames || ''
  const alternativeNames = seed.alternativeNames || ''

  return (
    <>
      {/* ═══════════ HEADER ═══════════ */}
      <header className="site-header">
        <div className="site-header__inner">
          <a href="/" className="site-logo" aria-label="Sugbo Seed Archive">
            <img src="/seed-logo.svg" alt="Sugbo Seed Archive" />
          </a>
          <nav className="site-nav">
            <a href="/" className="active">Inventory</a>
            <a href="#">Trees</a>
            <a href="#">Stories</a>
            <a href="#">Research</a>
          </nav>
          <div className="header-right">
            <div className="lang-toggle">
              <a href="#" className="active">EN</a>
              <a href="#">CEB</a>
            </div>
            <button className="btn-search" aria-label="Search">&#x1F50D;</button>
            <a href="#" className="btn-contribute">Contribute</a>
          </div>
        </div>
      </header>

      {/* ═══════════ BACK BAR ═══════════ */}
      <div className="back-bar">
        <div className="back-bar__inner">
          <a href="/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Inventory
          </a>
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="plant-hero">
        <div className="plant-hero__grid">
          <div className="plant-hero__details">
            <div className="plant-hero__main">
              {seed.inventoryLabel && (
                <div className="plant-hero__label">{seed.inventoryLabel} — Inventory Object</div>
              )}
              <h1 className="plant-hero__title">{seed.title}</h1>
              {seed.scientificName && (
                <div className="plant-hero__scientific">{seed.scientificName}</div>
              )}
              {seed.shortDescription && (
                <p className="plant-hero__desc">{seed.shortDescription}</p>
              )}
            </div>
            <div className="plant-hero__sidebar">
              <div className="stat-block" style={{ background: 'var(--black)' }}>
                <div className="stat-block__label">Growth Form</div>
                <div className="stat-block__value--sm">{seed.growthForm || '—'}</div>
              </div>
              <div className="stat-block" style={{ background: 'var(--green-light)' }}>
                <div className="stat-block__label">Altitude Range</div>
                <div className="stat-block__value--sm">{seed.altitudeRange || '—'}</div>
              </div>
              <div className="stat-block" style={{ background: 'var(--brown)' }}>
                <div className="stat-block__label">Propagation</div>
                <div className="stat-block__value--sm">{seed.propagationMethod || '—'}</div>
              </div>
            </div>
          </div>
          <div className="plant-hero__image">
            <SeedImage media={seed.heroImage as any} fallbackLabel="Hero photo placeholder" />
          </div>
        </div>
      </section>

      {/* ═══════════ TAGS ═══════════ */}
      {seed.tags && seed.tags.length > 0 && (
        <div className="plant-tags">
          {seed.tags.map((t: any, i: number) => (
            <span className="tag" key={i}>{t.label}</span>
          ))}
        </div>
      )}

      {/* ═══════════ NAMES ═══════════ */}
      <div className="plant-content">
        <div className="content-block" style={{ marginTop: '2rem' }}>
          <div className="content-block__header">Names &amp; Classification</div>
          <div className="names-grid">
            <div className="names-cell">
              <div className="names-cell__label">Cebuano Names</div>
              <div className="names-cell__value">{cebuanoNames || '—'}</div>
            </div>
            <div className="names-cell">
              <div className="names-cell__label">Alternative Names</div>
              <div className="names-cell__value">{alternativeNames || '—'}</div>
            </div>
            <div className="names-cell">
              <div className="names-cell__label">Scientific Name</div>
              <div className="names-cell__value"><em>{seed.scientificName || '—'}</em></div>
            </div>
            <div className="names-cell">
              <div className="names-cell__label">Plant Family</div>
              <div className="names-cell__value">{seed.plantFamily || '—'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ LINKED MATERIALS (blank until you add some) ═══════════ */}
      <div className="plant-content">
        <div className="linked-block">
          <div className="linked-block__header">Linked Materials</div>
          {seed.linkedMaterials && seed.linkedMaterials.length > 0 ? (
            <div className="linked-block__body">
              {seed.linkedMaterials.map((item: any, i: number) => (
                <div className="linked-item" key={i}>
                  <div className="linked-item__mockup">
                    <SeedImage media={item.thumbnail} fallbackLabel="Cover placeholder" />
                  </div>
                  <div className="linked-item__content">
                    {item.type && <span className="linked-item__type">{item.type}</span>}
                    <span className="linked-item__title">
                      <a href={item.url || '#'}>{item.itemTitle}</a>
                    </span>
                    {item.author && <span className="linked-item__author">{item.author}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-block">No linked materials added yet.</div>
          )}
        </div>
      </div>

      {/* ═══════════ MAIN PHOTOS ═══════════ */}
      <div className="plant-photos">
        <div className="plant-photos__grid">
          {seed.photoGrid && seed.photoGrid.length > 0 ? (
            seed.photoGrid.map((p: any, i: number) => (
              <SeedImage media={p.image} key={i} fallbackLabel="Photo placeholder" />
            ))
          ) : (
            <>
              <SeedImage media={null} fallbackLabel="Photo placeholder" />
              <SeedImage media={null} fallbackLabel="Photo placeholder" />
              <SeedImage media={null} fallbackLabel="Photo placeholder" />
            </>
          )}
        </div>
      </div>

      {/* ═══════════ MAIN BIO ═══════════ */}
      <div className="plant-content">
        <div className="content-block">
          <div className="content-block__header">Main Bio</div>
          <div className="content-block__body">
            <RichText content={seed.mainBio} />
          </div>
        </div>

        {/* ═══════════ TWO COLUMN: GERMINATION + GROWING ═══════════ */}
        <div className="content-two-col">
          <div className="content-block">
            <div className="content-block__header">Germination / Propagation</div>
            <div className="content-block__body">
              <RichText content={seed.germinationProtocol} />
            </div>
          </div>
          <div className="content-block">
            <div className="content-block__header">Altitude / Growing Conditions</div>
            <div className="content-block__body">
              <RichText content={seed.growingConditions} />
            </div>
          </div>
        </div>

        {/* ═══════════ TWO COLUMN: SEED ID + SEED SAVING ═══════════ */}
        <div className="content-two-col">
          <div className="content-block">
            <div className="content-block__header">Seed / Planting Material</div>
            <div className="content-block__body">
              <RichText content={seed.seedIdentification} />
            </div>
          </div>
          <div className="content-block">
            <div className="content-block__header">Seed Saving / Conservation</div>
            <div className="content-block__body">
              <RichText content={seed.seedSaving} />
            </div>
          </div>
        </div>

        {/* ═══════════ PROVERBS & RIDDLES ═══════════ */}
        {((seed.proverbs && seed.proverbs.length > 0) ||
          (seed.riddles && seed.riddles.length > 0)) && (
          <div className="content-two-col">
            {seed.proverbs && seed.proverbs.length > 0 && (
              <div className="content-block">
                <div className="content-block__header">Proverbs &amp; Expressions</div>
                <div className="content-block__body">
                  <ul className="saying-list">
                    {seed.proverbs.map((p: any, i: number) => (
                      <li className="saying-item" key={i}>
                        <div className="saying-item__ceb">{p.cebuano}</div>
                        {p.english && <div className="saying-item__en">{p.english}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {seed.riddles && seed.riddles.length > 0 && (
              <div className="content-block">
                <div className="content-block__header">Riddles (Tigmo)</div>
                <div className="content-block__body">
                  <ul className="saying-list">
                    {seed.riddles.map((r: any, i: number) => (
                      <li className="saying-item" key={i}>
                        <div className="saying-item__ceb">{r.cebuano}</div>
                        {r.english && <div className="saying-item__en">{r.english}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ PHYSICAL CHARACTERISTICS ═══════════ */}
        <div className="content-block">
          <div className="content-block__header">Recognition / Physical Characteristics</div>
          <div className="content-block__body">
            {seed.recognitionItems && seed.recognitionItems.length > 0 ? (
              seed.recognitionItems.map((item: any, i: number) => (
                <div className="char-item" key={i}>
                  <div className="char-item__text">{item.description}</div>
                  <div className="char-item__photos">
                    {item.photos && item.photos.length > 0 ? (
                      item.photos.map((p: any, j: number) => (
                        <SeedImage media={p.image} key={j} fallbackLabel="Photo" />
                      ))
                    ) : (
                      <SeedImage media={null} fallbackLabel="Photo placeholder" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-block">No characteristics added yet.</div>
            )}
          </div>
        </div>

        {/* ═══════════ ATTRIBUTES ═══════════ */}
        <div className="content-block">
          <div className="content-block__header">Attributes</div>
          {seed.attributes && seed.attributes.length > 0 ? (
            <div className="attr-grid">
              {seed.attributes.map((a: any, i: number) => (
                <div className="attr-item" key={i}>
                  <div className="attr-item__label">{a.label}</div>
                  <div className="attr-item__desc">{a.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-block">No attributes added yet.</div>
          )}
        </div>
      </div>

      {/* ═══════════ REFERENCES ═══════════ */}
      {seed.references && seed.references.length > 0 && (
        <div className="references">
          <div className="references__inner">
            <div className="references__title">References</div>
            <ol className="references__list">
              {seed.references.map((ref: any, i: number) => (
                <li key={i} data-ref={`${i + 1}.`}>
                  {ref.text}
                  {ref.url && (
                    <>
                      {' '}
                      <a href={ref.url}>↩</a>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__logo">
            <img src="/seed-logo.svg" alt="Sugbo Seed Archive" />
          </div>
          <div className="site-footer__partners">
            <span>Cebu Seed Savers</span>
            <span>CAFSI</span>
            <span>Slow Food Sugbo</span>
            <span>Native Tree Advocates</span>
          </div>
          <div className="site-footer__text">
            &copy; 2026 Sugbo Seed Archive. University of the Philippines Cebu.
          </div>
        </div>
      </footer>
    </>
  )
}
