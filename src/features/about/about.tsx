import '../../styles/about.scss';
import { PortableText } from '@portabletext/react';
import { imageUrlFor, useAboutInfoQuery } from '../../redux/sanityApi';
import { useAppSelector } from '../../redux/hooks';
import { contextSlice } from '../../redux/contextSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useEffect } from 'react';
export const About = () => {
    const dispatch = useAppDispatch()

    const { data } = useAboutInfoQuery()
    const { aboutImageUrl } = useAppSelector(state => state.contextSlice)

    useEffect(() => {
        if (!aboutImageUrl && data?.image) {
            const url = imageUrlFor(data.image).url()
            if (url) {
                dispatch(contextSlice.actions.setAboutImageUrl(url))
            }
        }
    }, [data, dispatch, aboutImageUrl])

    return (
        <>
            <div id="about-container">
                <div id="about-img-container">
                    {aboutImageUrl ? (
                        <img src={aboutImageUrl} alt="about-pic" />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div id="about-block">
                    {data?.text && (
                        <PortableText value={data.text} />
                    )}
                </div>
            </div>
        </>
    )
}
