import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationsComp = () => {

  const moj_id = sessionStorage.getItem('id');

  const [sentInvites, setSentInvites] = useState([]);
  const [receivedInvites, setReceivedInvites] = useState([]);

  useEffect(() => {
    getSentInvites();
    getReceivedInvites();
  }, []);


  //Uzmi sve obavijesti gdje sam ja sender
  const getSentInvites = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/invites_sent_by_me/${moj_id}/`);
      setSentInvites(response.data);
    } catch (error) {
      console.error('Greska povlacenja poslanih pozivnica:', error);
    }
  };

//Uzmi sve obavijesti gdje sam ja receiver sa statusima 1 i 2
const getReceivedInvites = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/invites_received_by_me/${moj_id}/`);
    setReceivedInvites(response.data);
  } catch (error) {
    console.error('Greska povlacenja dobijenih pozivnica:', error);
  }
};

//Na klik Prihvati poziv, mijenja se status invite-a na 1 (Accepted) i dodaje se novi termin kod usera
  const acceptInvite = async (inviteId, received_invite) => {


    const app_res = await axios.get(`http://127.0.0.1:8000/get_user_appointment_by_user_appointment_id/${received_invite.appointment}/`);
    const app_sender = await axios.get(`http://127.0.0.1:8000/get_user/${received_invite.sender}/`);
    const app_receiver = await axios.get(`http://127.0.0.1:8000/get_user/${received_invite.receiver}/`);

//stavljeno radi orentacije
      //app_res.data
        //appointment: 5
        //available: true
        //available_spots: 2
        //id: 40
        //sport: 3
        //used_spots: 8
        //users: [20]



    try {//Na klik Prihvati poziv, mijenja se status invite-a na 1 (Accepted)
      await axios.patch(`http://127.0.0.1:8000/accept_invite/${inviteId}/`, {
        status: 1,
      });

//stavljeno radi orentacije
      //received_invite =
        //appointment: 40
        //id: 15
        //receiver: 21
        //sender: 20
        //status: 1

      await axios.post(`http://127.0.0.1:8000/update_user_appointment/`, {
        userId: received_invite.receiver,
        appointmentId: app_res.data[0].appointment,
        usedSpots: app_res.data[0].used_spots,
        availableSpots: app_res.data[0].available_spots,
        sport: app_res.data[0].sport,
        available: app_res.data[0].available,
      });

      getReceivedInvites();
    } catch (error) {
      console.log("ODGOVOR: ", inviteId );
      console.error('Greška prihvatanja pozivnice za sportski termin sa ID: ', inviteId, " sa greškom: ", error);
    }
  };

//Na klik Odbaci poziv, mijenja se status invite-a na 2 (Rejected)
  const declineInvite = async (inviteId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/decline_invite/${inviteId}/`, {
        status: 2,
      });
      getReceivedInvites();
    } catch (error) {
      console.error('Greška odbijanja pozivnice za sportski termin sa ID: ', inviteId, " sa greškom: ", error);
    }
  };

  return (
    <div className="schedule-second-div">
      <div className="schedule-first-div">
        <h2 className="headline-profile">Moje obavijesti</h2>
      </div>
      <div className="schedule-second-div">
        <table className='notif_table'
          style={{
            borderCollapse: 'separate',
            width: '100%',
            textAlign: 'center',
            fontSize: '22px',
            borderSpacing: '0px 20px',
          }}
        >
          <tbody>
            {receivedInvites.map((received_invite) => (
              <tr key={received_invite.id}>
                <td style={{ padding: '8px' }}>
                  Korisnik sa ID: {received_invite.sender} vam šalje poziv da mu se pridružite!
                </td>
                <td style={{ padding: '8px' }}>ID app: {received_invite.appointment}</td>
                <td style={{ padding: '8px' }}>ID inv: {received_invite.id}</td>
                <td style={{ padding: '8px' }}>
                  <button className="accept-invite-friend" onClick={() => acceptInvite(received_invite.id, received_invite)}>
                    Prihvati poziv
                    </button>
                </td>
                <td style={{ padding: '8px' }}>
                  <button className="decline-invite-friend" onClick={() => declineInvite(received_invite.id, received_invite)}>
                    Odbaci poziv
                    </button>
                </td>
              </tr>
            ))}
            {sentInvites.map((notification) => (
              <tr key={notification.id}>
                <td colSpan="3"
                  style={{
                    padding: '20px',
                    backgroundColor: notification.status === 1 ? '#d7fce1' : notification.status === 0 ? '#fcf8d7' : '#fff0f0',
                    borderRadius: '25px',
                    border: "solid 1px rgba(0, 0, 0, 0.176)"
                  }}
                >
                  {
                  notification.status === 1
                    ? `Korisnik sa ID: ${notification.receiver} je prihvatio vaš zahtjev za termin!`
                    : notification.status === 0
                    ? `Korisniku sa ID: ${notification.receiver} ste poslali zahtjev za termin!`
                    : `Korisnik sa ID: ${notification.receiver} je odbio vaš zahtjev za termin!`
                    }
                </td>
                <td style={{ padding: '8px' }}>ID inv: {notification.id}</td>
                <td style={{ padding: '8px' }}>ID inv: {notification.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsComp;
