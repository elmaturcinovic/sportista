import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheet_auth.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const LandingPage = () => {
    const history = useHistory();

    const handleLoginClick = () => {
      history.push('/prijava');
    };
  
    const handleRegisterClick = () => {
      history.push('/registracija');
    };
    return (
      <div className="landing-page">
        <img src="./logo.png" alt="Logo" className="logo" />
        <h3>Brzo i lako rezervišite svoj sportski termin!</h3>
        <div className="buttons">
          <button className="login-button" onClick={handleLoginClick}>Prijava</button>
          <button className="register-button" onClick={handleRegisterClick}>Registracija</button>
        </div>
      </div>
    );
  };
export default LandingPage;