import React, {useRef, useState} from 'react';
import {BiLogIn} from 'react-icons/bi';
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import axios from "axios";
import '../../stylesheet_auth.css';
import ResetPassword from './ResetPassword';


function Login(){
    
    const usernameRef = useRef();
    const passwordRef = useRef();

    function loginUser(e) {
        e.preventDefault();

        let user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        if (user.username === '' || user.password === '') {
            alert('Unesite sve podatke!');
            return;
        }

        login(user);
        usernameRef.current.value = '';
        passwordRef.current.value = '';
    }

    const [showForgottenPassword, setShowForgottenPassword] = useState(false)

    function login(k) {
        axios.post('http://127.0.0.1:8000/sportista/', {
            username: k.username,
            password: k.password,
        }).then((response) => {
            console.log(response);
    
            if (response.data.error) {
                alert('Neispravni podaci.');
            } else {
                const data = response.data;
                sessionStorage.setItem('id', data.pk);
                sessionStorage.setItem('username', data.user_username);
                sessionStorage.setItem('type', data.user_type);
                sessionStorage.setItem('name', data.user_name);
                sessionStorage.setItem('lastname', data.user_lastname);
                sessionStorage.setItem('status', data.user_status);
                sessionStorage.setItem('image', data.user_photo);
                sessionStorage.setItem('image', data.user_sport);
                window.location.href = "/";
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    
    return(
        <Container fluid className="mb-5 reg-comp">
            <div className="row mt-5">
                <img src="./logo.png" alt="Logo" className="logo-smaller" />
                <div className="col-md-8 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3 registracija">
                            <BiLogIn/> Prijava
                        </h1>
                        <p className="lead mt-4 registracija">Nemate profil?
                            <span> <Link to="/registracija">
                            Registrujte se!
                        </Link></span>
                        </p>
                        <form className='forma'>
                            <div className="form-group">
                                <label htmlFor="username">Korisničko ime</label>
                                <input
                                    type="username"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    placeholder="Unesite korisničko ime"
                                    ref = {usernameRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Šifra</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Upišite šifru"
                                    ref = {passwordRef}
                                />
                            </div>
                            <br></br>
                            <button type="submit" className="register-button submit-form" onClick={loginUser}> 
                                Prijavi se
                            </button>
                        <br></br>
                        </form>
                            <div>
                            {(!showForgottenPassword) && (
                            <div className='forgot'>
                                Zaboravili ste lozinku?{" "}
                                <Link to="#" onClick={() => setShowForgottenPassword(true)}>
                                Ponovo postavi lozinku.
                                </Link>
                            </div>
                            )}
                            {showForgottenPassword && (
                            <ResetPassword onChange={(b) => { if (b === true) setShowForgottenPassword(false) }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    );
    }

export default Login