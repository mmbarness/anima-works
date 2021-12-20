import '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
const sanityClient = require('@sanity/client')
const today = new Date();
const todaysUTCDate= `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`

const client = sanityClient({
  projectId: 'uvsp04xk',
  dataset: 'production',
  apiVersion: todaysUTCDate,
  useCdn: true,
})

export const fetchWork = async () => {
  const primaryQuery = `*[_type == "video"]|order(orderRank){
    _id,
    titleOfWork,
    titleToDisplay,
    credits,
    embedCode,
    link,
    videoType,
    source,
    videoType == 'musicVideo' => {
      artist->{name},
    },
    videoType == 'nonprofit' => {
      nonprofitInstitution->{name},
    },
    videoType == 'commercial' => {
      company->{name},
    }
  }`
  try {
    const result = await client.fetch(primaryQuery)
    return result
  } catch (error) {
    console.log({error})
  }
}

export const fetchAboutInfo = async () => {
  const query = `*[_type == "info"]`
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.log({error})
  }
}

export const fetchGear = async () => {
  const query = `*[_type == "gear"]{_id, name, features}`
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.log({error})
  }
}

export const sanityImager = (sourceImage: any) => {
  const builder = imageUrlBuilder(client)
  return builder.image(sourceImage)
}