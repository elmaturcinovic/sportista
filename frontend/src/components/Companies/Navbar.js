import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './styles_companies.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BiLogOut } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';


const Navbar = () => {

    const name = sessionStorage.getItem("name")
    const lastname = sessionStorage.getItem("lastname")
    const username = sessionStorage.getItem("username")
    const email = sessionStorage.getItem("email")


    const field = {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
    }

    const history = useHistory();
    const handleMojiTereniClick = () => {
        history.push('/moji-tereni');
    };
    const handleTerminiClick = () => {
        history.push('/termini');
    };
    const handlePostavkeClick = () => {
        history.push('/profile-settings');
    };
    const logout = () => {
        sessionStorage.setItem('id', '');
        sessionStorage.setItem('type', '');
        sessionStorage.setItem('username', '');
        console.log(sessionStorage.getItem('id'))
        console.log(sessionStorage.getItem('tip'))
        window.location.href='/';
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="#">
                <img src={'logo.png'} alt="logo" id="navbar-logo-image"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">
                    
                    <li className="nav-item1">
                        <a className="nav-link username-nav">{field.username}</a>
                    </li>
                </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">

                    <li className="nav-item active">
                        <a className="nav-link" onClick={handleMojiTereniClick}>Moji tereni <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handleTerminiClick}>Termini</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handlePostavkeClick}>Postavke &nbsp;<FiSettings/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout}>Odjavi se &nbsp;<BiLogOut/></a>
                    </li>
                    
                </ul>
            </div>
        </nav>
    )
}

export default Navbar