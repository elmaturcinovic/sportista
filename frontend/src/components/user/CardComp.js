import React, { useEffect, useState } from 'react';
import { useHistory, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import SingleCard from './SingleCard';

const CardComp = ({ sportHalls }) => {
  
  return (
    <div>
      <div className="cards">
        {sportHalls.map((item) => (
          <SingleCard item={item}/>
        ))}
      </div>
    </div>
  );
};

export default CardComp;
