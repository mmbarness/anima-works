import '../../styles/work.scss';
import ReactPlayer from 'react-player/lazy'
import { fetchWorkAction } from './workSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';

export const Work = () => {

    const dispatch = useAppDispatch();
    const allWork = useAppSelector(state => state.workSlice.work);
    
    useEffect(() => {
        dispatch(fetchWorkAction());
    },[dispatch])

    const renderReactPlayer = (video: Video) => ([
        <ReactPlayer
            url={video.link}
            className="work-video-desktop"
            width="100%"
            height="100%"
            light={video.videoType === 'youtube' ? true : false}
            controls={true}
            origin={window.location.origin}
        />,
        <ReactPlayer
            url={video.link}
            className="work-video-mobile"
            width="100%"
            height="100%"
            light={video.videoType === 'youtube' ? true : false}
            controls={true}
            origin={window.location.origin}
        />,
        ]
    )

    const renderLinks = (video: Video, i: number) => {
        const [desktopPlayer, mobilePlayer] = renderReactPlayer(video);
        const gridId = (i % 2 === 0) ? "left-column video-item" : "right-column video-item";
        const {credits} = video;
        return (<div className={gridId}>
            {desktopPlayer}
            {mobilePlayer}
            <ul className="video-item-text-container">
                <li className="video-item-text Title-li" key={`title-${video._id}`}>{video.titleToDisplay}</li>
                {credits.map((credit) => (
                    <li key={`${credit.title}-${video._id}`} className={`video-item-text ${credit.title}-li`}>{credit.title}: {credit.Name}</li>
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
                        {renderLinks(video, i)}
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

    return(
        <div id="work-container">
            <p>VIDEO</p>
            <div id="video-container">
                {renderWork()}
            </div>
        </div>
    )
}