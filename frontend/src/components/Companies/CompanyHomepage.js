import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Modal from "react-bootstrap/Modal";

import "./styles_companies.css"
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';
import { AiOutlineDelete, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const ModalComp = ({ showModal, setShowModal, selectedSports, setSelectedSports, handleAddSportHall, navigateToSportHallDetails}) => {

  const [sportsAll, setSportsAll] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    city: "",
    email: "",
    phone_number:"",
    sports: new Set(),
    photo: null,
  });

  useEffect(() => {
    fetchSports();
  }, []);

  useEffect(() => {
    if (!showModal) {
      resetFormState();
    }
  }, [showModal]);

  const resetFormState = () => {
    setFormState({
      name: "",
      address: "",
      city: "",
      email: "",
      phone_number:"",
      sports: new Set(),
      photo: null,
    });
  };

  // Function to fetch sport names from the backend
  function fetchSports() {
    axios.get('http://127.0.0.1:8000/get_sports/').then((response) => {
        setSportsAll(response.data);
        console.log(response.data);
    }, (error) => {
        console.log(error);
    }
    );
}

  const { name, address, city, email, phone_number, sports, photo } = formState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSportsChange = (e) => {
    const selectedSportId = parseInt(e.target.value);
    if (selectedSports.has(selectedSportId)) {
      setSelectedSports((prevSelectedSports) => {
        const updatedSports = new Set([...prevSelectedSports]);
        updatedSports.delete(selectedSportId);
        return updatedSports;
      });
      setFormState((prevFormState) => ({
        ...prevFormState,
        sports: new Set([...prevFormState.sports].filter((sportId) => sportId !== selectedSportId)),
      }));
    } else {
      setSelectedSports((prevSelectedSports) => new Set([...prevSelectedSports, selectedSportId]));
      setFormState((prevFormState) => ({
        ...prevFormState,
        sports: new Set([...prevFormState.sports, selectedSportId]),
      }));
    }
  };

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
            setFormState((prevState) => ({
              ...prevState,
              photo: photoPath,
            }));
        })
        .catch(error => {
            console.error('Error uploading photo:', error);
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState)
    try {
      const sportHallId = await handleAddSportHall(formState);
      setShowModal(false);
      if (sportHallId) {
        navigateToSportHallDetails(sportHallId);
      } else {
        console.log('Failed to create sport hall.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <Modal show={showModal}>
      <Modal.Header>
        <h3>Dodaj novi sportski teren</h3>
        <button className="close-button" onClick={() => setShowModal(false)}><AiOutlineClose /></button>
      </Modal.Header>
      <Modal.Body>
        <form className='forma1' onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Naziv:
              <input type="text" name="name" value={name} onChange={handleInputChange} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Adresa:
              <input type="text" name="address" value={address} onChange={handleInputChange} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Grad:
              <input type="text" name="city" value={city} onChange={handleInputChange} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
              <input type="text" name="email" value={email} onChange={handleInputChange} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Telefon:
              <input type="text" name="phone_number" value={phone_number} onChange={handleInputChange} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Sportovi:
              <select
                id="sports"
                multiple={true}
                value={Array.from(selectedSports)}
                onChange={handleSportsChange}
              >
                {sportsAll.map((sport) => (
                  <option key={sport.id} value={sport.id} defaultValue={selectedSports.has(sport.id)}>
                    {sport.sport_name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Slika:
              <input type="file" onChange={handlePhotoChange} />
            </label>
          </div>
          <Modal.Footer>
            <button type="submit" className='add-button'>Dodaj teren</button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const CompanyHomepage = () => {
  const history = useHistory(); 

  const id = sessionStorage.getItem('id');
  const cover_photo = sessionStorage.getItem('image')
  console.log(id);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [sports, setSports] = useState([]);
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSports, setSelectedSports] = useState(new Set());
  const [user, setUser] = useState([]);


  const [sportHalls, setSportHalls] = useState([]);

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  useEffect(() => {
    fetchSportHalls();
  }, []);

  function fetchSportHalls() {
    axios.get(`http://127.0.0.1:8000//get_sport_halls_by_user/${id}/`).then((response) => {
      setSportHalls(response.data);
      console.log(response.data);
    }, (error) => {
      console.log(error);
    }
    );
  }

  function fetchUser(id) {
    axios
      .get(`http://127.0.0.1:8000/get_user/${id}/`)
      .then((response) => {
        setUser(response.data);
        sessionStorage.setItem('image', user.user_photo)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteSportHall = async (sportHallId) => {
    axios.delete(`http://127.0.0.1:8000//delete_sport_hall/${sportHallId}/`).then((response) => {
      fetchSportHalls()
    }, (error) => {
      console.log('Error deleting sport hall:', error);
    }
    );
  };
 
  const handleAddSportHall = async (formState) => {
    // Make an API request to submit the form data
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('address', formState.address);
    formData.append('city', formState.city)
    formData.append('email', formState.email)
    formData.append('phone_number', formState.phone_number)    
    formData.append('owner', id)

    formState.sports.forEach((sport) => {
      formData.append('sports', sport);
      console.log(sport)
    });

  formData.append('photo', formState.photo);
  try {
    const response = await axios.post('http://127.0.0.1:8000/add_sport_hall/', formData);
    console.log('Sport hall created:', response.data);
    fetchSportHalls();
    setShowModal(false);
    const sportHallId = response.data.id; // Extract the new sportHallId from the response
    //console.log(response)
    return sportHallId;
  } catch (error) {
    console.error('Error creating sport hall:', error);
    return null;
  }
};
const navigateToSportHallDetails = (sportHallId) => {
  history.push(`/teren-detalji/${sportHallId}`);
};
  const getCurrentDayOfWeek = () => {
    const today = new Date();
    return today.getDay() + 1;
  };

  const isCurrentTimeInRange = (startTime, endTime) => {
    const currentTime = new Date();
    const start = new Date();
    const end = new Date();

    const [startHour, startMinute, startSecond] = startTime.split(':');
    const [endHour, endMinute, endSecond] = endTime.split(':');

    start.setHours(parseInt(startHour, 10), parseInt(startMinute, 10), parseInt(startSecond, 10));
    end.setHours(parseInt(endHour, 10), parseInt(endMinute, 10), parseInt(endSecond, 10));

    return currentTime >= start && currentTime <= end;
  };

  const determineStatus = (workingDays, workTimeBegin, workTimeEnd) => {
    const currentDayOfWeek = getCurrentDayOfWeek();
    const isOpen = workingDays.includes(currentDayOfWeek) && isCurrentTimeInRange(workTimeBegin, workTimeEnd);
    return isOpen ? 'Open' : 'Closed';
  };

  return (
    <div className='homepage'>
      <div className='cover-photo' style={{ width: '100%', height: '200px', background: `url(http://localhost:8000${user.user_photo}) no-repeat center/cover` }}></div>
      <Navbar></Navbar>
      <div className='content'>
        <div className='title'>
          <h3>Moji tereni</h3>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Naziv terena</th>
              <th>Lokacija</th>
              <th>Status</th>
              <th className='right-col'>
                <button className="add-button" onClick={() => setShowModal(true)}>
                  Dodaj &nbsp; <AiOutlinePlus />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sportHalls.map(sportHall => (
              <tr key={sportHall.id} >
                <td><img className='sport_hall_photo_table' src={`http://localhost:8000${user.user_photo}`} /></td>
                <td onClick={() => navigateToSportHallDetails(sportHall.id)}>{sportHall.name}</td>
                <td>{sportHall.address}, {sportHall.city}</td>
                <td>{determineStatus(sportHall.working_days, sportHall.work_time_begin, sportHall.work_time_end)}</td>
                <td className='right-col'><AiOutlineDelete className='delete-icon' onClick={() => deleteSportHall(sportHall.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {console.log(showModal)}
        {showModal && (
          <ModalComp
              showModal={showModal}
              setShowModal={setShowModal}
              handleAddSportHall={handleAddSportHall}
              navigateToSportHallDetails={navigateToSportHallDetails}
              formState={{
                name: name,
                address: address,
                city: city,
                sports: sports,
                photo: photo
              }}
              selectedSports={selectedSports} 
              setSelectedSports={setSelectedSports} 
          />
        )}
      </div>
    </div>
  );
};

export default CompanyHomepage;
