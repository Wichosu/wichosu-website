import type { CollectionConfig } from 'payload'

import { validateHttpUrl, validateImageSource, validateRating } from '../lib/validation'

export const BookReview: CollectionConfig = {
  slug: 'book-review',
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
      name: 'image',
      type: 'text',
      required: false,
      validate: validateImageSource,
      admin: {
        description:
          'The image to display on the book review. If not provided, the logo will be used. Write the full path to the image (R2, S3 bucket, etc).',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      validate: validateRating,
    },
    {
      name: 'amazonLink',
      type: 'text',
      required: true,
      validate: validateHttpUrl,
    },
  ],
}
