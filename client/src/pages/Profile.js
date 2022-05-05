import React, { useState, useEffect, useMemo } from 'react';
import {Container, Col, Row, Form, Button, Card, CardColumns, Dropdown, DropdownButton} from 'react-bootstrap'
import ProfileCards from '../components/ProfileCards'
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries'
import { Link } from 'react-router-dom';

const Profile = () => {

    const { data: userDataMe } = useQuery(GET_ME);
    const user = userDataMe?.me
    const wishList = user?.wishListGames
    const favoriteGames = user?.favoriteGames

    const [currentListName, setCurrentListName] = useState("Wish List")
    const [currentList, setCurrentList] = useState(wishList)

    useMemo(()=> {
        setCurrentList(wishList)
    }, [wishList])

    const changeList = async (event) => {
        setCurrentListName(event);

        if(event === "Favorite List"){
            setCurrentList(favoriteGames)
        } else {
            setCurrentList(wishList)
        }
    }
    const myFunction = () => {
        console.log(user)
        console.log(wishList)
        console.log(currentList)
    }

    return (
        <>
            <button onClick={myFunction}>Show Me GRAPHQL USER DATA</button>
        <Container>
            <Row className="d-flex justify-content-center">
                <h2 className="text-center cool-white">Viewing {user?.username}'s {currentListName}</h2>
            </Row>
            <Row className="d-flex justify-content-center">
                <DropdownButton title="Select List" onSelect={changeList}>
                    <Dropdown.Item eventKey="Favorite List">Favorite List</Dropdown.Item>
                    <Dropdown.Item eventKey="Wish List">Wish List</Dropdown.Item>
                </DropdownButton>
            </Row>
        </Container>
        <Container>
            <Row>
        
        {currentList?.map((game) => {
            return (
        <Col key={game.id} className="col-md-4 col-lg-3 col-xl-3 mt-4">
            <Card  className="single-deal-card h-100">
                <img src={game.background_image} className="card-img-top display20-img" />
                <Card.Body>
                    <Row>
                        <Col className="col-lg-12 mx-auto">
                            <h5 className="text-center">{game.name}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-12 mx-auto">
                            <h6 className="text-center text-muted">Release Date: {game.released}</h6>
                        </Col>
                    </Row>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-center">{game.platforms?.map((platform) => {
                        if(platform === 'PlayStation') return (<i className="fa-brands fa-playstation fa-lg"></i>)
                        else if (platform === 'Xbox') return (<i className="fa-brands fa-xbox fa-lg"></i>)
                        else if (platform === 'Nintendo') return (<i className="fab fa-nintendo-switch fa-lg"></i>)  
                        else if (platform === 'PC') return (<i className="fa-solid fa-desktop fa-lg"></i>)})} </li>
                        <li className="list-group-item">Metacritic Rating: {game.metacritic} </li>
                    </ul>
                    <Row className="d-flex align-items-center justify-content-center">
                    <Link 
                    to={{
                        pathname: "/game",
                        state: { gameID: game.id,
                                screenshots: game.screenshots}
                    }}
                    >
                    <button as={Link} to='/game' className="view-game-btn"><i className="fa-solid fa-gamepad"></i> View Game</button>
                    </Link>
                    </Row>
                    {/* <Row className="d-flex align-items-center justify-content-center mt-2">
                        <button className="view-game-btn"><i class="fa fa-list"></i> + Wishlist</button>
                    </Row>
                    <Row className="d-flex align-items-center justify-content-center mt-2">
                        <button className="view-game-btn"><i class="fa-solid fa-heart-circle-check"></i> Add Favorite</button>
                    </Row> */}
                </Card.Body>
            </Card>
        </Col>
                    )
                })}
    </Row>
    </Container>
        </>
    )
};


export default Profile