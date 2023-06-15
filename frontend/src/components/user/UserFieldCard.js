import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import './styles_user.css'
import axios from 'axios';

function UserFieldCard({appointment}) {
  const { time_start, time_end, sport_hall, date, capacity, price }  = appointment
 const [openModal,setOpenModal]= useState(false)
 const [sportHall,setSportHall]= useState('')
 
  const showModal = () => { 
    setOpenModal(!openModal)
  }

  const handleSubmit = () => {
    console.log("submitano")
    setOpenModal(false)
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/get_sport_hall_by_id/${sport_hall}`).then((response) => {
      setSportHall(response.data);
        console.log(response.data);
        console.log(date)
    }, (error) => {
        console.log(error);
    }
    );

  }, []); 

  return (
    <div>
        <div className='user-card-container' onClick={showModal}>
            <div className='user-card-title'>Naziv terena: {sportHall.name}</div>
            <div className='user-card-time'>Vrijeme: {time_start} - {time_end}</div>
            <div className='user-card-price'>Cijena: {price}</div>
        </div>
        <Modal show={openModal} onHide={showModal} centered>
        <Modal.Header closeButton>
          <h3>Rezervisi svoj termin</h3>
        </Modal.Header>
        <Modal.Body>
          <form className='forma1' onSubmit={handleSubmit}>
            <div className="form-group">
            Naziv terena: {sportHall.name}
            </div>
            <div className="form-group">
              Vrijeme: {time_start} - {time_end}
            </div>
            <div className="form-group">
             Cijena: {price}
            </div>
            <div className="form-group">
        Odaberite broj igrača:
        <select name="numberOfPlayers">
          {Array.from({ length: capacity}, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group form-group-checkbox">
  <label>
    <input type="checkbox" name="allowOtherPlayers" />
    Omogućite drugim igračima da se priključe vašem terminu
  </label>
</div>
            <Modal.Footer>
              <button type="submit" className='add-button'>Rezervisi termin</button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UserFieldCard