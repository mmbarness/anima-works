import { IGsvg } from '../features/igSVG';
import { useMiscellaneousQuery } from '../redux/sanityApi';
import '../styles/footer.scss'

export const Footer = () => {

    const { data, isSuccess } = useMiscellaneousQuery();

    return( 
        isSuccess ?
        <div id="footer">
            {data.companyEmail}
            <IGsvg instagramLink={data.companyInstagram}/>
        </div>
        : <div> </div>
    )
}