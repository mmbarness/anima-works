import {portfolioInfo} from '../../assets/workLinks'
import '../../styles/work.scss';
import ReactPlayer from 'react-player'
import { fetchWorkAction } from './workSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';

// _createdAt(pin):"2021-12-18T20:20:00Z"
// _id(pin):"0dc666bf-8115-4399-b969-bbf0e3fe4369"
// _rev(pin):"Oysj875UTxs0artuxMcxp5"
// _type(pin):"video"
// _updatedAt(pin):"2021-12-18T20:20:00Z"
// _ref(pin):"791326a1-4654-4b6b-9214-8292da8b9cef"
// _type(pin):"reference"
// director(pin):"Landon Yost"
// directorOfPhotography(pin):"Andrea Gavazzi"
// post(pin):"Matt Schaff"
// production(pin):"ANIMA Works"
// embedCode(pin):"<iframe width="640" height="378" src="https://www.youtube.com/embed/B15q6Uz6inY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"
// link(pin):"https://youtu.be/B15q6Uz6inY"
// source(pin):"youtube"
// titleOfWork(pin):"Arcanum"
// titleToDisplay(pin):"Show Me The Body - Arcanum"
// videoType(pin):"musicVideo"

export const Work = () => {

    const dispatch = useAppDispatch();
    const allWork = useAppSelector(state => state.workSlice.work);

    useEffect(() => {
        dispatch(fetchWorkAction());
    },[])

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