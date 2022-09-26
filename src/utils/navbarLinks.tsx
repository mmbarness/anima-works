import { Link } from "react-router-dom";

const underlineMe = (linkPath:string, pathname:string) => {
    if (linkPath === pathname){
        return "underline-me"
    } else {
        return "dont-underline-me"
    }
}

export default function (pathname: string) {
    return [
        <Link to="/about" id={underlineMe("/about", pathname)} >About</Link>,
        <Link to="/reel" id={underlineMe("/reel", pathname)}>Reel</Link>,
        <Link to="/gear" id={underlineMe("/gear", pathname)}>Gear</Link>,
        <Link to="/contact"id={underlineMe("/contact", pathname)}>Contact</Link>
    ]
}