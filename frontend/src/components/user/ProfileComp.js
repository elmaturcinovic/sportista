import { useState, useEffect } from "react";
import ChooseFileComp from "./ChooseFileComp";
import ChangePasswordComp from "./ChangePasswordComp";
import axios from 'axios';

const ProfileComp = ({user, fetchUser}) => {

  const [password, setPassword] = useState('');

  const id = sessionStorage.getItem('id');
  const email = sessionStorage.getItem('email');
  const cover_photo = sessionStorage.getItem('image')
  const name = sessionStorage.getItem('name');
  const lastname = sessionStorage.getItem('lastname');
  const username = sessionStorage.getItem('username');
  const pass_invisible = "*".repeat(password.length);

  useEffect(() => {
    fetchUser(id);
    console.log(user)
  }, [id]);

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("password");
    setPassword(storedPassword);
  }, []);

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

  useEffect(() => {
    fetchUser(id);
    console.log(user)
  }, [id]);


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
                                <ChangePasswordComp
                                    password={password}
                                    onPasswordChange={handlePasswordChange}
                                />
                            </td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>Ime:</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Prezime:</td>
                            <td>{lastname}</td>
                        </tr>
                        <tr>
                            <td>Korisnicko ime:</td>
                            <td>{username}</td>
                        </tr>
                        <tr>
                            <td>E-mail adresa:</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Lozinka:</td>
                            <td>{pass_invisible}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="schedule-second-div">
                <ChooseFileComp 
                    user={user}
                    fetchUser={fetchUser}
                />
            </div>
    </div>
  );
};

export default ProfileComp;
