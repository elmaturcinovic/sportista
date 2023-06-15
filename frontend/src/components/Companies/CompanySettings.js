import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { AiOutlineEdit } from 'react-icons/ai';
import CoverPhotoSelectionForm from "./CoverPhotoSelectionForm";
import axios from "axios";
import ChangePasswordForm from "./ChangePasswordForm";


const CompanySettings = () => {
  
  const [password, setPassword] = useState('');
  const [showPhotoSelectionForm, setShowPhotoSelectionForm] = useState(false);
  const [user, setUser] = useState([]);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(sessionStorage.getItem('image'));

  const id = sessionStorage.getItem('id');
  const email = sessionStorage.getItem('email');
  const cover_photo = sessionStorage.getItem('image')
  const name = sessionStorage.getItem('name');
  const lastname = sessionStorage.getItem('lastname');
  const username = sessionStorage.getItem('username');
  const pass_invisible = "*".repeat(password.length);

    useEffect(() => {
      fetchUser(id);
    }, [id]);

    useEffect(() => {
      const storedPassword = sessionStorage.getItem("password");
      setPassword(storedPassword);
    }, []);

    const handlePasswordChange = (newPassword) => {
      setPassword(newPassword);
    };

    const handleEditPhoto = () => {
      setShowPhotoSelectionForm(!showPhotoSelectionForm);
    };
    const handleChangePassword = () => {
      setShowPasswordChangeForm(!showPasswordChangeForm);
  };

    function fetchUser(id) {
      axios
        .get(`http://127.0.0.1:8000/get_user/${id}`)
        .then((response) => {
          setUser(response.data);
          setSelectedPhoto(user.user_photo)
          sessionStorage.setItem('image', user.user_photo)
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    useEffect(() => {
      fetchUser(id);
    }, [id]);

    return (
      <div className='homepage'>
        <div className="cover-wrapper">
        <div className='cover-photo' style={{ width: '100%', height: '200px', background: `url(http://localhost:8000${user.user_photo}) no-repeat center/cover` }}></div>
          <div className="edit-cover-photo-icon" onClick={handleEditPhoto}>
            <AiOutlineEdit />
          </div>
        </div>
        
        <Navbar></Navbar>
        <div className='content'>
            <div className='title'>
                <h3>Postavke</h3>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Ime i prezime vlasnika:</td>
                        <td>{name} {lastname}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Korisničko ime (ime kompanije):</td>
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
                        <td className="right-col">
                            <AiOutlineEdit  onClick={handleChangePassword}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            {showPasswordChangeForm &&
                <ChangePasswordForm
                    password={password}
                    onPasswordChange={handlePasswordChange}
                    showPasswordChangeForm={showPasswordChangeForm}
                    setShowPasswordChangeForm={setShowPasswordChangeForm}
                />
            }
            {showPhotoSelectionForm &&
            <CoverPhotoSelectionForm
              showPhotoSelectionForm={showPhotoSelectionForm}
              setShowPhotoSelectionForm={setShowPhotoSelectionForm}
              user={user}
              fetchUser={fetchUser}
            />
            }
        </div>
      </div>
    );
  };
  
  export default CompanySettings;