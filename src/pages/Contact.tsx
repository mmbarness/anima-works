import '../styles/contact.scss'
import { useMiscellaneousQuery } from '../redux/sanityApi';
import { useAppSelector } from '../redux/hooks';
import { IGsvg } from '../features/igSVG';

export const Contact = () => {
    
    const { data, isSuccess } = useMiscellaneousQuery();

    const { currentOrientation } = useAppSelector(state => state.contextSlice)
        
    return( 
        isSuccess ?
            <div id={`contact-${currentOrientation}`}>
                <p id="contact-page-email">{data.companyEmail}</p>
                <IGsvg instagramLink={data.companyInstagram}/>
            </div>
        : <div> </div>
    )

}