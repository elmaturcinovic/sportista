import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from  'react-router-dom';
import Registration from './components/auth/Registration';
import LandingPage from './components/auth/LandingPage';
import ToggleSwitch from './components/ToggleSwitch';
import UserMainPage from "./components/user/UserMainPage";

import './App.css';
import './stylesheet_auth.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserScheduledPage from "./components/user/UserScheduledPage";


function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/registracija" component={Registration} />
            <Route path="/profil" component={UserMainPage} />
            <Route path="/rezervirani-termini" component={UserScheduledPage} />
        </Switch>
      </Router>

      <div className="toggle-container">
        <ToggleSwitch isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
      </div>
    </div> 
  );
}

export default App;
