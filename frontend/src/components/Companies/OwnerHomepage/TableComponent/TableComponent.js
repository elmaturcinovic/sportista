import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import useStyles from './styles'


const TableComponent = () => {
  const classes = useStyles();

  const handleDelete = (id) => {
    console.log(`Delete item with id ${id}!`);
  };

  const handleAddNewField = (id) => {
    console.log(`Added new field!`);
  };

  return (
    <div>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tableHeader}>
            <th className={classes.tableCell}>
            </th>
            <th className={classes.tableCell}>Naziv terena</th>
            <th className={classes.tableCell}>Lokacija</th>
            <th className={classes.tableCell}>Status</th>
            <th className={classes.tableCell}>Cijena</th>
            <th>
            <button
              className={`${classes.addButton} ${classes.greenButton}`}
              onClick={handleAddNewField}
            >
                Dodaj
                <FontAwesomeIcon icon={faPlus} className={classes.buttonIcon} />
             </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.tableCell}>
              <img
                src="./teren2.jpg"
                alt="Terrain"
                className={classes.tableImage}
              />
            </td>
            <td className={classes.tableCell}>Vistafon</td>
            <td className={classes.tableCell}>Otoka 26</td>
            <td className={classes.tableCell}>slobodan</td>
            <td className={classes.tableCell}>40KM</td>
            <td>
                <button
                  className={`${classes.deleteButton} ${classes.redButton}`}
                  onClick={() => handleDelete(1)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className={classes.buttonIcon} />
                </button>
            </td>
          </tr>
          <tr>
            <td className={classes.tableCell}>
              <img
                src="./teren1.jpg"
                alt="Terrain"
                className={classes.tableImage}
              />
            </td>
            <td className={classes.tableCell}>Grbavica</td>
            <td className={classes.tableCell}>Grbavicka 54</td>
            <td className={classes.tableCell}>zauzet</td>
            <td className={classes.tableCell}>150KM</td>
            <td>
                <button
                  className={`${classes.deleteButton} ${classes.redButton}`}
                  onClick={() => handleDelete(1)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className={classes.buttonIcon} />
                </button>
            </td>
          </tr>
          <tr>
            <td className={classes.tableCell}>
              <img
                src="./teren1.jpg"
                alt="Terrain"
                className={classes.tableImage}
              />
            </td>
            <td className={classes.tableCell}>La Bombonjera</td>
            <td className={classes.tableCell}>Zmaja od Bosne 10</td>
            <td className={classes.tableCell}>slobodan</td>
            <td className={classes.tableCell}>80KM</td>
            <td>
                <button
                  className={`${classes.deleteButton} ${classes.redButton}`}
                  onClick={() => handleDelete(1)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className={classes.buttonIcon} />
                </button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
