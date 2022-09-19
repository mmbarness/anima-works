import '../../styles/work.scss';
import React, { Suspense, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useWorkItemsQuery } from '../../redux/sanityApi';
import { WorkItem } from '../../interfaces/sanityTypes';
const LazyWorkItem  = React.lazy(() => import( './workItem'));

export const Work = () => {

    const [orientation, setOrientation] = useState(window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape');
    
    const { data } = useWorkItemsQuery(); 

    console.log(data)

    const renderWork = useCallback(
        () => (
            data ? 
            data.map((video:WorkItem, i:number) => 
                video.thumbnail ? 
                <Suspense fallback={<div key={video._id}> </div>}>
                    <LazyWorkItem video={video} orientation={orientation} i={i}/>
                </Suspense>
                : null
            )
            : 'loading'
        ),
        [data, orientation],
    ) 

    return(
        <div id="work-container">
            <div id="video-container">
                {renderWork()}
            </div>
        </div>
    )
}