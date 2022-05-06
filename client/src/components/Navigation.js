import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Form, Col} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import Auth from '../utils/auth.js'
import logo from '../assets/images/logo.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import Controller from '../assets/images/controller.png'


const Navigation = () => {

    const [ showModal, setShowModal ] = useState(false);

    return (
    <>
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="cool-gradient" >
                    <img 
                    src={logo}
                    />
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls='navbar' />
                <Navbar.Collapse id="navbar" className="col-4">
                <Nav className="ml-auto">
                    {Auth.loggedIn() ? (
                    <>
                    <Nav.Link as={Link} to='/profile' className="cool-gradient">Profile</Nav.Link>
                    <Nav.Link onClick={Auth.logout} className="cool-gradient">Logout</Nav.Link>
                    </>
                    ) : (
                    <Nav.Link onClick={() => setShowModal(true)} className="cool-gradient">Login/Sign Up</Nav.Link>
                    )} 
                </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal
        className="login-modal"
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
        >
        <Tab.Container defaultActiveKey='login'>
        <Modal.Header closeButton>
        <Modal.Title id='signup-modal'>
            <Nav variant="pills">
            <Nav.Item>
                <Nav.Link eventKey='login'>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
            </Nav.Item>
            </Nav>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tab.Content>
            <Tab.Pane eventKey='login'>
            <LoginForm handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
            <Tab.Pane eventKey='signup'>
            <SignUpForm handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
        </Tab.Content>
        </Modal.Body>
        </Tab.Container>
        </Modal>
    </>
    );
};

export default Navigation