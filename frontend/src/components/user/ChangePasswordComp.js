import axios from 'axios';
import React, { useState } from 'react';

const ChangePasswordComp = ({ password, onPasswordChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false)

  const stari_password = sessionStorage.getItem("password");
  const id_user = sessionStorage.getItem("id");

  const handleButtonClick = () => {
    setMessage(false)
    setShowForm(true);
  };

  const handleSaveClick = () => {
    if (newPassword === '') {
      setMessage('Lozinka ne smije biti prazno polje.');
    } else if (newPassword === stari_password) {
      setMessage('Nova lozinka je ista kao i stara lozinka.');
    } else if (newPassword === confirmPassword) {
      axios
        .put('http://127.0.0.1:8000/password_reset/', {
          newpass: newPassword,
          id: id_user,
        })
        .then((response) => {
          if (response.data) {
            setMessage('Lozinka uspješno promijenjena!');
            onPasswordChange(newPassword);
            setShowForm(false)
            setShowMessage(true)
            sessionStorage.setItem("password", newPassword);
          } else {
            setMessage('Promjena lozinke nije uspjela.');
          }
        })
        .catch((error) => {
          console.error('Greška:', error);
          setMessage('Greška prilikom promjene lozinke.');
        });
    } else {
      setMessage('Lozinke se ne podudaraju.');
    }
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCancelButtonClick = () => {
    setShowForm(false);
    setMessage('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div>
      {!showForm ? (
        <button onClick={handleButtonClick} className='change-password' id='change-password-company'>
          Promijeni lozinku
        </button>
      ) : (
        <div>
          <input
            type='password'
            placeholder='Unesite novu lozinku'
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Potvrdite novu lozinku'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSaveClick} className='change-password' id='change-password-company'>
            Sačuvaj izmjene
          </button>
          <button onClick={handleCancelButtonClick} className='cancel-change-password' id='change-password-company'>
            Poništi
          </button>
        </div>
      )}
      {showMessage && message && <p className='message'>{message}</p>}
    </div>
  );
};

export default ChangePasswordComp;
