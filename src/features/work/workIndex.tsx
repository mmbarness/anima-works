import '../../styles/work.scss';
import React, { Suspense, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useWorkItemsQuery } from '../../redux/sanityApi';
import { WorkItem } from '../../interfaces/sanityTypes';
const LazyWorkItem  = React.lazy(() => import( './workItem'));

export const Work = () => {

    const [orientation, setOrientation] = useState(window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape');
    
    const { data } = useWorkItemsQuery(); 

    // const renderItems = 

    const renderItems = useCallback(
        () => (
            data ? 
                <div id="video-container">
                    { data.map((video:WorkItem, i:number) => 
                        video.thumbnail ? 
                        <Suspense key={video._id} fallback={<div key={video._id}> </div>}>
                            <LazyWorkItem key={video._id} video={video} orientation={orientation} i={i}/>
                        </Suspense>
                        : null
                    ) }
                </div>
            : <div id="work-index-loading-div">loading...</div>
        ),
        [data, orientation],
    ) 

    return(
        <div id="work-container">
            {renderItems()}
        </div>
    )
}