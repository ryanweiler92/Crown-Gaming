import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, Carousel, CardColumns} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Display1(props){

    const [gameData, setGameData] = useState([]);

    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        if(!props.gameData){
            console.log('wrong')
        } else {
        setGameData(props.gameData)
        setScreenshots(props.screenshots)
        }
    }, [props])



    const myFunction = () => {
        console.log(gameData)
        console.log(screenshots)
        console.log(gameData.parentPlatforms)
    }



    return(
        <>
        <button onClick={myFunction}>Button Man</button>
        <Container className="display1-container">
            <Container className="display1-title-carousel-container">
            <Row className="d-flex align-items-center justify-content-center display1-header">
                <h1 className="cool-white">{gameData.name}</h1> 
                {gameData.parent_platforms?.map((platform) => {
                        if(platform.platform.name === 'PlayStation') return (<i className="fa-brands fa-playstation fa-lg"></i>)
                        else if (platform.platform.name === 'Xbox') return (<i className="fa-brands fa-xbox fa-lg"></i>)
                        else if (platform.platform.name === 'Nintendo') return (<i className="fab fa-nintendo-switch fa-lg"></i>)  
                        else return (<i className="fa-solid fa-desktop fa-lg"></i>)})}
            </Row>
            <Row className="d-flex align-items-center justify-content-center">
                <Carousel fade>
                {screenshots?.map((screenshot) => {
                    return (
                        <Carousel.Item>
                            <img
                            className="d-block w-100 h-100 display1-carousel-img"
                            src={screenshot.image}
                            />
                        </Carousel.Item>
                    )
                })}
                </Carousel>
            </Row>
            </Container>
            <Container className="display1-content-container mt-2">
            <img 
            className="display1-bg-img"
            src={gameData.background_image}
            />
                <Row>
                    <Col>
                        <Row className="d-flex justify-content-center">
                            <h4 className="cool-white">Description</h4>
                        </Row>
                        <Row>
                            <p className="cool-white pl-2">{gameData.description_raw}</p>
                        </Row>
                    </Col>
                    <Col className="d1-attributes">
                        <Row> 
                            
                            <p className="cool-white pr-3 font-weight-bold"> Genres: </p>
                            {gameData.genres?.map((genre) => {
                                return (
                                    <p className="cool-white d1-genre">{genre.name}</p>
                                )
                            })}
                            
                        </Row>
                        <Row>
                            <p className="font-weight-bold pr-3">Developer Studio: </p>
                            <p className="pr-3">{gameData.developers?.map((dev) => {
                                return (
                                    dev.name
                                )
                            })}</p>
                        </Row>
                        <Row className="row-height-adjust">
                        <p className="font-weight-bold pr-3">Metacritic Rating:</p>
                        <p>{!gameData.metacritic ? 'N/A' : 
                             gameData.metacritic > 80 ? <p className="good">{gameData.metacritic}</p> : 
                             gameData.metacritic > 60 ? <p className="ok">{gameData.metacritic}</p> :
                             <p className="bad">{gameData.metacritic}</p>}</p>
                        </Row>
                        <Row>
                            <p className="font-weight-bold pr-3">Average Playtime:</p>
                            <p>{!gameData.playtime ? 'N/A' : `${gameData.playtime} hours`}</p>
                        </Row>
                        <Row>
                            <p className="font-weight-bold pr-3">Released:</p>
                            <p>{!gameData.released ? 'N/A' : `${gameData.released}`}</p>
                        </Row>
                        <Row>
                        <p className="font-weight-bold pr-3">Tags:</p>
                        <p className="d1-tags">{gameData.tags?.slice(0, 3).map((tag, index) => {
                            if(index == 2){
                                return `${tag.name}`
                            } else {
                                return `${tag.name}, `
                            }                         
                         })} </p>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
        </>
    )
}