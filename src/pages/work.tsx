import { render } from '@testing-library/react'
import {portfolioInfo} from '../assets/workLinks'
import '../styles/work.scss'
import { Component, ReactDOM } from 'react'
import ReactPlayer from 'react-player'


export const work = () => {

    const renderLink = (type: string, videoHash: string) => {
        if (type === "Youtube") {
            return `https://www.youtube.com/embed/${videoHash}`
        } else {
            return `https://player.vimeo.com/video/${videoHash}`
        }
    }

    const renderReactPlayer = (type: string, videoHash: string) => (
        <ReactPlayer
            url={renderLink(type, videoHash)}
            className="work-video"
            width="100%"
            height="100%"
            light={true}
            controls={false}
        />
    )

    const renderEmbed = (type: string, videoHash: string) => (
        <iframe 
            width="640" height="360" 
            src={renderLink(type, videoHash)}
            title={(type === "Youtube") ? "YouTube video player" :"vimeo-player"} 
            frameBorder="0" 
            allowFullScreen>
        </iframe>
    )

    const renderLI = (category: string, defined:boolean, data?: string) => {
        const li = <li className={`video-item-text ${category}-li`}>{category}: {data}</li>
        return (defined) ? li : undefined 
    }    

    const renderLinks = (video: any, i:number) =>{ 
        // const embedCode = renderEmbed(video.linkInfo.type, video.linkInfo.videoHash)
        const embedCode = renderReactPlayer(video.linkInfo.type, video.linkInfo.videoHash)
        let title 
        if (video.linkInfo.artist === undefined) {
            title = video.linkInfo.title 
        } else {
            title = video.linkInfo.artist + video.linkInfo.connector + video.linkInfo.title
        }
        let gridId = (i % 2 === 0) ? "left-column video-item" : "right-column video-item"
        let embed =             
            <div className={gridId}>
                {embedCode}
                <ul className="video-item-text-container">
                    <li className="video-item-text Title-li">{title}</li>
                    {renderLI('Production', (video.linkInfo.Production !== undefined), video.linkInfo.Production)}
                    {renderLI('Director', (video.linkInfo.Director !== undefined), video.linkInfo.Director)}
                    {renderLI('Director of Photography', (video.linkInfo['Director of Photography'] !== undefined), video.linkInfo['Director of Photography'])}
                    {renderLI('Post', (video.linkInfo.Post !== undefined), video.linkInfo.Post)}
                </ul>
            </div>
        return (embed)
    }        
    
    let i = 0

    return(
        <div id="work-container">
            <p>VIDEO</p>
            <div id="video-container">
                {portfolioInfo.map(video => (
                    renderLinks(video, i++)
                ))}
            </div>
        </div>
    )
}