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
          onChange={(e) => setFriendEmail(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal} className='invite-friend'>
          Zatvori
        </Button>
        <Button variant="primary" onClick={handleInvite} className='invite-friend'>
          Pošalji pozivnicu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteFriendModal;
