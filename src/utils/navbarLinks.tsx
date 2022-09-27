import { Link } from "react-router-dom";
import { routesObj } from "./routes";

const underlineMe = (linkPath:string, pathname:string) => {
    if (linkPath === pathname){
        return "underline-me"
    } else {
        return "dont-underline-me"
    }
}

export default function navbarLinks (pathname: string) {
    return routesObj.filter(route => route.path !== "/" && route.renderInNavbar).map((route, index) => {
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
