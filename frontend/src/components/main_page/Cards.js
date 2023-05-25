import Card from 'react-bootstrap/Card';
import {Button} from "react-bootstrap";

function CardComp() {
    return (
        <Card className="card">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Košarka - Dvorana 101</Card.Title>
                <Card.Text>
                    Najsavremeniji teren za kvalitetnu igru za vas tim!
                </Card.Text>
                <Button variant="primary">Rezervišite termin</Button>
            </Card.Body>
        </Card>
    );
}

export default CardComp;