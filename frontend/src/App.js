import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from  'react-router-dom';
import Registration from './components/auth/Registration';
import LandingPage from './components/auth/LandingPage';
import CompanyProfile from './components/Companies/CompanyProfile';
import ToggleSwitch from './components/ToggleSwitch';

import './App.css';
import './stylesheet_auth.css'


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
          <Route path="/companyProfile" component={CompanyProfile} />
        </Switch>
      </Router>

      <div className="toggle-container">
        <ToggleSwitch isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
      </div>
    </div> 
  );
}

export default App;
