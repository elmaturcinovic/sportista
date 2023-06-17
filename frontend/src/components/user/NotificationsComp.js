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
      console.log("Obavestenja kod kojih sam ja sender: ");
    } catch (error) {
      console.error('Error retrieving sent invites:', error);
    }
  };

//Uzmi sve obavijesti gdje sam ja receiver sa statusima 1 i 2
const getReceivedInvites = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/invites_received_by_me/${moj_id}/`);
    setReceivedInvites(response.data);
    console.log("Obavestenja kod kojih sam ja receiver: ");
  } catch (error) {
    console.error('Error retrieving received invites:', error);
  }
};

//Na klik Prihvati poziv, mijenja se status invite-a na 1 (Accepted) i dodaje se novi termin kod usera
  const acceptInvite = async (inviteId, notification) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/accept_invite/${inviteId}/`, {
        status: 1,
      });
      await axios.post(`http://127.0.0.1:8000/update_user_appointment/`, {
        appointmentId: notification.appointment.id,
        userId: notification.receiver.id,
      });
      getReceivedInvites();
    } catch (error) {
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
        <table
          style={{
            borderCollapse: 'separate',
            width: '100%',
            textAlign: 'center',
            fontSize: '22px',
            borderSpacing: '0px 20px',
          }}
        >
          <tbody>
            {receivedInvites.map((notification) => (
              <tr key={notification.id}>
                <td style={{ padding: '8px' }}>
                  Korisnik {notification.sender.user_username} vam šalje poziv da mu se pridružite!
                </td>
                <td style={{ padding: '8px' }}>{notification.id}</td>
                <td style={{ padding: '8px' }}>{notification.appointment.time}</td>
                <td style={{ padding: '8px' }}>
                  <button className="accept-invite-friend" onClick={() => acceptInvite(notification.id, notification)}>
                    Prihvati poziv
                    </button>
                </td>
                <td style={{ padding: '8px' }}>
                  <button className="decline-invite-friend" onClick={() => declineInvite(notification.id, notification)}>
                    Odbaci poziv
                    </button>
                </td>
              </tr>
            ))}
            {sentInvites.map((notification) => (
              <tr key={notification.id}>
                <td
                  style={{
                    padding: '10px',
                    backgroundColor: notification.status === 1 ? '#d7fce1' : notification.status === 0 ? '#fcf8d7' : '#fff0f0',
                    borderRadius: '25px',
                    border: "solid 1px rgba(0, 0, 0, 0.176)"
                  }}
                >
                  {
                  notification.status === 1
                    ? `Korisnik *invite ID: ${notification.id} je prihvatio vaš zahtjev za termin!`
                    : notification.status === 0
                    ? `Korisniku *invite ID: ${notification.id} ste poslali zahtjev za termin!`
                    : `Korisnik *invite ID: ${notification.id} je odbio vaš zahtjev za termin!`
                    }
                </td>
                <td style={{ padding: '8px' }}>{notification.appointment.sport_hall}</td>
                <td style={{ padding: '8px' }}>{notification.appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsComp;
