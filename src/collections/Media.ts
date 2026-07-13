import type { CollectionConfig } from 'payload'

// Every image on a Seed page (hero image, photo grid, recognition photos,
// linked material thumbnails) points to a document in THIS collection.
// For now, uploading nothing is fine — the frontend will fall back to a
// placeholder graphic when heroImage/photos are empty.
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt text (describe the image for accessibility)',
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    // Local disk for now. Swap to the Supabase storage adapter later
    // (see README step 7) without changing this collection at all.
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1400, height: 1000, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
}
