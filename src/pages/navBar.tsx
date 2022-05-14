import { Link, useLocation } from "react-router-dom"
import '../styles/navbar.scss'

export const NavBar = () => {

    const {pathname} = useLocation()

    const underlineMe = (linkPath:string) => {
        if (linkPath === pathname){
            return "underline-me"
        } else {
            return "dont-underline-me"
        }
    }

    const toAbout = <Link to="/about" id={underlineMe("/about")}>About</Link>
    const toWork = <Link to="/" id={underlineMe("/")}>Work</Link>
    const toGear = <Link to="/gear" id={underlineMe("/gear")}>Gear</Link>
    const toContact = <Link to="/contact"id={underlineMe("/contact")}>Contact</Link>
    const toReel = <Link to="/reel" id={underlineMe("/reel")}>Reel</Link>

    const renderHomeLink = () => {
        if (pathname !== "/") {
            return toWork
        }
    }

    return(
        <div id="navBar-landscape">
            <p><Link to="/" id={underlineMe("/")}>Anima Works</Link></p>
            <div id="navBar-links">
                {toWork}
                {toAbout}
                {toGear}
                {toContact}
                {toReel}
            </div>
        </div>
    )
}