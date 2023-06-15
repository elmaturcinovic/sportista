import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ChangePasswordComp from "../user/ChangePasswordComp";
import ChooseFileComp from "../user/ChooseFileComp"


const CompanySettings = () => {

  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("password");
    setPassword(storedPassword);
  }, []);

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };
    
    const id = sessionStorage.getItem('id');
    const email = sessionStorage.getItem('email');
    const cover_photo = sessionStorage.getItem('image')
    const name = sessionStorage.getItem('name');
    const lastname = sessionStorage.getItem('lastname');
    const username = sessionStorage.getItem('username');
    const pass_invisible = "*".repeat(password.length);

    return (
      <div className='homepage'>
        <div className='cover-photo' style={{ width: '100%', height: '200px', background: `url(http://localhost:8000${cover_photo}) no-repeat center/cover` }}></div>
        <Navbar></Navbar>
        <div className='content'>
            <div className='title'>
                <h3>Postavke</h3>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Ime:</td>
                        <td>{name}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Prezime:</td>
                        <td>{lastname}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Korisnicko ime:</td>
                        <td>{username}</td>
                        <td></td>
                   </tr>
                    <tr>
                        <td>E-mail adresa:</td>
                        <td>{email}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Lozinka:</td>
                        <td>{pass_invisible}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div className="comp-settings-button" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}>       
                <ChangePasswordComp
                    password={password}
                    onPasswordChange={handlePasswordChange}
                />
                <ChooseFileComp/>
            </div>
        </div>
      </div>
    );
  };
  
  export default CompanySettings;