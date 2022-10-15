import '../styles/contact.scss'
import { imageUrlFor, useMiscellaneousQuery } from '../redux/sanityApi';
import { match } from 'ts-pattern';
import { Work } from '../features/work/workIndex';
import { useEffect, useState } from 'react';

export const Home = () => {
    
    const { data, isSuccess } = useMiscellaneousQuery();
    const [coverPhotoUrl, setCoverPhotoUrl] = useState("");

    useEffect(() => {
        match(isSuccess)
            .with(true, () => setCoverPhotoUrl(imageUrlFor(data?.coverPhoto).url()))
            .with(false, () => null)
            .run();
    }, [isSuccess, data])

    return (
        <div id="home">
            <div id="home-cover-photo-container">
                <img src={coverPhotoUrl} alt="cover photo" id="home-cover-photo"/>
            </div>
            <Work/>
        </div>
    )

}