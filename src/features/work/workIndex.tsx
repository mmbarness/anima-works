import '../../styles/work.scss';
import React, { Suspense, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useWorkItemsQuery } from '../../redux/sanityApi';
import { WorkItem } from '../../interfaces/sanityTypes';
import { useAppSelector } from '../../redux/hooks';
const LazyWorkItem  = React.lazy(() => import( './workItem'));

export const Work = () => {

    const { currentOrientation } = useAppSelector(state => state.contextSlice)

    const { data } = useWorkItemsQuery(); 

    const renderItems = useCallback(
        () => (
            data ? 
                <div id="video-container">
                    { data.map((video:WorkItem, i:number) => 
                        video.thumbnail ? 
                        <Suspense key={video._id} fallback={<div key={video._id}> </div>}>
                            <LazyWorkItem key={video._id} video={video} orientation={currentOrientation} i={i}/>
                        </Suspense>
                        : null
                    ) }
                </div>
            : <div id="work-index-loading-div">loading...</div>
        ),
        [data, currentOrientation],
    ) 

    return(
        <div id="work-container">
            {renderItems()}
        </div>
    )
}