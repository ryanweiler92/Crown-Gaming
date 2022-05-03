import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Popover, ListGroup, OverlayTrigger} from 'react-bootstrap';
import github from '../assets/images/github.png'
import logo from '../assets/images/logo.png'
import linkedin from '../assets/images/linkedin.png'


const Footer = () => {

    return (
        <footer className="footer container-fluid">
            <Row className="d-flex justify-content-center align-items-center mt-3">
                <Col className="align-items-center text-center">
                    <p> <a href="https://www.linkedin.com/in/ryanweiler92/" target="_blank">
                    <img 
                    src={linkedin}
                    className="linkedin-logo"
                    />
                    </a></p>
                </Col>
                <Col className="align-items-center text-center">
                    <img 
                        src={logo}
                        className="footer-logo"
                    />
                </Col>
                <Col className="align-items-center text-center">
                    <p><a href="https://github.com/ryanweiler92/Video-Game-Deal-Finder" target="_blank">
                        <img className="github-img"
                            src={github}
                            alt="github"
                        />
                        </a></p>
                </Col>
            </Row>
        </footer>
    )
};

export default Footer