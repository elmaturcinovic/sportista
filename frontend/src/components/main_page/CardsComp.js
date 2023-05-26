import Card from 'react-bootstrap/Card';
import {Button} from "react-bootstrap";
import './cards.css'

function CardComp() {
    return (
        <Card className="card">
            <Card.Img variant="top" src={require("./images/card_image_5.jpg")}/>
            <Card.Body className="card-body">
                <Card.Title>Dvorana 01 Pofalići</Card.Title>
                <Card.Text>
                    Najsavremeniji fudbalski teren u gradu!
                </Card.Text>
                <Button id="button-card">Rezervišite termin</Button>
            </Card.Body>
        </Card>
    );
}

export default CardComp;