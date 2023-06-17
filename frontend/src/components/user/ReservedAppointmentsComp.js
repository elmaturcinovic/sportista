import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import InviteFriendModal from "./InviteFriendModal";

const ReservedAppointmentsComp = () => {


  //privremeno
  const notifications = [
    {id: 1, name: "Dvorana 101", date: "20.06.2023", time: "17:00h -- 19:30h"},
    {id: 2, name: "Dvorana 102", date: "21.06.2023", time: "13:00h -- 15:30h"},
  ];



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
    axios.delete(`http://127.0.0.1:8000/delete_user_appointment/${sportUserAppointmentId}/`).then((response) => {
      fetchUserAppointments();
    }).catch((error) => {
      console.log('Greska brisanja termina:', error);
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
            {/* userAppointments.map ... umesto notif*/}
            {notifications.map(userAppointment => (
              <tr key={userAppointment.id} className="tr-table-app">
                <td>#{userAppointment.id}</td>
                <td>{userAppointment.name}</td>
                <td>{userAppointment.date}</td>
                <td>{userAppointment.time}</td>
                <td>
                  <button onClick={() => openModal(userAppointment.id)} className="invite-friend">
                    <AiOutlinePlus className='icon-invite' />
                  </button>
                </td>
                <td className='right-col' style={{ textAlign: "center" }}>
                  <button className="delete-appointment" onClick={() => deleteUserAppointment(userAppointment.id)}>
                    <AiOutlineDelete className='delete-icon' />
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
