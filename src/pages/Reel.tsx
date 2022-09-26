import React, { useEffect } from 'react'
import {default as _ReactPlayer} from 'react-player';
import {ReactPlayerProps} from "react-player/types/lib";
import { match } from 'ts-pattern';
import { useAppSelector } from '../redux/hooks';
import { useReelPageQuery } from '../redux/sanityApi';
import '../styles/home.scss'
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

export const Reel = () => {

    const { data, isSuccess, isError } = useReelPageQuery();

    const { currentOrientation } = useAppSelector(state => state.contextSlice)

    useEffect(() => {
        if (isError) {
            console.log("error fetching url")
        }
    },[isError])
    
    return match(isSuccess)
        .with(true, () => (
            <div id="home-container">
                <ReactPlayer
                    url={data.reelLink}
                    className={currentOrientation === 'landscape' ? "splash-desktop" : "splash-mobile"}
                    id="splash-video"
                    width="100%"
                    height="100%"
                    controls={true}
                    origin={window.location.origin}
                />
            </div>
        ))
        .with(false, () => (
            <div> </div>
        ))
        .run()
    
}