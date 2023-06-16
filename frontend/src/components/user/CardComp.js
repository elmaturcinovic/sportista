import React, { useEffect, useState } from 'react';
import { useHistory, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import SingleCard from './SingleCard';

const CardComp = ({ sportHalls }) => {
  
  return (
    <Router>
      <div className="cards">
        {sportHalls.map((item) => (
          <SingleCard item={item}/>
        ))}
      </div>
    </Router>
  );
};

export default CardComp;
