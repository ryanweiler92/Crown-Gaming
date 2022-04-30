import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import {Container, Col, Form, Button, Card, CardColumns} from 'react-bootstrap'
import {getSingleGame} from '../utils/API'


const SingleGame = (props) => {
    
    let data = useLocation();

    const [gameID, setGameID] = useState("")

    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        if(!data.state){
            console.log('wrong')
        } else {
        setGameID(data.state.gameID)
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
                const items  = await response.json()
                console.log(items)
                const gameData = items.map((game) => ({
                    name: game.name,
                    released: game.released,
                    image: game.background_image,
                    id: game.id,
                    metacritic: game.metacritic,
                    metacriticUrl: game.metacritic_url,
                    saturated_color: game.saturated_color,
                    parentPlatforms: game.parent_platforms,
                    playTime: game.playtime,
                    genres: game.genres,
                    description: game.description
                }))
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
        </>
    )

}

export default SingleGame