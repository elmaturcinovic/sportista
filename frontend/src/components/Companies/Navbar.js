import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles_companies.css';
import { useHistory, NavLink } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import logo from '../../logo.png';

const Navbar = () => {
    const name = sessionStorage.getItem('name');
    const lastname = sessionStorage.getItem('lastname');
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');

    const field = {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
    };

    const history = useHistory();

    const handleMojiTereniClick = () => {
        history.push('/');
    };

    const handleTerminiClick = () => {
        history.push('/termini');
    };

    const handlePostavkeClick = () => {
        history.push('/postavke');
    };

    const logout = () => {
        sessionStorage.setItem('id', '');
        sessionStorage.setItem('type', '');
        sessionStorage.setItem('username', '');
        console.log(sessionStorage.getItem('id'));
        console.log(sessionStorage.getItem('tip'));
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" id="navbar-logo-image" />
        </a>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
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
                <li className="nav-item">
                    <NavLink
                    exact
                    to="/"
                    className="nav-link"
                    onClick={handleMojiTereniClick}
                    >
                    Moji tereni
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                    to="/termini"
                    className="nav-link"
                    onClick={handleTerminiClick}
                    >
                    Termini
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                    to="/postavke"
                    className="nav-link"
                    onClick={handlePostavkeClick}
                    >
                    Postavke <FiSettings />
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={logout}>
                    Odjavi se <BiLogOut />
                    </a>
                </li>
            </ul>
        </div>
        </nav>
    );
    };

export default Navbar;
