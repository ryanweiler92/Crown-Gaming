import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import {getSingleGame} from '../utils/API'
import Display1 from '../components/Display1.js'
 


const SingleGame = () => {
    
    let data = useLocation();

    const [gameID, setGameID] = useState("")

    const [gameData, setGameData] = useState([]);

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


    return (
        <>
        <Display1 gameData={gameData} screenshots={screenshots} />
        </>
    )

}

export default SingleGame