import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Carousel} from 'react-bootstrap'
import  steam  from '../assets/images/steam.png'
import  gog  from '../assets/images/gog.png'
import  epicGames  from '../assets/images/epic-games.png'
import  playstationStore  from '../assets/images/playstation-store.png'
import  xboxStore  from '../assets/images/xbox-store.png'
import  nintendo  from '../assets/images/nintendo.png'
import { useMutation } from '@apollo/client';
import { SAVE_WISH_LIST_GAME, SAVE_FAVORITE_GAME } from '../utils/mutations'
import Auth from '../utils/auth'

export default function Display1(props){

    const [gameData, setGameData] = useState([]);

    const [screenshots, setScreenshots] = useState([]);

    const [saveWishList] = useMutation(SAVE_WISH_LIST_GAME)

    const [saveFavoriteGame] = useMutation(SAVE_FAVORITE_GAME)

    useEffect(() => {
        if(!props.gameData){
            console.log('wrong')
        } else {
        setGameData(props.gameData)
        setScreenshots(props.screenshots)
        }
    }, [props])

    
    const handleSaveWishList = async (gameData) => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false
        };

        try {
            const response = await saveWishList({
                variables: {
                    id: gameData.id,
                    name: gameData.name,
                    description: gameData.description_raw,
                    background_image: gameData.background_image,
                    metacritic: gameData.metacritic,
                    playTime: gameData.playtime,
                    released: gameData.released,
                    genres: [...gameData.genres?.map((genre) => {
                       return (genre.name)
                    })],
                    screenshots: [...screenshots?.map((screenshot) => {
                        return (screenshot.image)
                    })],
                    tags: [...gameData.tags?.map((tag) => {
                        return (tag.name)
                    })],
                    developers: [...gameData.developers?.map((developer) => {
                        return (developer.name)
                    })],
                    platforms: [...gameData.parent_platforms?.map((platform) => {
                        return (platform.platform.name)
                    })],
                    stores: [...gameData.stores?.map((store) => {
                        return (store.store.name)
                    })]
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            console.error(err)
        }
    }

    const handleSaveFavoriteGame = async (gameData) => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false
        };

        try {
            const response = await saveFavoriteGame({
                variables: {
                    id: gameData.id,
                    name: gameData.name,
                    description: gameData.description_raw,
                    background_image: gameData.background_image,
                    metacritic: gameData.metacritic,
                    playTime: gameData.playtime,
                    released: gameData.released,
                    genres: [...gameData.genres?.map((genre) => {
                       return (genre.name)
                    })],
                    screenshots: [...screenshots?.map((screenshot) => {
                        return (screenshot.image)
                    })],
                    tags: [...gameData.tags?.map((tag) => {
                        return (tag.name)
                    })],
                    developers: [...gameData.developers?.map((developer) => {
                        return (developer.name)
                    })],
                    platforms: [...gameData.parent_platforms?.map((platform) => {
                        return (platform.platform.name)
                    })],
                    stores: [...gameData.stores?.map((store) => {
                        return (store.store.name)
                    })]
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <>
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
                        {!gameData.metacritic ? 'N/A' : 
                             gameData.metacritic > 80 ? <p className="good">{gameData.metacritic}</p> : 
                             gameData.metacritic > 60 ? <p className="ok">{gameData.metacritic}</p> :
                             <p className="bad">{gameData.metacritic}</p>}
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
                <Row className="d-flex justify-content-around">
                    <button className="view-game-btn single-game-view-btn" onClick={() => handleSaveWishList(gameData)}><i class="fa fa-list"></i> + Wishlist</button>
                    <button className="view-game-btn single-game-view-btn" onClick={() => handleSaveFavoriteGame(gameData)}><i class="fa-solid fa-heart-circle-check"></i> Add Favorite</button>
                </Row>
                <Row className="d-flex justify-content-center mt-2">
                    <h3>Available in the following stores:</h3>
                </Row>
                <Row className="d-flex justify-content-center mt-2">
                         
                             {gameData.stores?.map((store) => {
                                 if (store.store.name === 'itch.io' || store.store.name === 'Google Play' ||
                                  store.store.name === 'Xbox 360 Store' || store.store.name === 'App Store'){
                                  return (null)} else return (
                                    <Col className="d-flex justify-content-center">
                                    <a href={`https://www.${store.store.domain}`} target="_blank">
                                     <p>
                                         {store.store.name}
                                         <img 
                                         className="store-img"
                                         src={(store.store.name === 'Steam' ? steam : 
                                         store.store.name === 'PlayStation Store' ? playstationStore : 
                                         store.store.name === 'Xbox Store' ? xboxStore :
                                         store.store.name === 'GOG' ? gog :
                                         store.store.name === 'Nintendo Store' ?  nintendo :
                                         store.store.name === 'Epic Games' ? epicGames :
                                         null )}
                                         />
                                         </p>
                                    </a>
                                    </Col>
                                  )
                                 
                             })}
                         
                </Row>
            </Container>
        </Container>
        </>
    )
}