import { useState, useEffect } from "react";
import ChooseFileComp from "./ChooseFileComp";
import ChangePasswordComp from "./ChangePasswordComp";

const ProfileComp = () => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("password");
    setPassword(storedPassword);
  }, []);

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

    const name = sessionStorage.getItem("name");
    const lastname = sessionStorage.getItem("lastname");
    const username = sessionStorage.getItem("username");
    const email = sessionStorage.getItem("email");
    const pass_invisible = "*".repeat(password.length);

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
                <ChooseFileComp />
            </div>
    </div>
  );
};

export default ProfileComp;
