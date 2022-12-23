import SanityClient from '@sanity/client'
import SanityImageBuilder from '@sanity/image-url'

const sanityClient = SanityClient({
  projectId: 'vbt07xhl',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
})

const builder = SanityImageBuilder(sanityClient)
export const urlFor = (source) => builder.image(source)

export default sanityClient
