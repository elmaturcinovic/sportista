import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ChooseFileComp = ({user, fetchUser}) => {
  
  const id = sessionStorage.getItem('id');
  const [photo, setPhoto] = useState(user.user_photo);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
  
    axios.post('http://127.0.0.1:8000/upload_photo/', formData)
        .then(response => {
            const photoPath = response.data.path;
            console.log(photoPath)
            setPhoto(photoPath);
        })
        .catch(error => {
            console.error('Error uploading photo:', error);
        });
};

const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedUser = {
      ...user,
      user_photo: photo,
    };
    console.log(updatedUser)
  
    try {
      await axios.put(`http://127.0.0.1:8000/update_user/${id}/`, updatedUser);
      fetchUser(id);
      //setSelectedPhoto(photo)
      sessionStorage.setItem('image', user.user_photo);
    } catch (error) {
      console.error('Error updating user:', error);
    }
};

  return (
    <div className="div-image-change">
      <div>
        <input
          type="file"
          onChange={handlePhotoChange}
          id="profile-image-input"
        />
      </div>
      
      <button
        className="change-profile-image"
        id='change-password-company'
        type="submit"
        onClick={handleSubmit}
      >
        Promijeni sliku profila
      </button>
    </div>
  );
};

export default ChooseFileComp;