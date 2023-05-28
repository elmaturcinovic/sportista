import React from "react";
import {useState} from 'react';


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


const ProfileComp = () => {

    /* Za interese */
    const [buttons, setButtons] = useState([
        { id: 1, name: 'Plivanje' },
        { id: 2, name: 'Vaterpolo' },
        { id: 3, name: 'Bilijar' },
    ]);
    /* Za interese */
    const handleDelete = (name) => {
        setButtons(buttons.filter((button) => button.name !== name));
    };


    const field = {
        name: "Elma",
        lastname: "Turcinovic",
        username: "elma.turcinovic",
        email: "elma.turcinovic@gmail.com",
        password: '**********'
    }

    return (
        <div className="profile-div">
            <h2 className="headline-profile">Moj profil</h2>
            <table className="table-one">
                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <button className="change-password" type="submit">Promijeni lozinku</button>
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
                            <input type="search" placeholder=" Dodaj novi" id="add-interest"/>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="choose-file">
                <button>Odaberi fajl</button>
                <span>Nije odabran fajl</span>
            </div>
            <button className="change-profile-image" type="submit">Promijeni sliku profila</button>
            <button className="save-changes" type="submit">Sačuvaj izmjene</button>
        </div>
    );
}

export default ProfileComp;