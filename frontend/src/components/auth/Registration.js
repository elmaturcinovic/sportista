import React, {useRef} from 'react';
import {IoIosPersonAdd} from 'react-icons/io';
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import axios from "axios";
import '../../stylesheet_auth.css';

function Registration(){

    const nameRef = useRef();
    const lastNameRef = useRef();
    const userTypeRef0 = useRef();
    const userTypeRef1 = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    

    function registerUser(e) {
        //Spriječi defaultno ponašanje tj. refresh stranice
        e.preventDefault();
        const selectedUserType = userTypeRef1.current.checked ? '1' : '0';
        console.log('Selected user type:', selectedUserType);

        let user = {
            name: nameRef.current.value,
            lastName: lastNameRef.current.value,
            userType: selectedUserType,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConfirm: passwordConfirmationRef.current.value
        }
        console.log(user)

        if (user.name === '' || user.password === '' || user.lastName === '' ||
            user.email ===  '' || user.passwordConfirm === '' || user.username === '' || user.userType === '') {
            alert('Unesite sve podatke!');
            return;
        } else if (user.password !== user.passwordConfirm) {
            alert('Šifre se ne podudaraju!');
            return;
        }

        registration(user);

        nameRef.current.value = '';
        lastNameRef.current.value = '';
        usernameRef.current.value = '';
        userTypeRef0.current.value = '';
        userTypeRef1.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        passwordConfirmationRef.current.value = '';
    }

    function registration(k) {
        axios.post('http://127.0.0.1:8000/sportista/register',{
            name: k.name,
            lastName: k.lastName,
            userType: k.userType,
            username: k.username,
            email: k.email,
            password: k.password,
            passwordConfirm: k.passwordConfirm
        }).then((response)=>{
            console.log(response);
            if (response.data === -1)
                alert("Korisnik je već registrovan.");
            else
                window.location.href="/prijava";

            }, (error) => {
                console.log(error);
            }
        );
    }

    return(
        <Container fluid className="reg-comp">
            <div className="row mt-5">
                <div className='logo-wrapper'> <img src="./logo.png" alt="Logo" className="logo-smaller" /></div>
                <div className="col-md-8 m-auto">
                <br/>
                    <div>
                        <h2 className="text-center mb-3 registracija">
                            <IoIosPersonAdd/> Registracija
                        </h2>
                        <p className="lead mt-4 registracija">Već imate profil?
                            <span> <Link to="/prijava">
                             Prijavite se!
                        </Link></span>
                        </p>
                        <form className='forma'>
                            <div className="form-group">
                                <label htmlFor="name">Ime</label>
                                <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    placeholder="Unesite ime"
                                    ref = {nameRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lname">Prezime</label>
                                <input
                                    type="lname"
                                    id="lname"
                                    name="lname"
                                    className="form-control"
                                    placeholder="Unesite prezime"
                                    ref = {lastNameRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="usertype" className='radio-label1'>Tip korisnika</label>
                                <div className="radio-group">
                                    <label className='radio-label'>
                                        <input
                                        type="radio"
                                        name="usertype"
                                        value="1"
                                        className="form-radio"
                                        ref={userTypeRef1}
                                        />
                                        Vlasnik sportske dvorane
                                    </label>
                                    <br/>
                                    <label className='radio-label'>
                                        <input
                                        type="radio"
                                        name="usertype"
                                        value="0"
                                        className="form-radio"
                                        ref={userTypeRef0}
                                        />
                                        Sportista
                                    </label>
                                </div>
                            </div>
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
                                <label htmlFor="email">E-mail adresa</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Unesite e-mail"
                                    ref = {emailRef}
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
                            <div className="form-group">
                                <label htmlFor="password2">Potvrdite šifru</label>
                                <input
                                    type="password"
                                    id="password2"
                                    name="password2"
                                    className="form-control"
                                    placeholder="Ponovite šifru"
                                    ref = {passwordConfirmationRef}
                                />
                            </div>
                            <br></br>
                            <button type="submit" className="register-button submit-form"
                                    onClick={registerUser}>
                                Registracija!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>

    );
}

export default Registration;
