import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationsComp = () => {
  const [sentInvites, setSentInvites] = useState([]);
  const [receivedInvites, setReceivedInvites] = useState([]);

  useEffect(() => {
    getSentInvites();
    getReceivedInvites();
  }, []);

  const getSentInvites = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/invites_sent_by_me/');
      setSentInvites(response.data);
    } catch (error) {
      console.error('Error retrieving sent invites:', error);
    }
  };

  const getReceivedInvites = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/invites_received_by_me/');
      setReceivedInvites(response.data);
    } catch (error) {
      console.error('Error retrieving received invites:', error);
    }
  };

  const acceptInvite = async (inviteId) => {
    try {
      
      await axios.put(`http://127.0.0.1:8000/update_invite_status/${inviteId}/`, { status: 1 });

      // Get the invite details to retrieve the appointment ID and receiver ID
      const response = await axios.get(`http://127.0.0.1:8000/get_invite_details/${inviteId}/`);
      const { appointment, receiver } = response.data;

      // Update UserAppointments table by adding the receiver to the list of users
      await axios.put(`http://127.0.0.1:8000/update_user_appointments/${appointment.id}/`, {
        users: [...appointment.users, receiver.id],
      });

      getReceivedInvites();
    } catch (error) {
      console.error('Error updating invite status:', error);
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
            borderSpacing: '0px 20px'
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
                  <button className="accept-invite-friend" onClick={() => acceptInvite(notification.id)}>
                    Prihvati poziv
                  </button>
                </td>
                <td style={{ padding: '8px' }}>
                  <button className="decline-invite-friend">Odbaci poziv</button>
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
