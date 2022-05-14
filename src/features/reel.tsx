import React, { useState } from 'react'
import ReactPlayer from 'react-player';
import '../styles/home.scss'

export const Reel = () => {

    const [orientation, setOrientation] = useState(window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape');
    return(
        <div id="home-container">
            <ReactPlayer
                url="https://vimeo.com/535616157"
                className={orientation === 'landscape' ? "splash-desktop" : "splash-mobile"}
                id="splash-video"
                width="100%"
                height="100%"
                // light={true}
                controls={true}
                origin={window.location.origin}
            />
        </div>
    )
}