import React from 'react';
import {BrowserRouter as Router, Route, useLocation} from 'react-router-dom'
import './App.css';
import { about } from './pages/about';
import { contact } from './pages/contact';
import { gear } from './pages/gear';
import { home } from './pages/home';
import { work } from './pages/work';
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
          <Route exact path ="/" component={home}/>
          <Route path ="/about" component={about}/>
          <Route path ="/contact" component={contact}/>
          <Route path = "/gear" component={gear}/>
          <Route path = "/work" component={work}/>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
