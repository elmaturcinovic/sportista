
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "./styles_companies.css"
import axios from 'axios';
import {AiOutlineDelete} from 'react-icons/ai'

const CompanyHomepage = () => {
    const id = sessionStorage.getItem('id');
    console.log(id);

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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {sportHalls.map(sportHall => (
                        <tr key={sportHall.id}>
                            <td><img className='sport_hall_photo_table' src={`http://localhost:8000${sportHall.photo}`} /></td>
                            <td>{sportHall.name}</td>
                            <td>{sportHall.location}</td>
                            <td>{sportHall.status}</td>
                            <td><AiOutlineDelete className='delete-icon' onClick={() => deleteSportHall(sportHall.id)}/></td>
                    </tr>
                     ))}
                    {/* Add more rows here */}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default CompanyHomepage;
