import './App.css';
import { NavBar } from './pages/NavBar';
import { Footer } from './pages/Footer';
import './styles/app.scss'
import { useLazyAboutInfoQuery, useLazyMiscellaneousQuery } from './redux/sanityApi';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import useMediaQuery from './useMediaQuery';
import contextSlice, { InitialState } from './contextSlice';
import {Routes} from './utils/routes';
import { useLocation } from 'react-router-dom';
import { match, P } from 'ts-pattern';

const App = () => {

    const location = useLocation();
    
    const [ triggerAbout ] = useLazyAboutInfoQuery()

    const [ triggerMisc ] = useLazyMiscellaneousQuery() 

    const dispatch = useAppDispatch(); 

    const { currentOrientation } = useAppSelector(state => state.contextSlice)

    useEffect(() => {
        triggerAbout()
        triggerMisc()
    }, [ triggerAbout, triggerMisc ])

    const newOrientation = useMediaQuery("(orientation: landscape)") ? "landscape" : "portrait";

    useEffect(() => {
        match(newOrientation)
            .with(currentOrientation, () => null)
            .with(P._, (or:InitialState['currentOrientation']) => dispatch(contextSlice.actions.setOrientation(or)))
            .run()
    }, [currentOrientation, dispatch, newOrientation])

    return (
        <div className="App" id="app-container">
        <NavBar/>
        <div id="main-navigation">
            { Routes() }
        </div>
        { location.pathname !== "/contact" ? 
            <Footer/>
        : null 
        }
        </div>
    );
}

export default App;
