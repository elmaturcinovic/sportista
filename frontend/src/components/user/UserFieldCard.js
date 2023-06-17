import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles_user.css';
import axios from 'axios';
import DropDownCompSports from './DropdownCompSports';

function UserFieldCard({ appointment }) {
  const user_id = sessionStorage.getItem('id')
  const { id: appointmentId, time_start, time_end, sport_hall, date, capacity, price, sports } = appointment;
  const [openModal, setOpenModal] = useState(false);
  const [sportHall, setSportHall] = useState('');
  const [sportNames, setSportNames] = useState([]);
  const [selectedSport, setSelectedSport] = useState();
  const [sportObjects, setSportsObjects] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [allowOtherPlayers, setAllowOtherPlayers] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(capacity - numberOfPlayers);
  const [users, setUsers] = useState([parseInt(sessionStorage.getItem('id'))]);
  console.log(users)



  useEffect(() => {
    fetchSportNames(sports);
  }, [sports]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/get_sport_hall_by_id/${sport_hall}`)
      .then(
        (response) => {
          setSportHall(response.data);
          console.log(response.data);
          console.log(date);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get_sports/').then(
      (response) => {
        const filteredSportsObjects = response.data.filter((sportObject) => sports.includes(sportObject.id));
        setSportsObjects(filteredSportsObjects);
        console.log(filteredSportsObjects);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const showModal = () => {
    setOpenModal(!openModal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('appointment', appointment.id);
    formData.append('users', users);
    formData.append('date', date);
    formData.append('used_spots', numberOfPlayers);
    formData.append('available_spots', capacity - numberOfPlayers);
    formData.append('sport', selectedSport);
    formData.append('available', allowOtherPlayers);
    console.log("form data:")
    console.log(parseInt(appointmentId))
    console.log(users)
    console.log(date)
    console.log(numberOfPlayers)
    console.log(capacity - numberOfPlayers)
    console.log(selectedSport)
    console.log(allowOtherPlayers)
    console.log(formData);

    axios
    .post('http://127.0.0.1:8000/add_user_appointment/', formData)
    .then((response) => {
      console.log(response.data); // Handle the response as needed
      setOpenModal(false);
    })
    .catch((error) => {
      console.log(error); // Handle any errors
    });

    setOpenModal(false);
  };

  const formatTime = (time) => {
    if (!time) {
      return '';
    }
    const [hours, minutes, _] = time.split(':');
    return `${hours}:${minutes}`;
  };

  function fetchSportNames(sportIds) {
    console.log(sportIds);
    axios
      .get(`http://127.0.0.1:8000/get_sport_names_selected/`, {
        params: { sportIds: sportIds },
      })
      .then(
        (response) => {
          setSportNames(response.data);
          console.log(response.data);
        })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSportChange = (selectedValue) => {
    setSelectedSport(parseInt(selectedValue));
    console.log(selectedValue); // Updated selectedSport value
  };

  const handleNumberOfPlayersChange = (event) => {
    const players = parseInt(event.target.value);
    setNumberOfPlayers(players);
    setAllowOtherPlayers(players < capacity);
    setAvailableSpots(capacity - players);
  };

  return (
    <div>
      <div className='user-card-container' onClick={showModal}>
        <div className='user-card-title'>{sportNames.map((sport) => sport).join(', ')}</div>
        <div className='user-card-time'>
          Vrijeme: {formatTime(time_start)} - {formatTime(time_end)}
        </div>
        <div className='user-card-price'>Cijena: {price} KM</div>
      </div>
      <Modal show={openModal} onHide={showModal}>
        <Modal.Header closeButton>
          <h3>Rezerviši termin</h3>
        </Modal.Header>
        <Modal.Body>
          <form className='appointment-form ' onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>Naziv terena: </th>
                  <td>{sportHall.name}</td>
                </tr>
                <tr>
                  <th>Vrijeme:</th>
                  <td>
                    {formatTime(time_start)} - {formatTime(time_end)}
                  </td>
                </tr>
                <tr>
                  <th>Cijena:</th>
                  <td>{price} KM</td>
                </tr>
                <tr>
                  <th>Broj igrača:</th>
                  <td>
                    <select name="numberOfPlayers" value={numberOfPlayers} onChange={handleNumberOfPlayersChange}>
                      {Array.from({ length: capacity }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Sport:</th>
                  <td>
                    <DropDownCompSports
                      label="Sport"
                      showLabel={false}
                      selected={selectedSport}
                      options={sportObjects}
                      onChange={handleSportChange}
                      className="custom-drop-down"
                    />
                  </td>
                </tr>
                {numberOfPlayers === capacity ? null : (
                  <tr>
                    <th>
                      Omogućite drugim igračima da se priključe vašem terminu
                    </th>
                    <td>
                      <input
                        type="checkbox"
                        name="allowOtherPlayers"
                        checked={allowOtherPlayers}
                        onChange={() => setAllowOtherPlayers(!allowOtherPlayers)}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Modal.Footer>
              <button type="submit" className='add-button'>
                Rezervisi termin
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserFieldCard;
