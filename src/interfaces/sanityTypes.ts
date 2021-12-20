export interface allWork{
    
}

// _id(pin):"0dc666bf-8115-4399-b969-bbf0e3fe4369"
// name(pin):"Show Me The Body"
// embedCode(pin):"<iframe width="640" height="378" src="https://www.youtube.com/embed/B15q6Uz6inY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"
// link(pin):"https://youtu.be/B15q6Uz6inY"
// source(pin):"youtube"
// titleOfWork(pin):"Arcanum"
// titleToDisplay(pin):"Show Me The Body - Arcanum"
// videoType(pin):"musicVideo"

export interface WorkItem{
    _id: string,
    artist?: {name: string},
    nonprofitInstitution?: {name: string},
    company?: {name: string},
    embedCode: string,
    link: string, 
    source: string,
    titleOfWork: string,
    titleToDisplay: string,
    videoType:"musicVideo"|"nonprofit"|"commercial",
    credits: Array<object>,
}
// artist: {_ref: '791326a1-4654-4b6b-9214-8292da8b9cef', _type: 'reference'}
// credits: {director: 'Landon Yost', directorOfPhotography: 'Andrea Gavazzi', post: 'Matt Schaff', production: 'ANIMA Works'}
// embedCode: "<iframe width=\"640\" height=\"378\" src=\"https://www.youtube.com/embed/B15q6Uz6inY\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
// link: "https://youtu.be/B15q6Uz6inY"
// slug: {_type: 'slug', current: 'arcanum'}
// source: "youtube"
// titleOfWork: "Arcanum"
// titleToDisplay: "Show Me The Body - Arcanum"
// videoType: "musicVideo"
// _createdAt: "2021-12-18T20:20:00Z" 
// _id: "0dc666bf-8115-4399-b969-bbf0e3fe4369"
// _rev: "Oysj875UTxs0artuxMcxp5" 
// _type: "video"
// _updatedAt: "2021-12-18T20:20:00Z"

export interface AboutInfo{
    aboutPageImage: object,
    aboutPageText: [],
    email: string,
    instagram: string,
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: "info",
    _updatedAt: string
}

// aboutPageImage: {_type: 'image', asset: {…}}
// aboutPageText: [{…}]
// email: "shootwithanima@gmail.com"
// instagram: "https://www.instagram.com/animaworks.nyc/"
// _createdAt: "2021-12-18T22:07:25Z"
// _id: "263f3d85-f53c-474f-9bf0-24ba733de604"
// _rev: "5HHceZ3LuAltt4AEK1c5qg"
// _type: "info"
// _updatedAt: "2021-12-18T22:07:25Z"

export interface GearItem {
    features: Array<string>,
    name: string,
    slug: {
        current: string
        _type: string,
    },
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string
}

// features: (3) ['Flawless reflex body', 'Standard 16mm 4:3 gate', 'C-mount Switar lenses: 10mm, 25mm, 75mm, bolex zoom']
// name: "Bolex Rex 5 Package"
// slug:
    // current: "bolex-rex-5-package"
    // _type: "slug"
// _createdAt: "2021-12-18T21:46:22Z"
// _id: "1774ad86-2ad6-4fb6-ae85-cc05bc931920"
// _rev: "5HHceZ3LuAltt4AEK1Z5DF"
// _type: "gear"
// _updatedAt: "2021-12-18T21:46:22Z"