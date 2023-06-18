
/*

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

//axios.get(`http://127.0.0.1:8000/get_appointment/${appointment_id}/`)

//Podaci dobijeni iz axiosa gore:

    //"id": 3,
    //"date": "2023-06-18",
    //"time_start": "12:00:00",
    //"time_end": "14:00:00",
    //"capacity": 12,
    //"price": 70.0,
    //"available": true,
    //"sport_hall": 37,
    //"sports": [
    //    3,
    //    4
    //]



//axios.get(`http://127.0.0.1:8000/get_sport_hall_by_id/${id_sport_hall}/`)

//Podaci dobijeni iz axiosa gore:

    //"id": 37,
    //"name": "Sportska dvorana",
    //"address": "Street 110",
    //"city": "Banja Luka",
    //"photo": "/media/images/20230616004616_mojmilo_field.jpg",
    //"work_time_begin": "08:00:00",
    //"work_time_end": "17:00:00",
    //"email": "sporthall@gmail.com",
    //"phone_number": "+123 45 678 910",
    //"owner": 19,
    //"sports": [
    //    2,
    //    3,
    //    4
    //],
    //"working_days": [
    //    1,
    //    3,
    //    5
    //]


  function fetchUserAppointments() {
    axios.get(`http://127.0.0.1:8000/get_user_appointments_by_user/${id_usera}/`).then((response) => {
      setUserAppointments(response.data);
      console.log(response.data);

      //"id": 14,
      //"available_spots": 7,
      //"used_spots": 4,
      //"available": true,
      //"appointment": 3,
      //"sport": 3,
      //"users": [
      //    20
      //]



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


*/


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
    axios.get(`http://127.0.0.1:8000/get_user_appointments_by_user/${id_usera}/`)
      .then((response) => {
        const userAppointmentsData = response.data;
        const appointmentPromises = userAppointmentsData.map(userAppointment => {
          const appointmentId = userAppointment.appointment;
          const appointmentPromise = axios.get(`http://127.0.0.1:8000/get_appointment/${appointmentId}/`)
            .then(appointmentResponse => {
              const sportHallId = appointmentResponse.data.sport_hall;
              const sportHallPromise = axios.get(`http://127.0.0.1:8000/get_sport_hall_by_id/${sportHallId}/`)
                .then(sportHallResponse => {
                  const mergedData = {
                    ...userAppointment,
                    appointmentData: appointmentResponse.data,
                    sportHallData: sportHallResponse.data
                  };
                  return mergedData;
                });

              return sportHallPromise;
            });

          return appointmentPromise;
        });

        Promise.all(appointmentPromises)
          .then(mergedAppointments => {
            setUserAppointments(mergedAppointments);
            console.log(mergedAppointments);
          })
          .catch(error => {
            console.log('Error merging data:', error);
          });
      })
      .catch((error) => {
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
                <td>{userAppointment.sportHallData.name}</td>
                <td>{userAppointment.appointmentData.date}</td>
                <td>{userAppointment.appointmentData.time_start}h - {userAppointment.appointmentData.time_end}h</td>
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

