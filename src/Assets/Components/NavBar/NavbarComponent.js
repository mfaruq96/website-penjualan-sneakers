import React from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMediaQuery } from "react-responsive";
import "../FontawsomeIcons/Font"
import Navbar from 'react-bootstrap/Navbar';
import "../NavBar/NavbarComponent.css"
import arrow from "../../Img/arrow-right-to-bracket-solid.svg"

export const NavbarComponent = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 426px)" });

    return (
        <div>
            <div className='Navbar container nav-footer-bg mb-4'>
            <div className='box1'></div>
                <Navbar className='nav-footer-bg' expand="md">
                    <Container fluid>
                        <Navbar.Brand href="#">HOME</Navbar.Brand>
                        {/* <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-md-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                            </Nav> */}
                            <div>
                                {isMobile ? (
                                    <Button className='buttonSearch' variant="outline-primary">LOGIN</Button>
                                ) : (
                                    <Button className='buttonSearch' variant="outline-primary"><img className='imageButton' src={arrow}
                                    width={20}>
                                </img> LOGIN</Button>    
                                )}
                            </div>
                            {/* <Button className='buttonSearch' variant="outline-primary"><img className='imageButton' src={arrow}
                                width={20}>
                            </img> LOGIN</Button> */}
                        {/* </Navbar.Collapse> */}
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}
