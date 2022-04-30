import React, { useState } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Form, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Auth from '../utils/auth'

const Navigation = () => {

    const [searchInput, setSearchInput] = useState('');

    return (
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="cool-gradient" >
                    Video Games
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
                    <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </>
                    ) : (
                    <Nav.Link className="cool-gradient">Login/Sign Up</Nav.Link>
                    )} 
                </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation