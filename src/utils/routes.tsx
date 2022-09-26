import { useRoutes } from "react-router-dom";
import { About } from "../features/about/about";
import { Gear } from "../features/gear/gear";
import { Work } from "../features/work/workIndex";
import { Contact } from "../pages/contact";
import { Home } from "../pages/home";

export const routesObj = [
    {
        path: "/",
        pathName: "Work",
        element: <Work />
    },
    { 
        path: "/gear", 
        pathName: "Gear",
        element: <Gear /> 
    },
    { 
        path: "/reel", 
        pathName: "Reel",
        element: <Home /> 
    },
    { 
        path: "/about", 
        pathName: "About",
        element: <About /> 
    },
    { 
        path: "/contact", 
        pathName: "Contact",
        element: <Contact /> 
    }
]

export const Routes = () => useRoutes(routesObj);
