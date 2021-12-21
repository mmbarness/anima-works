import React, { useEffect } from 'react'
import ReactPlayer from 'react-player';
import { fetchInfo } from '../features/about/aboutSlice';
import { useAppDispatch } from '../redux/hooks';
import '../styles/home.scss'

export const Home = () => {

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchInfo());
    }, [dispatch]);

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