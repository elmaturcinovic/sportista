import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation_bar.css'

class NavigationBar extends Component {
    render() {
        return (
            <div id="div-nav">
                <>
                    <Navbar bg="#3DD47A" variant="light" >
                        <Container>
                            <Navbar.Brand href="#home" className="nav-logo">Sportista</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="#pocetna" id="nav-button"> Pocetna </Nav.Link>
                                <Nav.Link href="#profil_usera" id="nav-button"> Moj profil </Nav.Link>
                                <Nav.Link href="#autori" id="nav-button"> Autori projekta </Nav.Link>
                                <Nav.Link href="#odjava" id="nav-button"> Odjavi se </Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            </div>
        );
    }
}

export default NavigationBar;