import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationsComp = () => {
  const [sentInvites, setSentInvites] = useState([]);
  const [receivedInvites, setReceivedInvites] = useState([]);

  useEffect(() => {
    getSentInvites();
    getReceivedInvites();
  }, []);


  //Uzmi sve obavijesti gdje sam ja sender
  const getSentInvites = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/invites_sent_by_me/');
      setSentInvites(response.data);
    } catch (error) {
      console.error('Error retrieving sent invites:', error);
    }
  };

//Uzmi sve obavijesti gdje sam ja receiver sa statusima 1 i 2
  const getReceivedInvites = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/invites_received_by_me/');
      setReceivedInvites(response.data);
    } catch (error) {
      console.error('Error retrieving received invites:', error);
    }
  };

//Na klik Prihvati poziv, mijenja se status invite-a na 1 (Accepted) i dodaje se novi termin kod usera
  const acceptInvite = async (inviteId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/accept_invite/${inviteId}/`, {
        status: 1,
      });
      await axios.post(`http://127.0.0.1:8000/update_user_appointment/${inviteId}/`, {
        appointmentId: notification.appointment.id,
        userId: notification.receiver.id,
      });
      getReceivedInvites();
    } catch (error) {
      console.error('Error accepting invite:', error);
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
      console.error('Error declining invite:', error);
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
                <td style={{ padding: '8px' }}>{notification.appointment.sport_hall.name}</td>
                <td style={{ padding: '8px' }}>{notification.appointment.time}</td>
                <td style={{ padding: '8px' }}>
                  <button className="accept-invite-friend" onClick={() => acceptInvite(notification.id)}>Prihvati poziv</button>
                </td>
                <td style={{ padding: '8px' }}>
                  <button className="decline-invite-friend" onClick={() => declineInvite(notification.id)}>
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
                    backgroundColor: notification.status === 1 ? '#61dafb' : '#FA8072',
                    borderRadius: '25px',
                  }}
                >
                  {notification.status === 1
                    ? `Korisnik ${notification.receiver.user_name} je prihvatio vaš zahtjev za termin!`
                    : `Korisnik ${notification.receiver.user_name} je odbio vaš zahtjev za termin!`}
                </td>
                <td style={{ padding: '8px' }}>{notification.appointment.sport_hall.name}</td>
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
