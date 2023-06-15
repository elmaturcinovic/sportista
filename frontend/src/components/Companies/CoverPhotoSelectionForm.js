import { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai'

const CoverPhotoSelectionForm = ({showPhotoSelectionForm, setShowPhotoSelectionForm, user, fetchUser}) => {
    const id = sessionStorage.getItem('id');
    const [photo, setPhoto] = useState(user.user_photo);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('photo', file);
      
        // Upload the photo to the backend
        axios.post('http://127.0.0.1:8000/upload_photo/', formData)
            .then(response => {
                // Get the path to the uploaded photo from the response
                const photoPath = response.data.path;
                console.log(photoPath)
        
                // Update the photo variable with the path
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
          await axios.put(`http://127.0.0.1:8000/update_user/${id}`, updatedUser);
          fetchUser(id);
          setShowPhotoSelectionForm(false)
          sessionStorage.setItem('image', user.user_photo);
        } catch (error) {
          console.error('Error updating user:', error);
        }
    };

    return (
        <Modal show={showPhotoSelectionForm}>
            <Modal.Header>
                <h3>Promijeni sliku naslovnice</h3>
                <button className="close-button" onClick={() => setShowPhotoSelectionForm(false)}><AiOutlineClose /></button>
            </Modal.Header>
            <Modal.Body> 
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Odaberi sliku:
                            <input type="file" onChange={handlePhotoChange} />
                        </label>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <button type="submit" className='add-button'>Spremi izmjene</button>
                    </div>
                </form> 
            </Modal.Body>
        </Modal>
        )
}

export default CoverPhotoSelectionForm