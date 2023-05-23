import React from 'react';
import useStyles from './styles'

const Profile = () => {
const classes = useStyles()
  const field = {
    name: 'ABC Football Field',
    description: 'A well-maintained football field for all skill levels.',
    address: '123 Main Street, City',
    price: '$20 per hour',
    amenities: ['Lockers', 'Restrooms', 'Parking'],
    ratings: {
      average: 4.5,
      total: 25,
    },
    schedule: [
      { day: 'Monday', available: true },
      { day: 'Tuesday', available: false },
      { day: 'Wednesday', available: true },
      { day: 'Thursday', available: true },
      { day: 'Friday', available: true },
      { day: 'Saturday', available: true },
      { day: 'Sunday', available: false },
    ],
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.coverImage}
      />

      <h4>{field.name}</h4>
      <p>{field.description}</p>

      <div>
        <h6>Details</h6>
        <p>
          <strong>Address:</strong> {field.address}
        </p>
        <p>
          <strong>Price:</strong> {field.price}
        </p>
      </div>

      <div>
        <h6>Amenities</h6>
        <ul>
          {field.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>

      <div>
        <h6>Ratings</h6>
        <p>
          <strong>Average Rating:</strong> {field.ratings.average}
        </p>
        <p>
          <strong>Total Ratings:</strong> {field.ratings.total}
        </p>
      </div>

      <div>
        <h6>Schedule</h6>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {field.schedule.map((slot, index) => (
              <tr key={index}>
                <td>{slot.day}</td>
                <td>{slot.available ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
