import '@sanity/client'
const sanityClient = require('@sanity/client')
const today = new Date();
const todaysUTCDate= `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`

const client = sanityClient({
  projectId: 'uvsp04xk',
  dataset: 'production',
  apiVersion: "2021-12-12",
  token:  process.env.REACT_APP_SANITY_TOKEN,// or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

export const fetchVideos = async () => {
  const query = `*[_type == "video"]`
  const result = await client.fetch(query)
  console.log(result)
  return result
}