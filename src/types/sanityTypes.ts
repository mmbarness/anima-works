import { P } from "ts-pattern";
import { credits } from "./assetTypes";
import type {
    PortableTextBlock,
  } from '@portabletext/types'  

export type SanityImage = {
    _type: string;
    asset: {
        _ref: string;
        _type: string;
    }
    alt?: string, 
}

export interface WorkItem {
    _id: string,
    artist?: {name: string},
    nonprofitInstitution?: {name: string},
    company?: {name: string},
    embedCode: string,
    link: string, 
    source: string,
    thumbnail: string | null,
    stills: Array<string> | null,
    titleOfWork: string,
    titleToDisplay: string,
    videoType:"musicVideo"|"nonprofit"|"commercial",
    credits: Array<credits>,
}

export const ImagePattern = {
    "_type": P.string,
    "asset": {
        "_ref": P.string,
        "_type": P.string,
    },
    "alt": P.optional(P.string),
}

export const coreSanityResultPattern = {
    "_createdAt": P.string,
    "_id": P.string,
    "_rev": P.string,
    "_type": P.string,
    "_updatedAt": P.string,
}

export const HomePageMatchPattern = {
    ...coreSanityResultPattern,
    "reelLink": P.string,
}

export const aboutPageMatchPattern = {
    ...coreSanityResultPattern,
    "email": P.string,
    "instagram": P.string,
    "aboutPageImage": ImagePattern,
    "aboutPageText": P.array({
        "_key": P.string,
        "type": P.string,
        "children": P._,
        "markDefs": P._,
        "style": P.string,
    }),
}

export const GearItemPattern = {
    "_id": P.string,
    "name": P.string,
    "features": P.array(P.string)
}

export const MiscellaneousPattern = {
    ...coreSanityResultPattern,
    "companyEmail": P.string,
    "companyInstagram": P.string,
    "companyLogo": ImagePattern,
    "coverPhoto": ImagePattern,
}


export interface AboutInfo extends CoreResponse{
    aboutPageImage: SanityImage,
    aboutPageText: Array<PortableTextBlock>,
    email: string,
    instagram: string,
}

export interface FormattedAboutInfo {
    image: SanityImage,
    text: Array<PortableTextBlock>
}

export interface GearItem extends CoreResponse {
    features: Array<string>,
    name: string,
    slug: {
        current: string
        _type: string,
    },
}

export interface CoreResponse  {
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
}

export type Slug = {
    _type: "slug";
    current: string;
}

export type Query = {
    ms: number;
    query: string;
}

export interface Link {
    _key: string;
    _type: string;
    link: string;
    title: string;
    displayText: string;
}

export interface NaiveWorkItem extends Omit<WorkItem, "thumbnail" | "stills">{
    thumbnail: SanityImage,
    stills: Array<SanityImage>
}

export interface ReelPage {
    reelLink: string,
    reelThumbnail?: SanityImage
}

export interface Miscellaneous {
    coverPhoto: SanityImage,
    companyEmail: string,
    companyInstagram: string,
    companyLogo: SanityImage
}

export interface QueryResponse<ResultType> extends Query {
    result: Array<ResultType>
}