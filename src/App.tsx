import './App.css';
import { About } from './features/about/about';
import { NavBar } from './pages/NavBar';
import { Footer } from './pages/Footer';
import './styles/app.scss'
import { useLazyAboutInfoQuery } from './redux/sanityApi';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import useMediaQuery from './useMediaQuery';
import contextSlice from './contextSlice';
import {Routes} from './utils/routes';

const App = () => {
    
    const [ trigger, lastArg ] = useLazyAboutInfoQuery()

    const dispatch = useAppDispatch(); 

    const { currentOrientation } = useAppSelector(state => state.contextSlice)

    useEffect(() => {
        trigger()
    }, [ About ])

    const newOrientation = useMediaQuery("(orientation: landscape)") ? "landscape" : "portrait";

    useEffect(() => {
        if (newOrientation !== currentOrientation) {
            dispatch(contextSlice.actions.setOrientation(newOrientation));
        }
    }, [newOrientation])

    return (
        <div className="App" id="app-container">
        <NavBar/>
        <div id="main-navigation">
            { Routes() }
        </div>
        <Footer/>
        </div>
    );
}

export default App;
