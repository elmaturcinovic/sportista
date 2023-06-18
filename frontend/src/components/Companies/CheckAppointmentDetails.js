import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles_companies.css';
import axios from 'axios';

const CheckAppointmentModal = ({ isOpen, setIsOpen, appointment, closeModal }) => {
    const [modalClassName, setModalClassName] = useState('')

    useEffect(() => {
        if (!appointment.booked) {
          setModalClassName('green-modal');
        } else if (appointment.available) {
          setModalClassName('yellow-modal');
        } else {
          setModalClassName('red-modal');
        }
      }, [appointment]);
    const userIds = appointment.users
    console.log(userIds)
    const [userNames, setUserNames] = useState([])
   

    function fetchUserNames(userIds) {
        axios
          .get(`http://127.0.0.1:8000/get_all_users/`)
          .then((response) => {
            const users = response.data;
            const filteredUsers = users.filter(user => userIds.includes(user.id));
            const usernames = filteredUsers.map(user => user.user_username);
            setUserNames(usernames);
            sessionStorage.setItem('image', filteredUsers[0].user_photo);
            console.log(usernames);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
      useEffect(()=>{
        fetchUserNames(userIds)
        console.log(userNames)
      }, [userIds])
      

  return (
    <Modal show={isOpen} onHide={closeModal} dialogClassName={modalClassName}>
        <Modal.Header closeButton className={modalClassName}>
            <div className='mainModalContainer'>
                <h2>Pregled termina</h2>
                <h6  className={modalClassName}>Termin je {!appointment.booked ? "slobodan":"zauzet"}</h6>
            </div>
        </Modal.Header>
        
        <Modal.Body className={modalClassName}>
            <table>
              <tbody>
                <tr>
                  <th>Naziv terena: </th>
                  <td>{appointment.sport_hall}</td>
                </tr>
                
                {appointment.booked &&
                <tr>
                    <th>Rezervisao korisnik: </th>
                    <td>
                     {userNames[0]}
                    </td>
                </tr>
                }
                {appointment.booked &&
                <tr>
                    <th>Broj zauzetih mjesta: </th>
                    <td>
                        {appointment.used_spots}
                    </td>
                </tr>
                }
                <tr>
                <th>Datum: </th>
                  <td>
                  {appointment.date}
                  </td>
                </tr>
                <tr> 
                <th>Vrijeme: </th>
                  <td>
                  {appointment.time_start.substring(0, 5)} - {appointment.time_end.substring(0, 5)}
                  </td>
                </tr>
                <tr>
                  <th>Cijena:</th>
                  <td> {appointment.price} KM</td>
                </tr>
                <tr>
                  <th>Kapacitet termina:</th>
                  <td>
                    {appointment.capacity}
                  </td>
                </tr>
              </tbody>
            </table>
        </Modal.Body>
      </Modal>
  );
};

export default CheckAppointmentModal;
