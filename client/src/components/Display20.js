import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'

export default function Dispaly20(props){
    console.log(props)
    return (
    <Row>
        {props.gameData?.map((game) => {
            return (
        <Col key={game.id}>
            <Card  className="single-deal-card">
                <img src={game.image} className="card-img-top" />
                <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Release Date: {game.released}</Card.Subtitle>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Platforms: {game.parentPlatforms?.map((platform) => {
                        return (<> {platform.platform.name} </>)})} </li>
                        <li className="list-group-item">Steam Rating: % Steam Rating Count: </li>
                        <li className="list-group-item">Metacritic Rating: </li>
                    </ul>
                </Card.Body>
            </Card>
        </Col>
                    )
                })}
    </Row>
    )
}