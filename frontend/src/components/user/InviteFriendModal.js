import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const InviteFriendModal = ({ isOpen, closeModal }) => {

  const id_sender = sessionStorage.getItem('id');
  const username_sender = sessionStorage.getItem('username');

  const [appointmentID, setAppointmentID] = useState(0);
  const [friendUsername, setFriendUsername] = useState('');
  const [message, setMessage] = useState("");

  const handleInvite = () => {
    setAppointmentID()
    axios
      .post('http://127.0.0.1:8000/invite_friend/', {

        appointment_id: appointmentID,
        username: friendUsername,
        id: id_sender,
      })
      .then((response) => {
        console.log('Pozivnica uspesno poslana!');
        console.log(
          'Pozivnicu salje: ' +
            username_sender +
            ' sa ID: ' +
            id_sender +
            '. Pozivnica se salje korisniku: ' +
            friendUsername
        );
        closeModal();
      })
      .catch((error) => {
        console.error('Greska:', error);
        setMessage("Pozivnica nije poslana.");
      });
  };

  return (
    <Modal show={isOpen} onHide={closeModal} contentLabel="Invite Friend Modal">
      <Modal.Header closeButton>
        <Modal.Title>Pozovi prijatelja</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={friendUsername}
          placeholder="Unesite username korisnika"
          onChange={(e) => setFriendUsername(e.target.value)}
          style={{ width: '100%', borderRadius: '25px', padding: '5px' }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={closeModal}
          style={{
            padding: '10px 40px',
            margin: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            height: '50px',
            borderRadius: '25px',
            backgroundColor: '#FA8072',
            color: '#303030',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Zatvori
        </Button>
        <Button
          variant="primary"
          onClick={handleInvite}
          style={{
            padding: '10px 40px',
            margin: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            height: '50px',
            borderRadius: '25px',
            backgroundColor: '#61dafb',
            color: '#303030',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Pošalji pozivnicu
        </Button>
        {message}
      </Modal.Footer>
    </Modal>
  );
};

export default InviteFriendModal;
