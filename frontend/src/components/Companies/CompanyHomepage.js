
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Modal from "react-bootstrap/Modal";

import "./styles_companies.css"
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';
import {AiOutlineDelete, AiOutlinePlus} from 'react-icons/ai'


const ModalComp = ({ showModal, setShowModal, handleAddSportHall, name, setName, address, setAddress, city, setCity, sports, setSports, setPhoto }) => {
    
    const [sportNames, setSportNames] = useState([]);

    useEffect(() => {
        fetchSportNames();
    }, []);

    // Function to fetch sport names from the backend
    const fetchSportNames = async () => {
        try {
        const response = await axios.get('http://127.0.0.1:8000/get_sport_names/');
        const { sport_names } = response.data;
        setSportNames(sport_names);
        } catch (error) {
        console.error('Error fetching sport names:', error);
        }
    };
    
    return (
    <Modal show={showModal}>
        <Modal.Header>
            <h2>Dodaj novi sportski teren</h2>
        </Modal.Header>
        <Modal.Body>
            <form className='forma1' onSubmit={handleAddSportHall}>
                <div className="form-group">
                    <label>
                        Naziv:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Adresa:
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                </div>
                <div className="form-group">
                    <label>
                        Grad:
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                </div>
                <div className="form-group">
                    <label>
                        Sportovi:
                        <select id="sports"
                                multiple={true}
                                value={[sports]} 
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    console.log(sports)
                                    setSports((prevSports) => new Set([...prevSports, ...selectedOptions]));
                                  }}
                                  >
                            {sportNames.map((sportName) => (
                            <option key={sportName} value={sportName}>{sportName}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Slika:
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
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
    const id = sessionStorage.getItem('id');
    console.log(id);

    const [name, setName] = useState('');
    const [address, setAddress]= useState('');
    const [city, setCity] = useState('');
    const [sports, setSports] = useState(new Set());
    const [photo, setPhoto] = useState('');
    const [showModal, setShowModal] = useState(false);


    const [sportHalls, setSportHalls] = useState([]);

    useEffect(() => {
        fetchSportHalls();
    }, []);

    function fetchSportHalls(){
        axios.get(`http://127.0.0.1:8000//get_sport_halls_by_user/${id}/`).then((response)=>{
                    setSportHalls(response.data);
                    console.log(response.data);
                }, (error) => {
                    console.log(error);
                }
            );
    }  

    const deleteSportHall = async (sportHallId) => {
        axios.delete(`http://127.0.0.1:8000//delete_sport_hall/${sportHallId}/`).then((response)=>{
            fetchSportHalls()
        }, (error) => {
            console.log('Error deleting sport hall:', error);
        }
    );
    }

    const handleAddSportHall = async (e) => {
        e.preventDefault();
      
        // Make an API request to submit the form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('city', city)
        formData.append('owner', id)
        formData.append('sports', sports);
        formData.append('photo', photo);
      
        try {
          const response = await axios.post('http://127.0.0.1:8000//add_sport_hall/', formData);
          console.log('Sport hall created:', response.data);
          // Optionally, you can fetch the updated sport halls list here
          fetchSportHalls();
          // Close the modal
          setShowModal(false);
        } catch (error) {
          console.error('Error creating sport hall:', error);
        }
    };

    const getCurrentDayOfWeek = () => {
        const today = new Date();
        return today.getDay()+1;
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
            <div className='cover-photo' style={{ width: '100%', height: '200px', background: 'url(./teren2.jpg) no-repeat center/cover' }}></div>
            <Navbar></Navbar>
            <div className='content'>
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
                        <tr key={sportHall.id}>
                            <td><img className='sport_hall_photo_table' src={`http://localhost:8000${sportHall.photo}`} /></td>
                            <td>{sportHall.name}</td>
                            <td>{sportHall.address}, {sportHall.city}</td>
                            <td>{determineStatus(sportHall.working_days, sportHall.work_time_begin, sportHall.work_time_end)}</td>
                            <td className='right-col'><AiOutlineDelete className='delete-icon' onClick={() => deleteSportHall(sportHall.id)}/></td>
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
                    name={name}
                    setName={setName}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    sports={sports}
                    setSports={setSports}
                    setPhoto={setPhoto}
                    />
                )}
            </div>
        </div>
    );
};

export default CompanyHomepage;
