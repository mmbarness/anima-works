import { ReactElement } from "react";

export interface workLink{
    "title": string
    "connector"?: string 
    "artist"?: string
    "Production"?: string
    "Director"?: string
    "Director of Photography"?: string 
    "Post"?:string
    "Link": string
    "type": "Youtube" | "Vimeo" 
    "videoHash": string
    "embedCode": ReactElement
}

export interface Video {
    artist?: {name: string},
    nonprofitInstitution?: {name: string},
    company?: {name: string},
    credits: credits[],
    embedCode: string,
    link: string,
    source: string,
    titleOfWork: string,
    titleToDisplay: string,
    videoType: string,
    _id: string
}

export type credits = {
    Name: string,
    title: string,
    link?: string
}

export interface portfolioInfoEle {
    "linkInfo": workLink
}

export interface singlePackage {
    "name": string,
    "_id": string,
    "features": Array<string>
}

export interface allGearType {
    "package": singlePackage
}