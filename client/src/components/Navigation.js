import React, { useState } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Form, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Auth from '../utils/auth.js'
import logo from '../assets/images/logo.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'


const Navigation = () => {

    const [searchInput, setSearchInput] = useState('');
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
                <Navbar.Collapse id="navbar">
                <Form action="" className="w-50 game-search-form">
                    <div class="p-1 bg-light rounded rounded-pill shadow-sm">
                        <div class="input-group">
                            <input type="search"
                            name="searchInput"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search for games" 
                            aria-describedby="button-addon1" 
                            className="form-control border-0" />
                            <div class="input-group-append">
                                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search cool-gradient"></i></button>
                            </div>
                        </div>
                    </div>
                </Form>
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