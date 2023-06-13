import React, { useEffect, useState } from "react";
import axios from 'axios';

import { AiOutlineDelete, AiOutlinePlus, AiOutlineClose, AiOutlineMinus } from 'react-icons/ai'
import InviteFriendModal from "./InviteFriendModal";



const ReservedAppointmentsComp = () => {

  const id_usera = sessionStorage.getItem('id');

  const [sportAppoinments, setSportAppointments] = useState([]);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);

  const openModal = () => {
    setIsFriendModalOpen(true);
  };

  const closeModal = () => {
    setIsFriendModalOpen(false);
  };


//kupi sve rezervisane termine iz korisnikove baze
  useEffect(() => {
    fetchSportAppointmets();
  }, []);

  function fetchSportAppointmets() {
    axios.get(`http://127.0.0.1:8000/get_sport_appointments_by_user/${id_usera}/`).then((response) => {
      setSportAppointments(response.data);
      console.log(response.data);
    }, (error) => {
      console.log(error);
    }
    );
  }

  const deleteAppointment = async (sportAppointmentId) => {
    axios.delete(`http://127.0.0.1:8000/delete_sport_appointment/${sportAppointmentId}/`).then((response) => {
      fetchSportAppointmets()
    }, (error) => {
      console.log('Greska brisanja termina:', error);
    }
    );
  };


    return (
      <div className="schedule-main-div">
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv terena</th>
              <th>Datum</th>
              <th>Vrijeme</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sportAppoinments.map(sportAppoinment => (
              <tr key={sportAppoinment.id}>
                <td><img className='sport_appointment_photo_table' src={`http://localhost:8000${sportAppoinment.photo}`}/></td>
                <td>{sportAppoinment.name}</td>
                <td>{sportAppoinment.date}</td>
                {/*vrijeme termina*/}
                <td>{sportAppoinment.work_time_begin}, {sportAppoinment.work_time_end}</td>
                <td>
                  <button onClick={openModal} className="invite-friend">Pozovi prijatelja
                    <AiOutlinePlus className='icon-invite'/>
                  </button> 
                </td>
                <td className='right-col'> 
                  <button onClick={deleteAppointment}>
                  <AiOutlineDelete className='delete-icon' onClick={() => deleteAppointment(sportAppoinment.id)} />
                  </button></td>
              </tr>
                )
              )
            }
          </tbody>
        </table>

        <InviteFriendModal isOpen={isFriendModalOpen} closeModal={closeModal} />      
      </div>
    );
};
  

export default ReservedAppointmentsComp;