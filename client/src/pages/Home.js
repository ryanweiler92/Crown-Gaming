import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns, Dropdown, DropdownButton} from 'react-bootstrap'
import {mostPopularGames2022} from '../utils/API'
import SingleGame from './SingleGame'
import Display20 from '../components/Display20.js'
import { Link } from 'react-router-dom';

const Home = () => {
    

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
                <h1 className="text-center cool-white">Popular Games of {year}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <DropdownButton title="Search by Year">
                        <Dropdown.Item value="2021-01-01,2021-12-31">2021</Dropdown.Item>
                        <Dropdown.Item value="2020-01-01,2020-12-31">2020</Dropdown.Item>
                        <Dropdown.Item value="2019-01-01,2019-12-31">2019</Dropdown.Item>
                        <Dropdown.Item value="2018-01-01,2018-12-31">2018</Dropdown.Item>
                        <Dropdown.Item value="2017-01-01,2017-12-31">2017</Dropdown.Item>
                        <Dropdown.Item value="2016-01-01,2016-12-31">2016</Dropdown.Item>
                        <Dropdown.Item value="2015-01-01,2015-12-31">2015</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Display20 gameData={gameData} />
        </Container>
        </>
    )

}

export default Home