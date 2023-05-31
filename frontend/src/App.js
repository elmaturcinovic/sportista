import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from  'react-router-dom';
import Registration from './components/auth/Registration';
import LandingPage from './components/auth/LandingPage';
import CompanyProfile from './components/Companies/CompanyProfile';
import EventsCalendar from './components/Companies/EventsCalendar/EventsCalendar';
import ToggleSwitch from './components/ToggleSwitch';
import Login from './components/auth/Login';


import './App.css';
import './stylesheet_auth.css'



function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

<<<<<<< HEAD
  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/registracija" component={Registration} />
          <Route path="/calendar" component={EventsCalendar} />
        </Switch>
      </Router>
=======
    var id = sessionStorage.getItem('id');
>>>>>>> 39aa5bb4a45746bb0ab198f141de1fa2808d6e40

    return (
        <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <Router>
                <Switch>
                    <Route path="/prijava">
                        {!id && <Login /> }
                        {id && <Redirect to="/" />}
                    </Route>
                    <Route path="/registracija">
                        {!id && <Registration /> }
                        {id && <Redirect to="/" />}
                    </Route>
                    <Route path="/">
                        {id && <CompanyProfile/> }
                        {!id && <LandingPage/>}
                    </Route>
                </Switch>
            </Router>

            <div className="toggle-container">
                <ToggleSwitch isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
            </div>
        </div> 
    );
}

export default App;
