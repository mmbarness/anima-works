import '../../styles/about.scss';
import { PortableText } from '@portabletext/react';
import { useAboutInfoQuery } from '../../redux/sanityApi';
import { useAppSelector } from '../../redux/hooks';
export const About = () => {

    const { data } = useAboutInfoQuery()
    const { aboutImageUrl } = useAppSelector(state => state.contextSlice)

    return (
        <>
            <div id="about-container">
                <div id="about-img-container">
                    <img src={aboutImageUrl} alt="about-pic" />
                </div>
                <div id="about-block">
                    <PortableText
                        value={data.text}
                    />
                </div>
            </div>
        </>
    )
}
