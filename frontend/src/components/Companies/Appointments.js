import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Modal from "react-bootstrap/Modal";

import "./styles_companies.css"
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import AddAppointmentModal from './AddAppointmentModal';

const Appointments = () => {
    const id = sessionStorage.getItem('id');
    const cover_photo = sessionStorage.getItem('image');
    const history = useHistory(); 
    const [sports, setSports] = useState([]);
    const [selectedSports, setSelectedSports] = useState([]);
    const [sportHalls, setSportHalls] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [appointments, setAppointments] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [filterData, setFilterData] = useState({
        sportHall: '',
        sports: new Set(),
        date: '',
    });

    useEffect(() => {
        fetchSports();
        fetchSportHalls();
        fetchAppointments();
      }, []);

    // Function to fetch sport names from the backend
    function fetchSports() {
        axios.get('http://127.0.0.1:8000/get_sports/').then((response) => {
            setSports(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }
    
    function fetchSportHalls() {
        axios.get(`http://127.0.0.1:8000/get_sport_halls_by_user/${id}/`).then((response) => {
          setSportHalls(response.data);
          console.log(response.data);
        }, (error) => {
          console.log(error);
        }
        );
    }

    function fetchAppointments() {
        axios.get(`http://127.0.0.1:8000/get_all_appointments_by_owner/${id}/`).then((response) => {
          setAppointments(response.data);
          console.log(response.data);
        }, (error) => {
          console.log(error);
        }
        );
    }


    const handleFilterToggle = () => {
        setShowFilter(!showFilter);
    };

    const handleSportHallSelect = (event) => {
        setFilterData({ ...filterData, sportHall: event.target.value });
    };
    
    const handleSportCheckboxChange = (event) => {
        const sportId = event.target.value;
        const selectedSportsSet = new Set(filterData.sports);
        if (event.target.checked) {
          selectedSportsSet.add(sportId);
        } else {
          selectedSportsSet.delete(sportId);
        }
        setFilterData({ ...filterData, sports: selectedSportsSet });
      };
    
    const handleDateChange = (event) => {
        setFilterData({ ...filterData, date: event.target.value });
    };

    const handleAddAppointment = async (formState) => {
        console.log(formState)
        const formData = new FormData();
        formData.append('sport_hall', formState.sport_hall);
        formState.sports.forEach((sport) => {
            formData.append('sports', sport);
            console.log(sport)
        });
        formData.append('date', formState.date);
        formData.append('time_start', formState.time_start)
        formData.append('time_end', formState.time_end)
        formData.append('capacity', formState.capacity)

        try {
            const response = await axios.post('http://127.0.0.1:8000/add_new_appointment/', formData);
            console.log('Appointment created:', response.data);
            fetchAppointments();
            setShowModal(false);
            const appointmentId = response.data.id; // Extract the new sportHallId from the response
            //console.log(response)
            return appointmentId;
        } catch (error) {
            console.error('Error creating appointment:', error);
            return null;
        } 
    };

    const deleteAppointment = async (appointmentId) => {
        axios.delete(`http://127.0.0.1:8000//delete_appointment/${appointmentId}/`).then((response) => {
          fetchAppointments()
        }, (error) => {
          console.log('Error deleting appointment:', error);
        }
        );
    };
    const formatTime = (time) => {
        if (!time) {
          return '';
        }
        const [hours, minutes, _] = time.split(':');
        return `${hours}:${minutes}`;
      };
    
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        // Logic to filter table data based on filterData
        // Update the table data based on the filter criteria
    };

    return (
        <div className='homepage'>
            <div className='cover-photo' style={{ width: '100%', height: '200px', background: `url(http://localhost:8000${cover_photo}) no-repeat center/cover` }}></div>
            <Navbar></Navbar>
            <div className='content'>
                <div className='title title-filters'>
                    <h3 className='title-text'>Termini</h3>
                    <button className='filter-icon-button' onClick={handleFilterToggle}>
                        <FiFilter />
                    </button>
                </div>
                {showFilter && (
                <form className='filter-form' onSubmit={handleFilterSubmit}>
                    <div className='form-wrapper'>
                        <div className='table-wrapper'>
                            <table className='filter-form-table'>
                                <tbody>
                                    <tr>
                                        <th>
                                            <label className='filter-form-label' htmlFor='sportHallDropdown'>Odaberi teren/dvoranu:</label>
                                        </th>
                                        <td>
                                            <select
                                                id='sportHallDropdown'
                                                value={filterData.sportHall}
                                                onChange={handleSportHallSelect}
                                            >
                                                <option value=''></option>
                                                {sportHalls.map((hall) => (
                                                <option key={hall.id} value={hall.id}>
                                                    {hall.name}
                                                </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label className='filter-form-label'>Odaberi sport:</label>
                                        </th>
                                        <td>
                                        {sports.map((sport) => (
                                        <div key={sport.id} className="form-check">
                                            <input
                                            type="checkbox"
                                            id={`sport-${sport.id}`}
                                            value={sport.id}
                                            checked={filterData.sports.has(sport.id)}
                                            onChange={handleSportCheckboxChange}
                                            className="form-check-input"
                                            />
                                            <label htmlFor={`sport-${sport.id}`} className="form-check-label">
                                            {sport.sport_name}
                                            </label>
                                        </div>
                                        ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label className='filter-form-label' htmlFor='datePicker'>Datum:</label>
                                        </th>
                                        <td>
                                            <input
                                                type='date'
                                                id='datePicker'
                                                value={filterData.date}
                                                onChange={handleDateChange}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <br></br>
                        <button type='submit' className='add-button filter-button'>Filtriraj termine</button>
                    </div>
                </form>
                )}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Naziv terena</th>
                            <th>Datum</th>
                            <th>Početak</th>
                            <th>Kraj</th>
                            <th>Status</th>
                            <th className='right-col'>
                                <button className="add-button" onClick={() => setShowModal(true)}>
                                Dodaj termin &nbsp; <AiOutlinePlus />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                        <tr>
                            <td>#{appointment.id}</td>
                            <td>{appointment.sport_hall}</td>
                            <td>{appointment.date}</td>
                            <td>{formatTime(appointment.time_start)}</td>
                            <td>{formatTime(appointment.time_end)}</td>
                            <td></td>
                            <td className='right-col'><AiOutlineDelete className='delete-icon' onClick={() => deleteAppointment(appointment.id)} /></td>
                        </tr>   
                        ))}
                    </tbody>
                </table>
                <AddAppointmentModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleAddAppointment={handleAddAppointment}
                    allSports={sports}
                    sportHalls={sportHalls}
                />
            </div>
        </div>
    )
}

export default Appointments