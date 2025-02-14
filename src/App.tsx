import './App.css';
import { NavBar } from './pages/NavBar';
import { Footer } from './pages/Footer';
import './styles/app.scss'
import { imageUrlFor, useAboutInfoQuery, useLazyAboutInfoQuery, useLazyMiscellaneousQuery, useMiscellaneousQuery } from './redux/sanityApi';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import useMediaQuery from './useMediaQuery';
import contextSlice, { InitialState } from './redux/contextSlice';
import { Routes } from './utils/routes';
import { useLocation } from 'react-router-dom';
import { match, P } from 'ts-pattern';
import { Home } from './pages/Home';
import { appContainer } from './styles/inlineStyleObjects';

const App = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const { currentOrientation } = useAppSelector(state => state.contextSlice)
    const { data } = useAboutInfoQuery()
    const { data: miscResult } = useMiscellaneousQuery();

    useEffect(() => {
        if (data) {
            dispatch(contextSlice.actions.setAboutImageUrl(imageUrlFor(data.image).url()))
        }
        if (miscResult) {
            dispatch(contextSlice.actions.setCompanyLogoUrl(imageUrlFor(miscResult.companyLogo).url()))
        }
    }, [data, miscResult, dispatch])

    const newOrientation = useMediaQuery("(orientation: landscape)") ? "landscape" : "portrait";

    const navBarHeight = match(location.pathname)
        .with("/", () => "100vh")
        .with(P._, () => "10vh")
        .run();

    const mainNavStyles = match(location.pathname)
        .with("/", () => ({
            display: "flex",
            justifyContent: "center",
            justifySelf: "center",
            gridArea: "main",
            zIndex: "1",
            width: "90vw",
            backgroundColor: "black",
        }))
        .with(P._, () => ({
            display: "flex",
            justifyContent: "center",
            justifySelf: "center",
            gridArea: "main",
            zIndex: "1",
            width: "90vw",
            // height: "100vh",
            backgroundColor: "black",
        }))
        .run();

    useEffect(() => {
        match(newOrientation)
            .with(currentOrientation, () => null)
            .with(P._, (or: InitialState['currentOrientation']) => dispatch(contextSlice.actions.setOrientation(or)))
            .run()
    }, [currentOrientation, dispatch, newOrientation])

    const renderHome = () => (
        match(location.pathname)
            .with("/", () => (
                <Home />
            ))
            .with(P._, () => null)
            .run()
    )

    return (
        <div className="App" id="app-container" style={
            appContainer.useStyle(currentOrientation)({ navBarHeight })
        }>
            <NavBar />
            {renderHome()}
            <div id="main-navigation" style={mainNavStyles}>
                {Routes()}
            </div>
            {location.pathname !== "/contact" ?
                <Footer />
                : null
            }
        </div>
    );
}

export default App;
