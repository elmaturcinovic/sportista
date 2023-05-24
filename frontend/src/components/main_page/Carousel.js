import Carousel from 'react-bootstrap/Carousel';
import './carousel.css'

function CarouselComp() {
    return (
        <Carousel variant="dark" className="carousel">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={require("./images/car_image_1.jpg")}
                    alt="1"
                />
                <Carousel.Caption>
                    <p>Okupi ekipu i zabavi se!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={require("./images/car_image_2.jpg")}
                    alt="2"
                />
                <Carousel.Caption>
                    <p>Sa lakocom rezervisite termin!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={require("./images/car_image_3.jpg")}
                    alt="3"
                />
                <Carousel.Caption>
                    <p>Nemas ekipu? Upoznaj nove ljude i pridruzi im se!</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComp;