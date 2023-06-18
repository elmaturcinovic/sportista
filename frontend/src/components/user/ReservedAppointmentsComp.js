import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import InviteFriendModal from "./InviteFriendModal";

const ReservedAppointmentsComp = () => {


  const [userAppointments, setUserAppointments] = useState([]);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const id_usera = sessionStorage.getItem('id');

  const openModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsFriendModalOpen(true);
  };

  const closeModal = () => {
    setIsFriendModalOpen(false);
  };

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  function fetchUserAppointments() {
    axios.get(`http://127.0.0.1:8000/get_user_appointments_by_user/${id_usera}/`).then((response) => {
      setUserAppointments(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const deleteUserAppointment = async (sportUserAppointmentId) => {
    axios.delete('http://127.0.0.1:8000/delete_user_appointment/', { data: { appointment_id: sportUserAppointmentId } })
      .then((response) => {
        fetchUserAppointments();
        console.log("Uspešno obrisan sportski termin sa ID: ", sportUserAppointmentId);
      })
      .catch((error) => {
        console.log('Greška brisanja sportskog termina sa ID:', sportUserAppointmentId, "with error:", error);
      });
  };
  
  

  return (
    <div className="schedule-main-div">
      <div className="schedule-first-div">
        <h2 className="headline-profile">Rezervisani termini</h2>
      </div>
      <div className="schedule-second-div">
        <table id="table_id" style={{ textAlign: "center" }}>
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
            {userAppointments.map(userAppointment => (
              <tr key={userAppointment.id} className="tr-table-app">
                <td>#{userAppointment.id}</td>
                <td>ID app: {userAppointment.appointment}</td>
                <td>ID app: {userAppointment.appointment}</td>
                <td>ID app: {userAppointment.appointment}</td>
                <td>
                  <button onClick={() => openModal(userAppointment.id)} className="invite-friend">
                    <AiOutlinePlus className='icon-invite'/>
                  </button>
                </td>
                <td className='right-col' style={{ textAlign: "center" }}>
                  <button className="delete-appointment" onClick={() => deleteUserAppointment(userAppointment.id)}>
                    <AiOutlineDelete className='delete-icon'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InviteFriendModal isOpen={isFriendModalOpen} closeModal={closeModal} appointmentId={selectedAppointmentId} />
    </div>
  );
};

export default ReservedAppointmentsComp;
