import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
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

const App = () => {

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
