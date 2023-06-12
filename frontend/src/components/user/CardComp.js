import React from 'react';
import {useHistory} from "react-router-dom/cjs/react-router-dom";

const CardComp = () => {

    /* Kad se upload-ju podaci
import React from "react";
const CardComp = ({ data }) => {
  return (
    <div className="cards">
      {data.map((item) => (
        <div key={item.id} className="one-card">
          <img
            id="company-image-card"
            src={require("./test-card-image.jpg")}
            alt="Slika dvorane"
          />
          <h2 id="company-name-card">{item.name}</h2>
          <h5 id="company-address-card">{item.address}</h5>
          <button className="button-card" onClick={handleCard}>
            Klik za više detalja
          </button>
        </div>
      ))}
    </div>
  );
};
export default CardComp;
*/

    const divData = [
        { id: 1, name: 'Dvorana 101', address: "Main street NU1231"},
        { id: 2, name: 'Dvorana 102', address: "Main street NU1232"},
        { id: 3, name: 'Dvorana 103', address: "Main street NU1233"},
        { id: 4, name: 'Dvorana 104', address: "Main street NU1234"},
        { id: 5, name: 'Dvorana 105', address: "Main street NU1235"},
        { id: 6, name: 'Dvorana 106', address: "Main street NU1236"},
        { id: 7, name: 'Dvorana 107', address: "Main street NU1237"},
        { id: 8, name: 'Dvorana 108', address: "Main street NU1238"},
    ];


    const history = useHistory();
    const handleCard = () => {
        history.push('/field-detail');
    };

    return (
        <div className="cards">
            {divData.map((item) => (
                <div key={item.id} className="one-card">
                    <img id="company-image-card" src={require("./test-card-image.jpg")} alt="Slika dvorane"/>
                    <h2 id="company-name-card">{item.name}</h2>
                    <h5 id="company-address-card">{item.address}</h5>
                    <button className="button-card" onClick={handleCard}>Klik za više detalja</button>
                </div>
            ))}
        </div>
    );
};

export default CardComp;
