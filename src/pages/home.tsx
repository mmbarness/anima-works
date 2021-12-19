import React from 'react'
import '../styles/home.scss'

export const Home = () => {

    return(
        <div id="home-container">
            <iframe src="https://player.vimeo.com/video/535616157?h=362a2d6e73&title=0&byline=0&portrait=0" 
                frameBorder="0" allow="autoplay; fullscreen; picture-in-picture">
            </iframe>
            <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
    )
}