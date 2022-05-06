import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Dropdown, DropdownButton} from 'react-bootstrap'
import { mostPopularGames, keywordSearch } from '../utils/API'
import Display20 from '../components/Display20.js'


const Home = () => {
    
    const [gameData, setGameData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [year, setYear] = useState("Popular Games of 2022")

    useEffect(() => {
        const popular2022fetch = async () => {
            try {
                const response = await mostPopularGames("2022-01-01,2022-12-31");
                if (!response.ok) {
                    throw new Error('something went wrong!');
                }
                const items  = await response.json()
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
        }
    popular2022fetch();
    }, [])
    
    const handleKeywordSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await keywordSearch(searchInput);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const items  = await response.json()
            const games = items.results.map((game) => ({
                name: game.name,
                released: game.released,
                image: game.background_image,
                id: game.id,
                metacritic: game.metacritic,
                saturated_color: game.saturated_color,
                parentPlatforms: game.parent_platforms,
                screenshots: game.short_screenshots
            }))
            setGameData(games)
            setYear("")
        } catch (err) {
            console.error(err)
        }
        setSearchInput("")
    }

    const handleYearSubmit = async (event) => {
        try {
            const response = await mostPopularGames(event);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const items  = await response.json()
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
        setYear("Popular Games of " + event.substring(0, 4))
    }

    return (
        <>
        <Container className="mx-auto mt-4">
            <Row>
                <Col>
                    <Form onSubmit={handleKeywordSearch} className="w-75 game-search-form">
                            <div class="p-1 bg-light rounded rounded-pill shadow-sm">
                                <div class="input-group">
                                    <input type="search"
                                    name="searchInput"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Search for games" 
                                    aria-describedby="button-addon1" 
                                    className="form-control border-0 my-control" />
                                    <div class="input-group-append">
                                        <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search cool-gradient"></i></button>
                                    </div>
                                </div>
                            </div>
                    </Form>
                </Col>
                <Col className="d-flex justify-content-center">
                    <DropdownButton title="Search Popular Games by Year" onSelect={handleYearSubmit}>
                        <Dropdown.Item eventKey="2022-01-01,2022-12-31">2022</Dropdown.Item>
                        <Dropdown.Item eventKey="2021-01-01,2021-12-31">2021</Dropdown.Item>
                        <Dropdown.Item eventKey="2020-01-01,2020-12-31">2020</Dropdown.Item>
                        <Dropdown.Item eventKey="2019-01-01,2019-12-31">2019</Dropdown.Item>
                        <Dropdown.Item eventKey="2018-01-01,2018-12-31">2018</Dropdown.Item>
                        <Dropdown.Item eventKey="2017-01-01,2017-12-31">2017</Dropdown.Item>
                        <Dropdown.Item eventKey="2016-01-01,2016-12-31">2016</Dropdown.Item>
                        <Dropdown.Item eventKey="2015-01-01,2015-12-31">2015</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                <h1 className="text-center cool-white"> {year}</h1>
                </Col>
            </Row>
            <Row>

            </Row>
            <Display20 gameData={gameData} />
        </Container>
        </>
    )

}

export default Home