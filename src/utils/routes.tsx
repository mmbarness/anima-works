import { useRoutes } from "react-router-dom";
import { About } from "../features/about/about";
import { Gear } from "../features/gear/gear";
import { WorkPage } from "../features/work/workPage";
import { Contact } from "../pages/Contact";
import { Reel } from "../pages/Reel";
import { Work } from "../features/work/workIndex";

export const routesObj = [
    {
        path: "/",
        pathName: "work",
        element: <Work />,
        renderInNavbar: false,
    },
    {
        path: "/work/:id",
        pathName: "/work/:id",
        element: <WorkPage/>,
        renderInNavbar: false,
    },
    { 
        path: "/reel", 
        pathName: "reel",
        element: <Reel />,
        renderInNavbar: false,
    },
    { 
        path: "/gear", 
        pathName: "gear",
        element: <Gear />,
        renderInNavbar: true,
    },
    { 
        path: "/about", 
        pathName: "about",
        element: <About />,
        renderInNavbar: true,
    },
    { 
        path: "/contact", 
        pathName: "contact",
        element: <Contact />,
        renderInNavbar: true,
    }
]

export const Routes = () => useRoutes(routesObj);
