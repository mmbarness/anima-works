import '../../styles/work.scss';
import React, { Suspense, useCallback } from 'react';
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

    const renderWork = useCallback(
        () => (
            allWork ? 
            allWork.map((video:Video, i:number) => 
                <div key={video._id}>
                    <Suspense fallback={<div> </div>}>
                        <WorkItem video={video} orientation={orientation} i={i}/>
                    </Suspense>
                </div>
            )
            : 'loading'
        ),
        [allWork, orientation],
    ) 

    useEffect(() => {
        const adjustOrientation = () => {
            setOrientation(window.screen.orientation.type)
        }
        window.screen.orientation.addEventListener('change', adjustOrientation)
        if (allWork) renderWork();
        return () => {
            window.removeEventListener('resize', adjustOrientation)
        }
    },[allWork, renderWork])

    return(
        <div id="work-container">
            <p>VIDEO</p>
            <div id="video-container">
                {renderWork()}
            </div>
        </div>
    )
}