import '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { WorkItem } from '../interfaces/sanityTypes';
const sanityClient = require('@sanity/client')
const today = new Date();
const todaysUTCDate= `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`

const client = sanityClient({
  projectId: 'uvsp04xk',
  dataset: 'production',
  apiVersion: todaysUTCDate,
  useCdn: true,
})
// _createdAt(pin):"2021-12-18T20:20:00Z"
// _id(pin):"0dc666bf-8115-4399-b969-bbf0e3fe4369"
// _rev(pin):"Oysj875UTxs0artuxMcxp5"
// _type(pin):"video"
// _updatedAt(pin):"2021-12-18T20:20:00Z"
// _ref(pin):"791326a1-4654-4b6b-9214-8292da8b9cef"
// _type(pin):"reference"
// director(pin):"Landon Yost"
// directorOfPhotography(pin):"Andrea Gavazzi"
// post(pin):"Matt Schaff"
// production(pin):"ANIMA Works"
// embedCode(pin):"<iframe width="640" height="378" src="https://www.youtube.com/embed/B15q6Uz6inY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"
// link(pin):"https://youtu.be/B15q6Uz6inY"
// source(pin):"youtube"
// titleOfWork(pin):"Arcanum"
// titleToDisplay(pin):"Show Me The Body - Arcanum"
// videoType(pin):"musicVideo"

const fetchSecondary = async ({video, key}: {video:WorkItem, key:"artist"|"nonprofitInstitution"|"company"}) => {
  const secondaryQuery = `*[_type =="video" && _id =="${video._id}"]{${key}->{name}}`
  try{
    const secondaryResult = await client.fetch(secondaryQuery)
    const editedVideo = {...video}
    editedVideo[key] = secondaryResult[0][key]
    return secondaryResult[0][key]['name']; 
  } catch(error){
    console.log(error)
    return error;
  }
}

export const fetchWork = async () => {
  const primaryQuery = `*[_type == "video"]{
    _id, titleOfWork, titleToDisplay, credits, embedCode, link, source, videoType,
  }`
  const secondaryQueries:Array<string> = []
  try {
    const result = await client.fetch(primaryQuery)
    result.forEach((video:WorkItem) => {
      const key:"musicVideo"|"nonprofit"|"commercial"= video.videoType;
      const translator = {
        "musicVideo": "artist",
        "nonprofit": "nonprofitInstitution",
        "commercial": "company"
      }
      const secondaryQuery = `*[_type =="video" && _id =="${video._id}"]{_id, ${translator[key]}->{name}}`
      secondaryQueries.push(secondaryQuery)
    })
    console.log({secondaryQueries})
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
  const query = `*[_type == "gear"]`
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