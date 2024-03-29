import { match, P } from "ts-pattern"
import { AboutInfo, HomePageMatchPattern, Miscellaneous, MiscellaneousPattern, NaiveWorkItem, QueryResponse, ReelPage, SanityImage } from "../types/sanityTypes"
import { imageUrlFor } from "../redux/sanityApi"
import { WORK_ITEM_STILLS__WIDTH, WORK_ITEM_THUMBNAIL_WIDTH } from "./constants"
import { PortableTextBlock } from "@portabletext/types"

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

const about = (response: QueryResponse<AboutInfo>) => (
    match(response.result[0])
        .with({
            "_createdAt": P.string,
            "_id": P.string,
            "_rev": P.string,
            "_type": P.string,
            "_updatedAt": P.string,
            "aboutPageImage": P.select('aboutPageImage'),
            "aboutPageText": P.select('aboutPageText'),
        }, (result) => ({
            text: result.aboutPageText,
            image: result.aboutPageImage,
        }))
        .with(P._, () => ({text: [] as PortableTextBlock[], image: {} as SanityImage}))
        .run()
)

const miscellaneous = (response: QueryResponse<Miscellaneous>) =>( 
    match(response.result[0])
        .with((MiscellaneousPattern), response => ({
            ...response,
            coverPhoto: response.coverPhoto
        }))
        .with(P._, () => ({
            companyEmail: "",
            companyInstagram: "do not render",
            companyLogo: {} as SanityImage,
            coverPhoto: {} as SanityImage,
            coverPhotoPortrait: {} as SanityImage,
            coverPhotoLandscape: {} as SanityImage,
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