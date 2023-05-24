import React from 'react';
import { Card } from 'react-bootstrap';
import useStyles from './styles'
import { FaEnvelope, FaPhone, FaMapMarker, FaMoneyBill } from 'react-icons/fa';

const FieldCard = () => {
    const classes = useStyles()
  return (
    <Card className={classes.myCard}>
      <img alt='field' src="./teren1.png" className={classes.fieldImage}/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          <FaPhone className={classes.icon} />
          <span>123-456-7890</span>
        </Card.Text>
        <Card.Text>
          <FaEnvelope className={classes.icon} />
          <span>example@example.com</span>
        </Card.Text>
        <Card.Text>
          <FaMapMarker className={classes.icon} />
          <span>123 Address Street, City, Country</span>
        </Card.Text>
        <Card.Text>
          <FaMoneyBill className={classes.icon} />
          <span>$100</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FieldCard;
