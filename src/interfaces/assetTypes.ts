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

export interface portfolioInfoEle {
    "linkInfo": workLink
}

export interface singlePackage {
    "packageName": string 
    "features": Array<string>
}

export interface allGearType {
    "package": singlePackage
}