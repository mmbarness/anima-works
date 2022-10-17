import { PortableText } from '@portabletext/react';
import { imageUrlFor, useAboutInfoQuery } from '../../redux/sanityApi';
import '../../styles/about.scss';

export const About = () => {

    const { data } = useAboutInfoQuery()

    const renderPage = () => {
        if (data && data.text) {
            const text = data.text
            let imageUrl
            try {
                imageUrl = imageUrlFor(data.image).url()
            } catch(e) {
                console.log(e);
            }
            return (
                <div id="about-container">
                    <div id="about-img-container">
                        <img src={imageUrl} alt="about-pic" />
                    </div>
                    <div id="about-block">
                        <PortableText
                            value={text}
                        />
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