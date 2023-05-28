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


    return (
        <div className="profile-div">
            <h2 className="headline-profile">Moj profil</h2>
            <table className="table-one">
                <tfoot>
                    <tr>
                        <td></td>
                        <td>
                            <button className="change-password">Promijeni lozinku</button>
                        </td>
                    </tr>
                </tfoot>
                <tbody>
                    <tr>
                        <td>Ime:</td>
                        <td>Elma</td>
                    </tr>
                    <tr>
                        <td>Prezime:</td>
                        <td>Turcinovic</td>
                    </tr>
                    <tr>
                        <td>Korisnicko ime:</td>
                        <td>elma.turcinovic</td>
                    </tr>
                    <tr>
                        <td>E-mail adresa:</td>
                        <td>elma.turcinovic@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Lozinka:</td>
                        <td>************</td>
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
            <button className="change-profile-image">Promijeni sliku profila</button>
            <button className="save-changes">Sačuvaj izmjene</button>
        </div>
    );
}

export default ProfileComp;