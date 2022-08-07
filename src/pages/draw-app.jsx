import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
// import { bindActionCreators } from "redux";
// import { actionCreators } from "../store/action"
import { eventBusService } from '../services/event-bus.service.js';
import { socketService } from '../services/socket.service.js'
import { gameService } from '../services/game.service.js'
import { CanvasDraw } from '../cmps/canvas-draw';
import { CanvasGuess } from '../cmps/canvas-guess.jsx';
import { useForm } from "../hooks/useForm"



export const DrawApp = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { gameId, type } = useParams()
    const dispatch = useDispatch()
    // const isGameDone = useSelector((state) => state.isGameDone)
    // const { setGameDone } = bindActionCreators(actionCreators, dispatch)

    const [isStart, setIsStart] = useState(false)
    const [game, setGame] = useState(null)
    const [word, setWord] = useState('')
    const [wordClass, setWordClass] = useState('')
    const [chosenWord, setChosenWord] = useState(null)
    var timeoutId = null


    useEffect(() => {

        socketService.emit('game-watch', gameId)

        addEventListenerByGame()

        socketService.on('player-leave', async () => {
            eventBusService.emit('user-msg', { txt: 'Player Left - Game over', class: 'danger' })
            setTimeout(() => {
                navigate(`/start`);
            }, 3000);
        })

        socketService.on('player-won', () => {
            eventBusService.emit('user-msg', { txt: 'Player guess won', class: 'success' })
            setTimeout(() => {
                navigate(`/start`);
            }, 1000);

        })

        return () => {
            removeGame(gameId)
            socketService.off('player-leave')
            socketService.emit('player-leave')
            socketService.off('player-in')
            socketService.off('player-won')
            clearTimeout(timeoutId)
        }
    }, [navigate]);

    const removeGame = async () => {
        await gameService.removeGame(gameId)
    }

    const addEventListenerByGame = async () => {
        const newGame = await gameService.getGameById(gameId)
        if (newGame.players.length < 2) {
            socketService.on('player-in', async () => {
                startGame()
            })
        } else {
            socketService.emit('player-in', gameId)
            startGame()
        }
        setGame(newGame)
    }

    const startGame = () => {
        setIsStart(true)
    }

    const onEraseCanvas = () => {
        eventBusService.emit('erase-drawing')
    }

    const updateWordGuess = (value) => {
        if (!game) return
        setWord(value.word)

    }

    const onWordClick = (word) => {
        setChosenWord(word)

        if (word === game.word) {
            setWordClass('success')
            socketService.emit('player-won', gameId)
            eventBusService.emit('user-msg', { txt: 'You WIN!', class: 'success' })
            setTimeout(() => {
                navigate('/start')
            }, 1000);
        } else {
            setWordClass('wrong')
            eventBusService.emit('user-msg', { txt: 'Wrong..TRY AGAIN', class: 'danger' })
        }
        timeoutId = setTimeout(() => {
            clearTimeout(timeoutId)
            setWordClass('')
            setChosenWord(null)
        }, 1000);

    }

    if (!isStart) return (
        <section className="draw-app">
            <h2 className='wait-title'>WAIT UNTIL PLAYER TO JOIN YOU</h2>
        </section>
    )
    return (
        <section className="draw-app">
            {type === 'draw' ?
                <React.Fragment>
                    <h2 className='word-description'>Your word is <span>{game?.word}</span></h2>
                    <div className='canvas-container'>
                        <CanvasDraw isDrawer={true} />
                    </div>
                    <div className='actions'>
                        <button onClick={onEraseCanvas} className="delete">Erase</button>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <div className='canvas-container'>
                        <CanvasGuess isDrawer={true} />
                    </div>
                    <ul className='word-list clean-list'>
                        {game.words.map((word) => {
                            return <li className={chosenWord === word.txt ? wordClass : ''} key={word.id} onClick={() => onWordClick(word.txt)}>
                                {word.txt}
                            </li>
                        })}
                    </ul>
                </React.Fragment>
            }

        </section >
    )
} 