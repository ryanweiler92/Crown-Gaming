import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import {getSingleGame} from '../utils/API'
import Display1 from '../components/Display1.js'
 


const SingleGame = (props) => {
    
    let data = useLocation();

    const [gameID, setGameID] = useState("")

    const [gameData, setGameData] = useState([]);

    //screenshots are not available in single game query for some reason
    //bringing them over from the popular games query
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        if(!data.state){
            console.log('wrong')
        } else {
        setGameID(data.state.gameID)
        setScreenshots(data.state.screenshots)
        }
    }, [])

    useEffect(() => {
        const fetchSingleGame = async (gameID) => {
            try{
                console.log(gameID + " This is the game ID")
                const response = await getSingleGame(gameID);
                if (!response.ok) {
                    throw new Error('something went wrong!');
                }
                const gameData  = await response.json()
                console.log(gameData)
                setGameData(gameData)
            } catch (err) {
                console.error(err)
            }
        }
        fetchSingleGame(gameID)
    }, [gameID])



    const myFunction = () => {
        console.log(data.state)
        console.log(gameID)
        console.log(gameData)
    }





    return (
        <>
        <button onClick={myFunction}>Button Man</button>
        <Display1 gameData={gameData} screenshots={screenshots} />
        </>
    )

}

export default SingleGame