import { useRoutes } from "react-router-dom";
import { About } from "../features/about/about";
import { Gear } from "../features/gear/gear";
import { WorkPage } from "../features/work/workPage";
import { Contact } from "../pages/Contact";
import { Reel } from "../pages/Reel";
import { Home } from "../pages/Home";

export const routesObj = [
    {
        path: "/",
        pathName: "home",
        element: <Home />,
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
        pathName: "reel",
        element: <Reel />,
        renderInNavbar: true,
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
