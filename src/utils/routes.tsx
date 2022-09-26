import { useRoutes } from "react-router-dom";
import { About } from "../features/about/about";
import { Gear } from "../features/gear/gear";
import { Work } from "../features/work/workIndex";
import { Contact } from "../pages/Contact";
import { Reel } from "../pages/Reel";

export const routesObj = [
    {
        path: "/",
        pathName: "Work",
        element: <Work />
    },
    { 
        path: "/reel", 
        pathName: "Reel",
        element: <Reel /> 
    },
    { 
        path: "/gear", 
        pathName: "Gear",
        element: <Gear /> 
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
