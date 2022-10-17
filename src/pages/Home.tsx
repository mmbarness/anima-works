import '../styles/contact.scss'
import { imageUrlFor, useMiscellaneousQuery } from '../redux/sanityApi';
import { match } from 'ts-pattern';
import { Work } from '../features/work/workIndex';
import { useEffect, useState } from 'react';
import downarrow from '../assets/icons8-down-96.png';

export const Home = () => {
    
    const { data, isSuccess } = useMiscellaneousQuery();
    const [coverPhotoUrl, setCoverPhotoUrl] = useState("");

    useEffect(() => {
        match(isSuccess)
            .with(true, () => setCoverPhotoUrl(imageUrlFor(data?.coverPhoto).url()))
            .with(false, () => null)
            .run();
    }, [ isSuccess, data ])

    return (
        <div id="home-container">
            <div id="cover-photo" style={
                { backgroundImage: `url(${coverPhotoUrl})` }
            }>
            </div>
            <div id="cover-photo-text-container">
                <p id="home-title">scroll down for more treats :)</p>
                <div id="arrow-container">
                    <img src={downarrow} alt="down arrow" id="down-arrow" style={ {
                        width: "auto",
                        height: "100%",
                        marginBottom: "-1rem",
                    } }/>
                </div>
            </div>
            {/* <Work/> */}
        </div>
    )

}