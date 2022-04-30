import React, { useState, useEffect } from 'react';
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import {mostPopularGames2022} from '../utils/API'
import SingleGame from './SingleGame'
import Display20 from '../components/Display20.js'
import { Link } from 'react-router-dom';

const Home = () => {
    
    //state for game searched from form
    const [searchedGames, setSearchedGames] = useState([]);

    //form search
    const [searchInput, setSearchInput] = useState('');

    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        const popular2022fetch = async () => {
            try {
                const response = await mostPopularGames2022();
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
                    parentPlatforms: game.parent_platforms
                }))
                setGameData(gameData)
            } catch (err) {
                console.error(err)
            }
        }

    popular2022fetch();
    }, [])
    

    const myFunction = () => {
        console.log(gameData)
    }


    //Getting the game data when the form submits
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    //     if (!searchInput) {
    //         return false;
    //     }

    //     try {
    //         const response = await searchGames(searchInput)

    //         if(!response.ok) {
    //             throw new Error('something went wrong!')
    //         }

    //         const  items  = await response.json();

    //         console.log(items)

    //         const gameData = items.map((game) => ({
    //             gameID: game.gameID,
    //             cheapestDealID: game.cheapestDealID,
    //             name: game.external,
    //             price: game.cheapest,
    //             picture: game.thumb
    //         }))
    //         setSearchedGames(gameData)
    //         setSearchInput('');
    //     } catch (err){
    //         console.error(err)
    //     }
    // };



    return (
        <>
        <Container>
            <h1>Search for Games!</h1>
            <Form >
                <Form.Row>
                    <Col xs={12} md={8}>
                        <Form.Control
                         name='searchInput'
                         value={searchInput}
                         onChange={(e) => setSearchInput(e.target.value)}
                         type='text'
                         size='lg'
                         placeholder='Search for a game'
                        />
                    </Col>
                </Form.Row>
            </Form>
        </Container>

        <Button className="btn-success" onClick={myFunction}>BUTTON MAN</Button>

        <Container className="mx-auto mt-4">
            <Display20 gameData={gameData} />
        </Container>
        </>
    )

}

export default Home