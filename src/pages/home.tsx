import React from 'react'
import '../styles/home.scss'

export const home = () => {

    //style="position:absolute;top:0;left:0;width:100%;height:100%;"

    return(
        <div id="home-container">
            <iframe src="https://player.vimeo.com/video/535616157?h=362a2d6e73&title=0&byline=0&portrait=0" 
                frameBorder="0" allow="autoplay; fullscreen; picture-in-picture">
            </iframe>
            <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
    )
}