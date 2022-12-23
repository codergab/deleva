import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Menus Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
    }),
  ],
})
