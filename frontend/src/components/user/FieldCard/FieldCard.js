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
        <Card.Title>Vistafon</Card.Title>
        <Card.Text>
          <FaPhone className={classes.icon} />
          <span>+387 61 186 780</span>
        </Card.Text>
        <Card.Text>
          <FaEnvelope className={classes.icon} />
          <span>vistafon@gmail.com</span>
        </Card.Text>
        <Card.Text>
          <FaMapMarker className={classes.icon} />
          <span>Salke Lagumdzije 14</span>
        </Card.Text>
        <Card.Text>
          <FaMoneyBill className={classes.icon} />
          <span>100KM</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FieldCard;
