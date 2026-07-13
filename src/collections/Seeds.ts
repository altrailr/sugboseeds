import type { CollectionConfig } from 'payload'

export const Seeds: CollectionConfig = {
  slug: 'seeds',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'scientificName', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── IDENTITY ──────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Plant Title (e.g. Kamote)' },
            { name: 'scientificName', type: 'text', label: 'Scientific Name (italicized)' },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              admin: { description: 'URL-friendly id, e.g. "kamote". Auto-fill later; type manually for now.' },
            },
            {
              name: 'inventoryLabel',
              type: 'text',
              label: 'Inventory Label (e.g. "01 — Inventory Object")',
            },
            { name: 'shortDescription', type: 'textarea', label: 'Hero Description (short paragraph)' },
            { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero Image' },

            // Cebuano / alternative names
            { name: 'cebuanoNames', type: 'text', label: 'Cebuano Names / Tags (comma-separated)' },
            { name: 'alternativeNames', type: 'text', label: 'Alternative Names (comma-separated)' },
            { name: 'plantFamily', type: 'text', label: 'Plant Family' },

            // Tags shown as pill buttons under the hero
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              fields: [{ name: 'label', type: 'text', required: true }],
            },

            // The 3 stat blocks in the hero sidebar
            {
              type: 'row',
              fields: [
                { name: 'growthForm', type: 'text', label: 'Growth Form' },
                { name: 'altitudeRange', type: 'text', label: 'Altitude Range' },
                { name: 'propagationMethod', type: 'text', label: 'Propagation' },
              ],
            },
          ],
        },

        // ── STORY / TEXT CONTENT ────────────────────────
        {
          label: 'Content',
          fields: [
            { name: 'mainBio', type: 'richText', label: 'Main Bio' },
            { name: 'germinationProtocol', type: 'richText', label: 'Germination / Propagation Protocol' },
            { name: 'growingConditions', type: 'richText', label: 'Altitude / Growing Conditions' },
            { name: 'seedIdentification', type: 'richText', label: 'Seed / Planting Material Identification' },
            { name: 'seedSaving', type: 'richText', label: 'Seed Saving / Conservation Practice' },

            {
              name: 'proverbs',
              type: 'array',
              label: 'Proverbs & Expressions',
              fields: [
                { name: 'cebuano', type: 'text', label: 'Cebuano' },
                { name: 'english', type: 'text', label: 'English Translation' },
              ],
            },
            {
              name: 'riddles',
              type: 'array',
              label: 'Riddles (Tigmo)',
              fields: [
                { name: 'cebuano', type: 'text', label: 'Cebuano' },
                { name: 'english', type: 'text', label: 'English Translation' },
              ],
            },
          ],
        },

        // ── RECOGNITION (repeatable, add as many as you want) ──
        {
          label: 'Recognition',
          fields: [
            {
              name: 'recognitionItems',
              type: 'array',
              label: 'Recognition / Physical Characteristics',
              labels: { singular: 'Characteristic', plural: 'Characteristics' },
              fields: [
                { name: 'description', type: 'textarea', required: true, label: 'Description' },
                {
                  name: 'photos',
                  type: 'array',
                  label: 'Related Photos (leave empty for placeholder)',
                  fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
                },
              ],
            },
          ],
        },

        // ── ATTRIBUTES (repeatable, add as many as you want) ──
        {
          label: 'Attributes',
          fields: [
            {
              name: 'attributes',
              type: 'array',
              label: 'Attributes',
              labels: { singular: 'Attribute', plural: 'Attributes' },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Attribute Label' },
                { name: 'description', type: 'textarea', required: true, label: 'Description' },
              ],
            },
          ],
        },

        // ── PHOTOS ───────────────────────────────────────
        {
          label: 'Photos',
          fields: [
            {
              name: 'photoGrid',
              type: 'array',
              label: 'Main Photo Grid (leave empty for placeholders)',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
            },
          ],
        },

        // ── LINKED MATERIALS (empty for now, ready to fill later) ──
        {
          label: 'Linked Materials',
          fields: [
            {
              name: 'linkedMaterials',
              type: 'array',
              label: 'Linked Materials (Articles, Poems, Oral Histories, Recipes, Research)',
              labels: { singular: 'Linked Item', plural: 'Linked Items' },
              // No default rows and nothing required — this stays blank
              // on new entries until you decide to add something.
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: ['Article', 'Poem', 'Oral History', 'Recipe', 'Research'],
                },
                { name: 'itemTitle', type: 'text', label: 'Title' },
                { name: 'author', type: 'text', label: 'Author / Source (required if not written by us)' },
                { name: 'url', type: 'text', label: 'Link URL' },
                { name: 'thumbnail', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },

        // ── REFERENCES ───────────────────────────────────
        {
          label: 'References',
          fields: [
            {
              name: 'references',
              type: 'array',
              label: 'References',
              fields: [
                { name: 'text', type: 'textarea', required: true },
                { name: 'url', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
