import React from 'react'
import ReactPlayer from 'react-player';
import '../styles/home.scss'

export const Home = () => {

    return(
        <div id="home-container">
            <ReactPlayer
                url="https://vimeo.com/535616157"
                width="60%"
                height="90%"
                light={true}
                controls={true}
                origin={window.location.origin}
            />
        </div>
    )
}