import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles_companies.css';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';
import Navbar from './Navbar';
import SportSelectionForm from './SportSelectionForm';
import WorkingTimeSelection from './WorkingTimeSelection';
import WorkDaysSelection from './WorkDaysSelection';

const CompanyFieldDetails = () => {
    const id = sessionStorage.getItem('id');
    const cover_photo = sessionStorage.getItem('image');
    const { sportHallId } = useParams();
    const [sportHall, setSportHall] = useState(null);
    const [sportNames, setSportNames] = useState([]);
    const [dayNames, setDayNames] = useState([]);
    const [showSportSelectionForm, setShowSportSelectionForm] = useState(false);
    const [showWorkingTimeSelectionForm, setShowWorkingTimeSelectionForm] = useState(false);
    const [showWorkDaysSelectionForm, setShowWorkDaysSelectionForm] = useState(false);
    const [selectedSports, setSelectedSports] = useState([]);
    const [sports, setSports] = useState([]); 
    const [workTimeBegin, setWorkTimeBegin] = useState("");
    const [workTimeEnd, setWorkTimeEnd] = useState("");
    const [selectedWorkDays, setSelectedWorkDays] = useState([]);
    const [allDays, setAllDays] = useState([]);


    useEffect(() => {
        if (sportHall !== null) {
            fetchDayNames(sportHall.working_days);
            fetchSportNames(sportHall.sports);
            setSelectedSports(sportHall.sports);
            setWorkTimeBegin(sportHall.work_time_begin);
            setWorkTimeEnd(sportHall.work_time_end);
            setSelectedWorkDays(sportHall.working_days);
        }
    }, [sportHall]);

    useEffect(() => {
        fetchSports();
    }, []);
    useEffect(() => {
        fetchDays();
    }, []);

    function fetchSports() {
        axios.get('http://127.0.0.1:8000/get_sports/').then((response) => {
            setSports(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }

    function fetchDays() {
        axios.get('http://127.0.0.1:8000/get_days/').then((response) => {
            setAllDays(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }
    
    useEffect(() => {
        fetchSportHall(sportHallId);
    }, [sportHallId]);


    function fetchSportHall(sportHallId) {
        axios
        .get(`http://127.0.0.1:8000/get_sport_hall_by_id/${sportHallId}`)
        .then((response) => {
            setSportHall(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function fetchSportNames(sportIds) {
        axios
        .get(`http://127.0.0.1:8000/get_sport_names_selected`, {
            params: { sportIds: sportIds },
        })
        .then((response) => {
            setSportNames(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function fetchDayNames(dayIds) {
        axios
        .get(`http://127.0.0.1:8000/get_day_names_selected`, {
            params: { dayIds: dayIds },
        })
        .then((response) => {
            setDayNames(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleEditRadnoVrijeme = () => {
        setShowWorkingTimeSelectionForm(!showWorkingTimeSelectionForm);
        setShowSportSelectionForm(false);
        setShowWorkDaysSelectionForm(false);

    };
    const handleEditRadniDani = () => {
        setShowWorkDaysSelectionForm(!showWorkDaysSelectionForm);
        setShowWorkingTimeSelectionForm(false);
        setShowSportSelectionForm(false);


    };
    const handleEditSportovi = () => {
        setShowWorkDaysSelectionForm(false);
        setShowSportSelectionForm(!showSportSelectionForm);
        setShowWorkingTimeSelectionForm(false);

    };

    const handleSportFormSubmit = async () => {
        try {
          const updatedSportHall = { ...sportHall };
          updatedSportHall.sports = selectedSports;
          await axios.put(`http://127.0.0.1:8000/update_sport_hall/${sportHallId}`, updatedSportHall);
          fetchSportHall(sportHallId);
        } catch (error) {
          console.error('Error updating sport hall:', error);
        }
    };
    const handleWorkTimeFormSubmit = async (updatedSportHall) => {
        try {
          await axios.put(`http://127.0.0.1:8000/update_sport_hall/${sportHallId}`, updatedSportHall);
          fetchSportHall(sportHallId);

        } catch (error) {
          console.error('Error updating sport hall:', error);
        }
      };

      const formatWorkTime = (time) => {
        if (!time) {
          return '';
        }
        const [hours, minutes, _] = time.split(':');
        return `${hours}:${minutes}`;
      };

    const handleWorkDaysFormSubmit = async () => {
        try {
          const updatedSportHall = { ...sportHall };
          updatedSportHall.working_days = selectedWorkDays;
          console.log(updatedSportHall)
          await axios.put(`http://127.0.0.1:8000/update_sport_hall/${sportHallId}`, updatedSportHall);
          fetchSportHall(sportHallId);
        } catch (error) {
          console.error('Error updating sport hall:', error);
        }
    };

    if (sportHall === null) {
        return <div>Loading...</div>;
    }

    const {
        name,
        address,
        city,
        owner,
        photo,
        work_time_begin,
        work_time_end,
        working_days,
    } = sportHall;

    return (
        <div className="homepage">
            <div
                className="cover-photo"
                style={{
                width: '100%',
                height: '200px',
                background: `url(http://localhost:8000${cover_photo}) no-repeat center/cover`,
                }}
            ></div>

            <Navbar></Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <div className="card o-terenu">
                            <div className="row">
                                <div className="col-md-4">
                                <img
                                    src={`http://localhost:8000${photo}`}
                                    className="card-img"
                                    alt="Sport Hall"
                                />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h2 className="card-title">{name}</h2>
                                        <table className="table o-terenu-table">
                                            <tbody>
                                                <tr className="o-terenu-row">
                                                <td>Adresa:</td>
                                                <td>{address}</td>
                                                <td></td>
                                                </tr>
                                                <tr className="o-terenu-row">
                                                <td>Grad:</td>
                                                <td>{city}</td>
                                                <td></td>
                                                </tr>
                                                <tr className="o-terenu-row">
                                                <td>Vlasnik terena:</td>
                                                <td>{sessionStorage.username}</td>
                                                <td></td>
                                                </tr>
                                                <tr className="o-terenu-row">
                                                <td>Sportovi:</td>
                                                <td>
                                                    {sportNames.map((sport) => sport).join(', ')}
                                                </td>
                                                <td>
                                                    <AiOutlineEdit onClick={handleEditSportovi} />
                                                </td>
                                                </tr>
                                                <tr className="o-terenu-row">
                                                <td>Radno vrijeme:</td>
                                                <td>
                                                {formatWorkTime(work_time_begin)} - {formatWorkTime(work_time_end)}
                                                </td>
                                                <td>
                                                    <AiOutlineEdit onClick={handleEditRadnoVrijeme}/>
                                                </td>
                                                </tr>
                                                <tr className="o-terenu-row">
                                                <td>Radni dani:</td>
                                                <td>
                                                    {dayNames.map((day) => day).join(', ')}
                                                </td>
                                                <td>
                                                    <AiOutlineEdit  onClick={handleEditRadniDani}/>
                                                </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="col-md-4 col-sm-12 forms">
                        {showSportSelectionForm && (
                        <SportSelectionForm
                            sports={sports}sp
                            selectedSports={selectedSports}
                            setSelectedSports={setSelectedSports}
                            handleFormSubmit={handleSportFormSubmit}
                        />
                        )}
                        {showWorkingTimeSelectionForm && (
                        <WorkingTimeSelection
                            sportHall={sportHall}
                            workTimeBegin={workTimeBegin}
                            workTimeEnd={workTimeEnd}
                            setWorkTimeBegin={setWorkTimeBegin}
                            setWorkTimeEnd={setWorkTimeEnd}
                            handleFormSubmit={handleWorkTimeFormSubmit}
                        />
                        )}
                        {showWorkDaysSelectionForm && (
                        <WorkDaysSelection
                            sportHall={sportHall}
                            allDays={allDays}
                            handleFormSubmit={handleWorkDaysFormSubmit}
                            selectedWorkDays={selectedWorkDays}
                            setSelectedWorkDays={setSelectedWorkDays}
                        />
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyFieldDetails;
