import { useRoutes } from "react-router-dom";
import { About } from "../features/about/about";
import { Gear } from "../features/gear/gear";
import { Work } from "../features/work/workIndex";
import { Contact } from "../pages/contact";
import { Home } from "../pages/home";

export const Routes = () => useRoutes([
    {
        path: "/",
        element: <Work />
    },
    { 
        path: "/about", 
        element: <About /> 
    },
    { 
        path: "/contact", 
        element: <Contact /> 
    },
    { 
        path: "/gear", 
        element: <Gear /> 
    },
    { 
        path: "/reel", 
        element: <Home /> 
    },
])
