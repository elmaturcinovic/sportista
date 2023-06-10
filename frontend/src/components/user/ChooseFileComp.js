import React, { useState, useEffect } from 'react';
import axios from 'axios';

const id = sessionStorage.getItem("id")

const ChooseFileComp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get('/api/user')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageChange = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', selectedFile);
      console.log(formData)

      axios
        .put('http://127.0.0.1:8000/update_profile/', {
      
        formData,
        id_usera: id,

      })
        .then((response) => {
          console.log('Profilna slika uspješno promijenjena!');
          fetchUserData(); 
        })
        .catch((error) => {
          console.error('Greska izmjene profilne slike:', error);
        });
    }
  };

  return (
    <div className="div-image-change">
      {userData && <p>User Name: {userData.name}</p>}
      <input
        type="file"
        accept=".jpeg, .png"
        onChange={handleFileSelect}
        id="profile-image-input"
      />
      {selectedFile && (
        <p className="selected-file-image">Odabrana slika: {selectedFile.name}</p>
      )}
      <button
        className="change-profile-image"
        type="button"
        onClick={handleImageChange}
      >
        Promijeni sliku profila
      </button>
    </div>
  );
};

export default ChooseFileComp;