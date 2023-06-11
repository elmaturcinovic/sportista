import React from "react";
import {useState} from 'react';
import ChooseFileComp from "./ChooseFileComp";
import ChangePasswordComp from "./ChangePasswordComp";
import InterestsComp from "./InterestsComp"


const ProfileComp = () => {

    const name = sessionStorage.getItem("name")
    const lastname = sessionStorage.getItem("lastname")
    const username = sessionStorage.getItem("username")
    const email = sessionStorage.getItem("email")
    const password = sessionStorage.getItem("password")
    const pass_invisible = "*".repeat(password.length);

    const field = {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: pass_invisible
    }

    return (
        <div className="profile-div">
            <div className="schedule-first-div">
                <h2 className="headline-profile">Moj profil</h2>
            </div>
            <div className="schedule-first-div">
                <table className="table-one">
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <ChangePasswordComp/>
                            </td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>Ime:</td>
                            <td>{field.name}</td>
                        </tr>
                        <tr>
                            <td>Prezime:</td>
                            <td>{field.lastname}</td>
                        </tr>
                        <tr>
                            <td>Korisnicko ime:</td>
                            <td>{field.username}</td>
                        </tr>
                        <tr>
                            <td>E-mail adresa:</td>
                            <td>{field.email}</td>
                        </tr>
                        <tr>
                            <td>Lozinka:</td>
                            <td>{field.password}</td>
                        </tr>
                    </tbody>
                </table>

                <InterestsComp/>
                <ChooseFileComp/>

            </div>

        </div>
    );
}

export default ProfileComp;