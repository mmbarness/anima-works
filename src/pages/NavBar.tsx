import { Link, useLocation } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import '../styles/navbar.scss'
import navbarLinks from "../utils/navbarLinks"

export const NavBar = () => {

    const { currentOrientation } = useAppSelector(state => state.contextSlice)

    const { pathname } = useLocation()

    const underlineMe = (linkPath:string) => {
        if (linkPath === pathname){
            return "underline-me"
        } else {
            return "dont-underline-me"
        }
    }

    return(
        <div id={ currentOrientation === "landscape" ? "navBar-landscape" : "navBar-portrait" }>
            <p><Link to="/" id={underlineMe("/")}>Anima Works</Link></p>
            <div id="navBar-links">
                { navbarLinks(pathname) }
            </div>
        </div>
    )
}