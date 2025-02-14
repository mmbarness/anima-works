import '../styles/contact.scss'
import { imageUrlFor, useMiscellaneousQuery } from '../redux/sanityApi';
import { match, P } from 'ts-pattern';
import { useEffect, useState, useMemo } from 'react';
import downarrow from '../assets/icons8-down-96.png';
import useScrollPosition from '../utils/useScrollPosition';
import useWindowDimensions from '../utils/useWindowDimensions';
import { useAppSelector } from '../redux/hooks';

export const Home = () => {

    const { data, isSuccess } = useMiscellaneousQuery();
    const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>("");
    const { currentOrientation } = useAppSelector(state => state.contextSlice);

    const windowDimensions = useWindowDimensions();

    const currentScrollPosition = useScrollPosition();

    const displayScrollText = () => useMemo(() =>
        match(windowDimensions.height - currentScrollPosition)
            .when((x: number) => x < 0, () => ({
                display: "none",
            }))
            .otherwise(() => ({ display: "block" }))
        , [windowDimensions.height, currentScrollPosition])

    useEffect(() => {
        const coverPhotoLandscapeUrl = data?.coverPhotoLandscape ? imageUrlFor(data.coverPhotoLandscape).url() : null;
        const coverPhotoPortraitUrl = data?.coverPhotoPortrait ? imageUrlFor(data.coverPhotoPortrait).width(2000).url() : null;
        match(isSuccess)
            .with(true, () => setCoverPhotoUrl(
                currentOrientation === "landscape" ?
                    coverPhotoLandscapeUrl
                    : coverPhotoPortraitUrl)
            )
            .with(false, () => null)
            .run();
    }, [isSuccess, data, currentOrientation])

    return (
        match(currentOrientation)
            .with("landscape", () => (
                (
                    <div id="home-container">
                        <div id="cover-photo" style={{
                            backgroundImage: `url(${coverPhotoUrl})`,
                        }}>
                        </div>
                        <div id="cover-photo-text-container" style={displayScrollText()}>
                            <p id="home-title">scroll down for more treats :)</p>
                            <div id="arrow-container">
                                <img src={downarrow} alt="down arrow" id="down-arrow" style={{
                                    width: "auto",
                                    height: "100%",
                                    marginBottom: "-1rem",
                                }} />
                            </div>
                        </div>
                    </div>
                )
            ))
            .with("portrait", () => (
                (
                    <div id="home-container" style={{
                        backgroundImage: `url(${coverPhotoUrl})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: "no-repeat",
                        width: "100vw",
                    }}>
                        <div id="cover-photo-text-container" style={displayScrollText()}>
                            <p id="home-title">scroll down for more treats :)</p>
                            <div id="arrow-container">
                                <img src={downarrow} alt="down arrow" id="down-arrow" style={{
                                    width: "auto",
                                    height: "100%",
                                    marginBottom: "-1rem",
                                }} />
                            </div>
                        </div>
                    </div>
                )
            ))
            .run()
    )

}
