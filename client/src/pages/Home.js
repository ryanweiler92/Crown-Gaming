import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import {mostPopularGames2022} from '../utils/API'
import SingleGame from './SingleGame'
import Display20 from '../components/Display20.js'
import { Link } from 'react-router-dom';

const Home = () => {
    
    //state for game searched from form
    const [searchedGames, setSearchedGames] = useState([]);


    const [gameData, setGameData] = useState([]);

    const [year, setYear] = useState("2022")

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

    return (
        <>

        <Button className="btn-success" onClick={myFunction}>BUTTON MAN</Button>

        <Container className="mx-auto mt-4">
            <Row>
                <Col>
                <h1 className="text-center cool-gradient">Popular Games of 2022</h1>
                </Col>
            </Row>
            <Display20 gameData={gameData} />
        </Container>
        </>
    )

}

export default Home