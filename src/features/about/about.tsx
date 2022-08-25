import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import '../../styles/about.scss';
import { sanityImager } from '../../utils/sanityRequests';
import { fetchInfo } from './aboutSlice';

export const About = () => {

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchInfo());
    }, [dispatch]);

    const {aboutSlice} = useAppSelector(state => state);

    const renderPage = () => {
        if (aboutSlice.LOADED) {
            const text = aboutSlice.info.aboutPageText[0].children[0].text
            const imageUrl = sanityImager(aboutSlice.info.aboutPageImage).url()
            return (
                <div id="about-container">
                    <div id="about-img-container">
                        <img src={imageUrl} alt="about-pic" />
                    </div>
                    <div id="about-block">
                        {text}
                    </div>
                </div>
            )
        } else {
            return 'Loading...'
        }
    }

    return(
        <>
            {renderPage()}
        </>
    )
}