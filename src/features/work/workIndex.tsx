import {portfolioInfo} from '../../assets/workLinks'
import '../../styles/work.scss';
import ReactPlayer from 'react-player'
import { fetchWorkAction } from './workSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';

export const Work = () => {

    const dispatch = useAppDispatch();
    const allWork = useAppSelector(state => state.workSlice.work);

    console.log({allWork})

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

    const renderReactPlayer = (video: Video) => ([
        <ReactPlayer
            url={video.link}
            className="work-video-desktop"
            width="100%"
            height="100%"
            light={video.videoType === 'youtube' ? true : false}
            controls={true}
        />,
        <ReactPlayer
            url={video.link}
            className="work-video-mobile"
            width="100%"
            height="100%"
            light={video.videoType === 'youtube' ? true : false}
            controls={true}
        />,
        ]
    )

    const renderLinks2 = (video: Video, i: number) => {
        const [desktopPlayer, mobilePlayer] = renderReactPlayer(video);
        const gridId = (i % 2 === 0) ? "left-column video-item" : "right-column video-item";
        const {credits} = video;
        return (<div className={gridId}>
            {desktopPlayer}
            {mobilePlayer}
            <ul className="video-item-text-container">
                <li className="video-item-text Title-li">{video.titleToDisplay}</li>
                {credits.map((credit) => (
                    <li className={`video-item-text ${credit.title}-li`}>{credit.title}: {credit.Name}</li>
                ))}
            </ul>
        </div>)
    }
    
    const renderWork = () => {
        let work;
        if (allWork) {
            work = allWork.map((video:Video, i:number) => {
                return (
                    <div key={video._id}>
                        {renderLinks2(video, i)}
                    </div>
                )
            })
        }
        return (work ? work : 'loading')
    }

    interface Video {
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

    type credits = {
        Name: string,
        title: string,
        link?: string
    }
    
    // artist: {name: 'Show Me The Body'}
    // credits:
    // director: "Landon Yost"
    // directorOfPhotography: "Andrea Gavazzi"
    // post: "Matt Schaff"
    // production: "ANIMA Works"
    // [[Prototype]]: Object
    // embedCode: "<iframe width=\"640\" height=\"378\" src=\"https://www.youtube.com/embed/B15q6Uz6inY\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    // link: "https://youtu.be/B15q6Uz6inY"
    // source: "youtube"
    // titleOfWork: "Arcanum"
    // titleToDisplay: "Show Me The Body - Arcanum"
    // videoType: "musicVideo"
    // _id: "0dc666bf-8115-4399-b969-bbf0e3fe4369"

    let i = 0
    return(
        <div id="work-container">
            <p>VIDEO</p>
            <div id="video-container">
                {renderWork()}
                {/* {portfolioInfo.map(video => (
                    renderLinks(video, i++)
                ))} */}
            </div>
        </div>
    )
}