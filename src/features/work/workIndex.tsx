import {portfolioInfo} from '../../assets/workLinks'
import '../../styles/work.scss';
import ReactPlayer from 'react-player'

export const work = () => {

    const renderLink = (type: string, videoHash: string) => {
        if (type === "Youtube") {
            return `https://www.youtube.com/embed/${videoHash}`
        } else {
            return `https://player.vimeo.com/video/${videoHash}`
        }
    }

    const renderReactPlayerDesktop = (type: string, videoHash: string) => (
        <ReactPlayer
            url={renderLink(type, videoHash)}
            className="work-video-desktop"
            width="100%"
            height="100%"
            light={type === 'Youtube' ? true : false}
            controls={true}
        />
    )

    const renderReactPlayerMobile = (type: string, videoHash: string) => (
        <ReactPlayer
            url={renderLink(type, videoHash)}
            className="work-video-mobile"
            width="100%"
            height="100%"
            light={type === 'Youtube' ? true : false}
            controls={true}
        />
    )

    const renderLI = (category: string, defined:boolean, data?: string) => {
        const li = <li className={`video-item-text ${category}-li`}>{category}: {data}</li>
        return (defined) ? li : undefined 
    }    

    const renderLinks = (video: any, i:number) =>{ 
        const desktopReactPlayer = renderReactPlayerDesktop(video.linkInfo.type, video.linkInfo.videoHash)
        const mobileReactPlayer = renderReactPlayerMobile(video.linkInfo.type, video.linkInfo.videoHash)
        let title 
        if (video.linkInfo.artist === undefined) {
            title = video.linkInfo.title 
        } else {
            title = video.linkInfo.artist + video.linkInfo.connector + video.linkInfo.title
        }
        let gridId = (i % 2 === 0) ? "left-column video-item" : "right-column video-item"
        let embed =             
            <div className={gridId}>
                {desktopReactPlayer}
                {mobileReactPlayer}
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