import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'

export default function Dispaly20(props){
    console.log(props)
    return (
    <Row>
        {props.gameData?.map((game) => {
            return (
        <Col key={game.id} className="col-md-4 col-lg-3 col-xl-3 mt-4">
            <Card  className="single-deal-card h-100">
                <img src={game.image} className="card-img-top display20-img" />
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
                        <li className="list-group-item text-center">{game.parentPlatforms?.map((platform) => {
                        if(platform.platform.name === 'PlayStation') return (<i className="fa-brands fa-playstation fa-lg"></i>)
                        else if (platform.platform.name === 'Xbox') return (<i className="fa-brands fa-xbox fa-lg"></i>)
                        else if (platform.platform.name === 'Nintendo') return (<i className="fab fa-nintendo-switch fa-lg"></i>)  
                        else return (<i className="fa-solid fa-desktop fa-lg"></i>)})} </li>
                        <li className="list-group-item">Metacritic Rating: {game.metacritic} </li>
                    </ul>
                    <Row className="d-flex align-items-center justify-content-center">
                    <button className="view-game-btn"><i className="fa-solid fa-gamepad"></i> View Game</button>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
                    )
                })}
    </Row>
    )
}