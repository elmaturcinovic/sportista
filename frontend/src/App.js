import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from  'react-router-dom';
import Registration from './components/auth/Registration';
import LandingPage from './components/auth/LandingPage';
import ToggleSwitch from './components/ToggleSwitch';
import UserMainPage from "./components/user/UserMainPage";
import Login from './components/auth/Login';
import './App.css';
import './stylesheet_auth.css'
import UserProfile from './components/user/UserProfile';
import UserScheduledPage from "./components/user/UserScheduledPage";
import UserNotificationsPage from './components/user/UserNotificationsPage';
import CompanyHomepage from './components/Companies/CompanyHomepage';
import FieldDetail from './components/user/FieldDetails.js/FieldDetail';
import UserReservedPage from './components/user/UserReservedPage';
import CompanyFieldDetails from './components/Companies/CompanyFieldDetails';
import Appointments from './components/Companies/Appointments';
import CompanySettings from './components/Companies/CompanySettings';


function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    var id = sessionStorage.getItem('id');
    var tip = sessionStorage.getItem('type');
    console.log(id);
    console.log(tip)
    console.log(sessionStorage);
    
    return (
        <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <Router>
                <Switch>
                    <Route exact path="/prijava">
                        {!id && <Login /> }
                        {id && <Redirect to="/" />}
                    </Route>
                    <Route exact path="/registracija">
                        {!id && <Registration /> }
                        {id && <Redirect to="/" />}
                    </Route>
                    <Route exact path="/">
                        {id && tip==0 && <UserMainPage/> }
                        {id && tip==1 && <CompanyHomepage/> }
                        {!id && <LandingPage/>}
                    </Route>
                    <Route exact path="/profil">
                        {id && tip==0 && <UserProfile/>}
                        {id && tip==1 && <CompanySettings/>}
                        {!id && <Redirect to="/"/>}
                    </Route>

                    <Route exact path="/teren-detalji/:sportHallId">
                        {id && tip==0 && <FieldDetail/>}
                        {id && tip==1 && <CompanyFieldDetails/> }
                        {!id && <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/termini">
                        {id && tip==1 && <Appointments/> }
                        {!id && <Redirect to="/"/>}
                    </Route>

                    <Route path="/rezervirani-termini" component={UserReservedPage}/>
                    <Route path="/moje-obavijesti" component={UserNotificationsPage}/>
                </Switch>
            </Router>

            <div className="toggle-container">
                <ToggleSwitch isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
            </div>
        </div> 
    );

}

export default App;
