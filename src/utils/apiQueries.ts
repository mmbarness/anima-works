const about = () => '?query=*[_type == "aboutPage"]'

const gear = () => '?query=*[_type == "gear"]{_id, name, features}'

const miscellaneous = () => '?query=*[_type == "miscellaneous"]'

const work = () => `?query=*[_type == "video"]|order(orderRank){
    _id,
    titleOfWork,
    titleToDisplay,
    credits,
    embedCode,
    link,
    videoType,
    source,
    thumbnail,
    stills,
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

const reel = () => '?query=*[_type == "reelPage"]'

export const apiQueries = {
    about,
    gear,
    miscellaneous,
    reel,
    work
}