import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const PhotoSelectionForm = ({sportHall, fetchSportHall}) => {
 
    const [photo, setPhoto] = useState(sportHall.photo);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('photo', file);
    
        // Upload the photo to the backend
        axios.post('http://127.0.0.1:8000/upload_photo/', formData)
            .then(response => {
                // Get the path to the uploaded photo from the response
                const photoPath = response.data.path;
    
                // Update the photo variable with the path
                console.log(photoPath)
                setPhoto(photoPath);
            })
            .catch(error => {
                console.error('Error uploading photo:', error);
            });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedSportHall = {
            ...sportHall,
            photo: photo,
        };
        try {
            await axios.put(`http://127.0.0.1:8000/update_sport_hall/${sportHall.id}/`, updatedSportHall);
            fetchSportHall(sportHall.id);
        } catch (error) {
            console.error('Error updating sport hall:', error);
        }
    };

    return (
        <div className='selection-form'>
        <h3>Promijeni sliku terena:</h3>
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
    </div>
    )
}

export default PhotoSelectionForm