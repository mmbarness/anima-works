import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import { about } from './pages/about';
import { contact } from './pages/contact';
import { gear } from './pages/gear';
import { home } from './pages/home';
import { work } from './pages/work';
import { NavBar } from './pages/navBar';

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Route exact path ="/" component={home}/>
        <Route path ="/about" component={about}/>
        <Route path ="/contact" component={contact}/>
        <Route path = "/gear" component={gear}/>
        <Route path = "/work" component={work}/>
      </Router>
    </div>
  );
}

export default App;
