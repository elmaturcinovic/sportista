import React from "react";
import {useState} from 'react';
import ChooseFileComp from "./ChooseFileComp";
import PropTypes from "prop-types";
import ChangePasswordComp from "./ChangePasswordComp";


/* komponenta za brisanje dugmica na klik */
/* ali izbori se vracaju nakon refresanja stranice, to se moze rijesiti samo treba baza */
const DeleteButton = ({ name, onDelete }) => {
    const handleClick = () => {
      onDelete(name);
    };
  
    return (
      <button onClick={handleClick} className="interests">
        {name} &times;
      </button>
    );
  };
  
  DeleteButton.propTypes = {
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
  };


const ProfileComp = () => {

    /* Za interese */

    const [buttons, setButtons] = useState([
        { id: 1, name: 'Plivanje' },
        { id: 2, name: 'Vaterpolo' },
        { id: 3, name: 'Bilijar' },
    ]);
    /* dodana varijabla redni samo privremeno*/
    let redni = 4;
    /* Za interese */
    const handleDelete = (name) => {
        setButtons(buttons.filter((button) => button.name !== name));
    };
    const AddElementToEnd = () => {
        if(document.getElementById('add-interest').value !== '') {
            setButtons(buttons => {
                return [...buttons, {id: redni + 1, name: document.getElementById('add-interest').value}]
            })
        }
    }

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
            <h2 className="headline-profile">Moj profil</h2>
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

            <table className="table-two">
                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            {buttons.map((button) => (
                                <DeleteButton
                                    key={button.id}
                                    name={button.name}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </td>
                    </tr>
                </tfoot>
                <tbody>
                    <tr>
                        <td>Interesi:</td>
                        <td>
                            <input type="text" placeholder="Dodaj novi" id="add-interest" />
                            <button className="add-interest" type="submit" onClick={AddElementToEnd}>Dodaj</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="choose-file">
                <ChooseFileComp/>
            </div>
        </div>
    );
}

export default ProfileComp;