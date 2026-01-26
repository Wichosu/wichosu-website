import type { CollectionConfig } from 'payload'

export const BlogEntry: CollectionConfig = {
  slug: 'blog-entry',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'metaDescription',
      type: 'text',
      required: false,
    },
    {
      name: 'image',
      type: 'text',
      required: false,
      admin: {
        description:
          'The image to display on the blog entry. If not provided, the logo will be used. Write the full path to the image (R2, S3 bucket, etc).',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'category',
      hasMany: true,
    },
  ],
}
