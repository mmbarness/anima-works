import { PortableText } from '@portabletext/react';
import { useAboutInfoQuery } from '../../redux/sanityApi';
import '../../styles/about.scss';
import { sanityImager } from '../../utils/sanityRequests';

export const About = () => {

    const { data } = useAboutInfoQuery()

    const renderPage = () => {
        if (data && data.text) {
            const text = data.text[0]
            let imageUrl
            try {
                imageUrl = sanityImager(data.images[0]).url()
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