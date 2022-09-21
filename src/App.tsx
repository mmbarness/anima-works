import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import { About } from './features/about/about';
import { Contact } from './pages/contact';
import { Gear } from './features/gear/gear';
import { Home } from './pages/home';
import { Work } from './features/work/workIndex';
import { NavBar } from './pages/navBar';
import { NavBarPortrait } from './pages/navBarPortrait';
import { Footer } from './pages/footer';
import './styles/app.scss'
import { useLazyAboutInfoQuery } from './redux/sanityApi';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import useMediaQuery from './useMediaQuery';
import contextSlice from './contextSlice';

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
        <Router>
            <NavBarPortrait/>
            <NavBar/>
            <div id="main-navigation">
                <Route exact path ="/" component={Home}/>
                <Route path ="/about" component={About}/>
                <Route path ="/contact" component={Contact}/>
                <Route path = "/gear" component={Gear}/>
                <Route path = "/work" component={Work}/>
            </div>
            <Footer/>
        </Router>
        </div>
    );
}

export default App;
