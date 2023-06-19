import React from 'react'
import { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai'


const AddAppointmentModal = ({showModal, setShowModal, handleAddAppointment, allSports, setAllSports, fetchSports, sportHalls}) => {
    const [selectedSports, setSelectedSports] = useState(new Set());
    const [sportHall, setSportHall] = useState(null);
    const [sportOptions, setSportOptions] = useState([]);
    const [formState, setFormState] = useState({
        sport_hall: "",
        sports: new Set(),
        date: '',
        time_start: '',
        time_end: '',
        capacity: '',
        price: 0.00
    });
    const [workTimeStart, setWorkTimeStart] = useState('');
    const [workTimeEnd, setWorkTimeEnd] = useState('');
    
    useEffect(() => {
        if (showModal) {
          if (sportOptions.length === 0) {
            setSportOptions(allSports);
          }
        } else {
          resetFormState();
        }
    }, [showModal, allSports]);
      
    useEffect(() => {
        if (!showModal) {
          resetFormState();
        }
    }, [showModal]);
    
    const resetFormState = () => {
        setFormState({
            sport_hall: "",
            sports: new Set(),
            date: '',
            time_start: '',
            time_end: '',
            capacity: '',
            price: 0.00
        });
        setSelectedSports(new Set())
    };

    const { sport_hall, sports, date, time_start, time_end, capacity, price } = formState;

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

    async function fetchSportHall(sportHallId) {
        try {
            const response = await axios
                .get(`http://127.0.0.1:8000/get_sport_hall_by_id/${sportHallId}/`);
            setSportHall(response.data);
            console.log(response.data);
            setSportOptions(allSports.filter((sport) => response.data.sports.includes(sport.id)));
            setFormState((prevFormState) => ({
                ...prevFormState,
                time_start: response.data.work_time_begin,
                time_end: response.data.work_time_end,
            }));
        } catch (error) {
            console.log(error);
        }
    }
      
    const handleSportHallSelect = (event) => {
        const sportHallId = event.target.value;
        console.log(sportHallId);
        setFormState({ ...formState, sport_hall: sportHallId });
        if (sportHallId) {
          fetchSportHall(sportHallId);
          console.log(formState);
        } else {
          setSportHall(null);
          setSportOptions(allSports);
          console.log(sportOptions);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const appointmentId = await handleAddAppointment(formState);
          setShowModal(false);
          if (appointmentId) {
            console.log('Appointment created.')
          } else {
            console.log('Failed to create appointment.');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal show={showModal}>
        <Modal.Header>
            <h3>Dodaj novi termin</h3>
            <button className="close-button" onClick={() => setShowModal(false)}><AiOutlineClose /></button>
        </Modal.Header>
        <Modal.Body>
            <form className='forma1' onSubmit={handleSubmit}>
                <table className='appointment-form'>
                    <tbody>
                        <tr>
                            <th>
                                <label className='filter-form-label'>Sportska dvorana:</label>    
                            </th>
                            <td>
                                <select
                                    id='sportHallDropdown'
                                    name='sport_hall'
                                    value={formState.sport_hall}
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
                                <label className='filter-form-label'>Datum:</label>
                            </th>
                            <td>
                                <input type="date" name="date" onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label className='filter-form-label'>Vrijeme početka termina:</label>
                            </th>
                            <td>
                                <input type="time" name="time_start" step="900" min={workTimeStart} max={workTimeEnd} value={time_start} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label className='filter-form-label'> Vrijeme završetka termina:</label>
                            </th>
                            <td>
                                <input type="time" name="time_end" step="900" min={workTimeStart} max={workTimeEnd} value={time_end} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                               <label className='filter-form-label'>Sportovi: </label>
                            </th>
                            <td>
                                <select
                                    id="sports"
                                    multiple={true}
                                    value={Array.from(selectedSports)}
                                    onChange={handleSportsChange}
                                    >
                                    {sportOptions.map((sport) => (
                                        <option key={sport.id} value={sport.id} defaultValue={selectedSports.has(sport.id)}>
                                            {sport.sport_name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                               <label className='filter-form-label'>Kapacitet/broj osoba:</label>
                            </th>
                            <td>
                                <input id="capacity" type="number" name="capacity" defaultValue='0' min='0' onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                               <label className='filter-form-label'>Cijena termina:</label>
                            </th>
                            <td>
                                <input id="price" type="number" step="0.01" name="price" defaultValue='0.00' min='0.00' onChange={handleInputChange} /> KM
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <Modal.Footer>
                    <button type="submit" className='add-button'>Dodaj termin</button>
                </Modal.Footer>
            </form>
        </Modal.Body>
    </Modal>
    )
}

export default AddAppointmentModal