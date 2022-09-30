import { useRoutes } from "react-router-dom";
import { About } from "../features/about/about";
import { Gear } from "../features/gear/gear";
import { Work } from "../features/work/workIndex";
import { WorkPage } from "../features/work/workPage";
import { Contact } from "../pages/Contact";
import { Reel } from "../pages/Reel";

export const routesObj = [
    {
        path: "/",
        pathName: "Work",
        element: <Work />,
        renderInNavbar: true,
    },
    {
        path: "/work/:id",
        pathName: "/work/:id",
        element: <WorkPage/>,
        renderInNavbar: false,
    },
    { 
        path: "/reel", 
        pathName: "Reel",
        element: <Reel />,
        renderInNavbar: true,
    },
    { 
        path: "/gear", 
        pathName: "Gear",
        element: <Gear />,
        renderInNavbar: true,
    },
    { 
        path: "/about", 
        pathName: "About",
        element: <About />,
        renderInNavbar: true,
    },
    { 
        path: "/contact", 
        pathName: "Contact",
        element: <Contact />,
        renderInNavbar: true,
    }
]

export const Routes = () => useRoutes(routesObj);
