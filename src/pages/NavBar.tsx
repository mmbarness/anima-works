import { Link, useLocation } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { imageUrlFor, useMiscellaneousQuery } from "../redux/sanityApi"
import '../styles/navbar.scss'
import navbarLinks from "../utils/navbarLinks"

export const NavBar = () => {

    const { currentOrientation } = useAppSelector(state => state.contextSlice)

    const { pathname } = useLocation()

    const { data, isSuccess } = useMiscellaneousQuery();

    const imageUrl = isSuccess ? imageUrlFor(data.companyLogo).width(1000).url() : ""

    const underlineMe = (linkPath:string) => {
        if (linkPath === pathname){
            return "underline-me"
        } else {
            return "dont-underline-me"
        }
    }

    return(
        <div id={ currentOrientation === "landscape" ? "navBar-landscape" : "navBar-portrait" }>
            <div id="logo-container">
                <Link to="/" id={underlineMe("/")} style={{ height: "inherit" }}>
                    <img style={ {"height": "inherit" }} src={imageUrl} alt="company logo" id="company-logo"/>
                </Link>
            </div>
            <div id="navBar-links">
                { navbarLinks(pathname) }
            </div>
        </div>
    )
}
