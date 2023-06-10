import axios from 'axios';
import React, { useState } from 'react';

// jos fetch data

const ChangePasswordComp = () => {

  const [showForm, setShowForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  const stari_password = sessionStorage.getItem("password")
  const id_user = sessionStorage.getItem("id")

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSaveClick = () => {

    if (newPassword === '') {
      setMessage('Lozinka ne smije biti prazno polje.');
    } 
    else if (newPassword === stari_password) {
      setMessage('Nova lozinka je ista kao i stara lozinka.');
    } 
    else if (newPassword === confirmPassword) {

      axios.put('http://127.0.0.1:8000/password_reset/', {
      
        newpass: newPassword,
        id: id_user,

      }).then((response) => {
          if (response.data) {
            setMessage('Lozinka uspješno promijenjena!');
          } else {
            setMessage('Promjena lozinke nije uspjelo.');
          }
        })
        .catch((error) => {
          console.error('Greška:', error);
          setMessage('Greška prilikom promjene lozinke.');
        });
    } 
    else {
      setMessage('Lozinke se ne popudaraju.');
    }
    setNewPassword('')
    setConfirmPassword('')
  };

  const handleCancelButtonClick = () => {
    setShowForm(false);
    setMessage('');
    setNewPassword('')
    setConfirmPassword('')
  };


  return (
    <div>
      {!showForm ? (
        <button onClick={handleButtonClick} className='change-password'>Promijeni lozinku</button>
      ) : (
        <div>
          <input
            type="password"
            placeholder="Unesite novu lozinku"
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Potvrdite novu lozinku"
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSaveClick} className='change-password'>Sačuvaj izmjene</button>
          <button onClick={handleCancelButtonClick} className='cancel-change-password'>Poništi</button>
          {message && <p className='message'>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ChangePasswordComp;
