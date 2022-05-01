import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Display1(props){
    console.log(props)

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
        console.log(props.gameData)
        console.log(gameData)
        console.log(screenshots)
    }



    return(
        <>
        <button onClick={myFunction}>Button Man</button>
        </>
    )
}