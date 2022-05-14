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
    const [orientation, setOrientation] = useState(window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape');
    
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

    return(
        <div id="work-container">
            <div id="video-container">
                {renderWork()}
            </div>
        </div>
    )
}