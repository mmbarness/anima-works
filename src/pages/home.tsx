import React, { useState } from 'react'
import ReactPlayer from 'react-player';
import '../styles/home.scss'

export const Home = () => {

    const [orientation, setOrientation] = useState(window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape');
    return(
        <div id="home-container">
            <ReactPlayer
                url="https://vimeo.com/535616157"
                className={orientation === 'landscape' ? "splash-desktop" : "splash-mobile"}
                id="splash-video"
                width="100vw"
                height="auto"
                // light={true}
                controls={true}
                origin={window.location.origin}
            />
        </div>
    )
}