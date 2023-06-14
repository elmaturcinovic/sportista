import React, { useEffect, useState } from "react";
import axios from 'axios';

import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import InviteFriendModal from "./InviteFriendModal";



const ReservedAppointmentsComp = () => {


  const notifications = [
    {id: 1, name: "Dvorana 101", date: "20.06.2023", time: "17:00h -- 19:30h"},
    {id: 2, name: "Dvorana 102", date: "21.06.2023", time: "13:00h -- 15:30h"},
  ];

  const id_usera = sessionStorage.getItem('id');

  const [userAppoinments, setUserAppointments] = useState([]);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);

  const openModal = () => {
    setIsFriendModalOpen(true);
  };

  const closeModal = () => {
    setIsFriendModalOpen(false);
  };


//kupi sve rezervisane termine iz korisnikove baze
  useEffect(() => {
    fetchUserAppointmets();
  }, []);

  function fetchUserAppointmets() {
    axios.get(`http://127.0.0.1:8000/get_user_appointments_by_user/${id_usera}/`).then((response) => {
      setUserAppointments(response.data);
      console.log(response.data);
    }, (error) => {
      console.log(error);
    }
    );
  }

  const deleteUserAppointment = async (sportUserAppointmentId) => {
    axios.delete(`http://127.0.0.1:8000/delete_user_appointment/${sportUserAppointmentId}/`).then((response) => {
      fetchUserAppointmets()
    }, (error) => {
      console.log('Greska brisanja termina:', error);
    }
    );
  };


    return (
      <div className="schedule-main-div">
        <div className="schedule-first-div">
          <h2 className="headline-profile">Rezervisani termini</h2>
      </div>
      <div className="schedule-second-div">
        <table id="table_id" style={{textAlign: "center"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv terena</th>
              <th>Datum</th>
              <th>Vrijeme</th>
              <th>Pozovite prijatelja</th>
              <th>Odjavite termin</th>
            </tr>
          </thead>
          <tbody>
            {/*userAppointment.map... */}
            {notifications.map(userAppoinment => (
              <tr key={userAppoinment.id} className="tr-table-app">
                <td><img className='sport_appointment_photo_table' src={`http://localhost:8000${userAppoinment.photo}`}/></td>
                <td>{userAppoinment.name}</td>
                <td>{userAppoinment.date}</td>
                {/*<td>{userAppoinment.work_time_begin}, {userAppoinment.work_time_end}</td>*/}
                <td>{userAppoinment.time}</td>
                <td>
                  <button onClick={openModal} className="invite-friend">
                    <AiOutlinePlus className='icon-invite'/>
                  </button> 
                </td>
                <td className='right-col' style={{textAlign: "center"}}> 
                  <button className="delete-appointment">
                  <AiOutlineDelete className='delete-icon' onClick={() => deleteUserAppointment(userAppoinment.id)} />
                  </button>
                </td>
              </tr>
                )
              )
            }
          </tbody>
        </table>
        </div>    
        <InviteFriendModal isOpen={isFriendModalOpen} closeModal={closeModal} />      
      </div>
    );
};
  

export default ReservedAppointmentsComp;