import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Form, Col} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Auth from '../utils/auth.js'
import logo from '../assets/images/logo.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { keywordSearch } from '../utils/API'


const Navigation = () => {

    let history = useHistory()
    const [searchInput, setSearchInput] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    const [gameData, setGameData] = useState([])
    const [pageChange, setPageChange] = useState(false)

    const handleKeywordSearch = async (event) => {
        event.preventDefault();
        console.log(event)

        try {
            const response = await keywordSearch(searchInput);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const items  = await response.json()
            console.log(items)
            const gameData = items.results.map((game) => ({
                name: game.name,
                released: game.released,
                image: game.background_image,
                id: game.id,
                metacritic: game.metacritic,
                saturated_color: game.saturated_color,
                parentPlatforms: game.parent_platforms,
                screenshots: game.short_screenshots
            }))
            setGameData(gameData)
        } catch (err) {
            console.error(err)
        }
        setSearchInput("")
        history.push({
            pathname: "/results", 
            state: {gameData}
        })
    }

    useEffect(() => {

        history.push("/results")

    }, [pageChange])

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
                <Form onSubmit={handleKeywordSearch} className="w-50 game-search-form">
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