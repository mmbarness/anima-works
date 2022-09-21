import { P } from "ts-pattern";
import { Home } from "../pages/home";
import { credits } from "./assetTypes";

export type SanityImage = {
    _type: "image";
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
    "_createdAt": P.string,
    "_id": P.string,
    "_rev": P.string,
    "_type": P.string,
    "_updatedAt": P.string,
    "email": P.string,
    "instagram": P.string,
    "aboutPageImage": {
        "_type": P.string,
        "asset": {
            "_ref": P.string,
            "_type": P.string,
        }
    },
    "aboutPageText": P.array({
        "_key": P.string,
        "type": P.string,
        "children": P._,
        "markDefs": P._,
        "style": P.string,
    }),
}

export interface AboutInfo extends CoreResponse{
    aboutPageImage: object,
    aboutPageText: Array<BlockContent>,
    email: string,
    instagram: string,
}

export interface FormattedAboutInfo {
    email: string,
    instagram: string,
    images: Array<SanityImage>,
    text: Array<BlockContent>
}

export interface GearItem extends CoreResponse {
    features: Array<string>,
    name: string,
    slug: {
        current: string
        _type: string,
    },
}

export type BlockContent = {
    _key: string;
    _type: string;
    marks? : Array<String>;
    text?: string;
    level?: number,
    listItem?: string,
    markDefs?: Array<String>,
    style?: string,
    type?: string,
    children?: any,
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

interface NaiveWorkItem extends Omit<WorkItem, "thumbnail" | "stills">{
    thumbnail: SanityImage,
    stills: Array<SanityImage>
}

export interface WorkItemQuery extends Query {
    result: Array<NaiveWorkItem>
}

export interface HomePage {
    reelLink: string
}

type HomePageResponse = CoreResponse & HomePage

export interface HomePageQuery extends Query {
    result: Array<HomePageResponse>
}