import { match, P } from "ts-pattern"
import { AboutInfo, HomePageMatchPattern, Miscellaneous, MiscellaneousPattern, NaiveWorkItem, QueryResponse, ReelPage } from "../types/sanityTypes"
import { imageUrlFor } from "../redux/sanityApi"
import { WORK_ITEM_STILLS__WIDTH, WORK_ITEM_THUMBNAIL_WIDTH } from "./constants"

const work = (response: QueryResponse<NaiveWorkItem>) => response.result.map(workItem => ({
    ...workItem,
    stills: match(workItem.stills)
        .with(P.array({
            _type: "image",
            asset: {
                _ref: P.string,
                _type: P.string,
            }
        }), images => images.map(unbuiltImage => 
            imageUrlFor(unbuiltImage).width(WORK_ITEM_STILLS__WIDTH).url()
        ))
        .with(P._, () => [])
        .run(),
    thumbnail: workItem.thumbnail ? imageUrlFor(workItem.thumbnail).width(WORK_ITEM_THUMBNAIL_WIDTH).url() : null
}))

const about = (response: QueryResponse<AboutInfo>) => {
    const [text, images] = response.result.map(result => 
        match(result)
            .with({
                "_createdAt": P.string,
                "_id": P.string,
                "_rev": P.string,
                "_type": P.string,
                "_updatedAt": P.string,
                "aboutPageImage": P.select('aboutPageImage'),
                "aboutPageText": P.select('aboutPageText'),
            }, result => [result.aboutPageText, result.aboutPageImage])
            .with(P._, () => [])
            .run()
    ).reduce((acc:any,ele) => ( 
        [...acc[0], ele[0], [...acc[1], ele[1]]]
    ),[[],[]])

    const email = response.result[0].email;
    const instagram = response.result[0].instagram

    return ({
        text,
        images,
        email,
        instagram
    })
}

const miscellaneous = (response: QueryResponse<Miscellaneous>) => (
    match(response.result[0])
        .with((MiscellaneousPattern), response => (response))
        .with(P._, () => ({
            companyEmail: "",
            companyInstagram: "do not render",
            companyLogo: {
                "_type": "",
                "asset": {
                    "_ref": "",
                    "_type": "",
                },
                "alt": "", 
            }
        }))
        .run()
)

const reel = (response: QueryResponse<ReelPage>) => (
    match(response.result[0])
        .with(HomePageMatchPattern, response => ({reelLink: response.reelLink}))
        .with(P._, () => ({reelLink: ""}))
        .run()
)

export const apiResponseTransforms = {
    about,
    miscellaneous,
    reel,
    work,
}