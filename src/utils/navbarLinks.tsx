import { Link } from "react-router-dom";
import { routesObj } from "./routes";

const underlineMe = (linkPath:string, pathname:string) => {
    if (linkPath === pathname){
        return "underline-me"
    } else {
        return "dont-underline-me"
    }
}

export default function (pathname: string) {
    return routesObj.filter(route => route.path !== "/").map((route, index) => {
        return (
            <Link 
                key={index} 
                to={route.path} 
                className={underlineMe(route.path, pathname)}
            >
                {route.pathName}
            </Link>
        )
    })
}

export function idk(pathname: string) {
    return [
        <Link to="/about" id={underlineMe("/about", pathname)} >About</Link>,
        <Link to="/reel" id={underlineMe("/reel", pathname)}>Reel</Link>,
        <Link to="/gear" id={underlineMe("/gear", pathname)}>Gear</Link>,
        <Link to="/contact"id={underlineMe("/contact", pathname)}>Contact</Link>
    ]
}