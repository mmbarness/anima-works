import { render } from '@testing-library/react'
import {portfolioInfo} from '../assets/workLinks'
import '../styles/work.scss'
import { Component, ReactDOM } from 'react'


export const work = () => {

    const renderLink = (type: string, videoHash: string) => {
        if (type === "Youtube") {
            return `https://www.youtube.com/embed/${videoHash}`
        } else {
            return `https://player.vimeo.com/video/${videoHash}`
        }
    }

    const renderEmbed = (type: string, videoHash: string) => (
        <iframe 
            width="640" height="360" 
            src={renderLink(type, videoHash)}
            title={(type === "Youtube") ? "YouTube video player" :"vimeo-player"} 
            frameBorder="0" 
            allowFullScreen>
        </iframe>
    )
    

    const renderLinks = (video: any, i:number) =>{ 
        const embedCode = renderEmbed(video.linkInfo.type, video.linkInfo.videoHash)
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
                    <li className="video-item-text">{title}</li>
                    <li className="video-item-text">Production: {video.linkInfo.Production}</li>
                    <li className="video-item-text">Director: {video.linkInfo.Director}</li>
                    <li className="video-item-text">Director of Photography: {video.linkInfo['Director of Photography']}</li>
                    <li className="video-item-text">Post: {video.linkInfo.Post}</li>
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