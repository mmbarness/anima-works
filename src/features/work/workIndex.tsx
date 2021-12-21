import '../../styles/work.scss';
import ReactPlayer from 'react-player'
import React, { Suspense } from 'react';
import { fetchWorkAction } from './workSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import { Video } from '../../interfaces/assetTypes';
const WorkItem  = React.lazy(() => import( './workItem'));

export const Work = () => {

    const dispatch = useAppDispatch();
    const allWork = useAppSelector(state => state.workSlice.work);
    const [orientation, setOrientation] = useState(window.screen.orientation.type);
    
    useEffect(() => {
        dispatch(fetchWorkAction());
    },[dispatch])

    const renderLinks = (video: Video, i: number) => {
        const gridId = (i % 2 === 0) ? "left-column video-item" : "right-column video-item";
        const {credits} = video;
        const pageOrientation = orientation.split("-").shift();
        console.log(video.source)
        return (<div className={gridId}>
            <ReactPlayer
                url={video.link}
                className={pageOrientation === 'landscape' ? "work-video-desktop" : "work-video-mobile"}
                width="100%"
                height="100%"
                light={video.source === 'youtube' ? true : false}
                controls={true}
                origin={window.location.origin}
            />
            <ul className="video-item-text-container">
                <li className="video-item-text Title-li" key={`title-${video._id}`}>{video.titleToDisplay}</li>
                {credits.map((credit) => (
                    <li key={`${credit.title}-${video._id}`} className={`video-item-text ${credit.title}-li`}>{credit.title}: {credit.Name}</li>
                ))}
            </ul>
        </div>)
    }

    useEffect(() => {
        const adjustOrientation = () => {
            setOrientation(window.screen.orientation.type)
        }
        window.screen.orientation.addEventListener('change', adjustOrientation)
        if (allWork) renderWork();
        return () => {
            window.removeEventListener('resize', adjustOrientation)
        }
    },[])

    const renderWork = () => (
        allWork.map((video:Video, i:number) => 
            <div key={video._id}>
                <Suspense fallback={<div> </div>}>
                    <WorkItem video={video} orientation={orientation} i={i}/>
                </Suspense>
            </div>
        )
    )

    return(
        <div id="work-container">
            <p>VIDEO</p>
            <div id="video-container">
                { (allWork) ? renderWork() : 'loading'}
            </div>
        </div>
    )
}