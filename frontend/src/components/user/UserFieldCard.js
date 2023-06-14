import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import './styles_user.css'

function UserFieldCard() {
 const [openModal,setOpenModal]= useState(false)
 
  const showModal = () => { 
    setOpenModal(!openModal)
  }

  const handleSubmit = () => {
    console.log("submitano")
    setOpenModal(false)
  }

  return (
    <div>
        <div className='user-card-container' onClick={showModal}>
            <div className='user-card-title'>Naziv terena: Dvorana 2</div>
            <div className='user-card-time'>Vrijeme: 09:00 - 12:00</div>
            <div className='user-card-price'>Cijena: 100KM</div>
        </div>
        <Modal show={openModal} onHide={showModal} centered>
        <Modal.Header closeButton>
          <h3>Rezervisi svoj termin</h3>
        </Modal.Header>
        <Modal.Body>
          <form className='forma1' onSubmit={handleSubmit}>
            <div className="form-group">
            Naziv terena: Dvorana 2
            </div>
            <div className="form-group">
              Vrijeme: 09:00 - 12:00
            </div>
            <div className="form-group">
             Cijena: 100KM
            </div>
            <div className="form-group">
        Odaberite broj igrača:
        <select name="numberOfPlayers">
          {Array.from({ length: 12 }, (_, i) => (
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