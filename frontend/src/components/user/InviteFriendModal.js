import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const InviteFriendModal = ({ isOpen, closeModal }) => {

  const [friendEmail, setFriendEmail] = useState('');


  //za pozivanje prijatelja
  const handleInvite = () => {

  fetch('http://127.0.0.1:8000/invite_friend/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: friendEmail }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Pozivnica uspesno poslana!');
        closeModal();
      } else {
        console.error('Pozivnica nije poslana.');
      }
    })
    .catch((error) => {
      console.error('Greska:', error);
    });
    console.log('Pozivanje prijatelja:', friendEmail);
    closeModal();
  };

  return (
    <Modal show={isOpen} onHide={closeModal} contentLabel="Invite Friend Modal">
      <Modal.Header closeButton>
        <Modal.Title>Pozovi prijatelja</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={friendEmail}
          placeholder='Unesite e-mail adresu korisnika'
          onChange={(e) => setFriendEmail(e.target.value)}
          style={{width:"100%", borderRadius: "25px", padding: "5px"
        }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal} style={{
          padding: "10px 40px",
          margin: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          height: "50px",
          borderRadius: "25px",
          backgroundColor: "#FA8072",
          color: "#303030",
          border: "none",
          cursor: "pointer"}}
          >
          Zatvori
        </Button>
        <Button variant="primary" onClick={handleInvite} style={{
          padding: "10px 40px",
          margin: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          height: "50px",
          borderRadius: "25px",
          backgroundColor: "#61dafb",
          color: "#303030",
          border: "none",
          cursor: "pointer"}} >
          Pošalji pozivnicu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteFriendModal;
