import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
// import { bindActionCreators } from "redux";
// import { actionCreators } from "../store/action"
import { eventBusService } from '../services/event-bus.service.js';
import { socketService } from '../services/socket.service.js'
import { gameService } from '../services/game.service.js'
import { CanvasDraw } from '../cmps/canvas-draw';
import { CanvasGuess } from '../cmps/canvas-guess.jsx';
import { Timer } from '../cmps/timer.jsx';

export const DrawApp = () => {

    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { gameId, type } = useParams()
    const [isStart, setIsStart] = useState(false)
    const [game, setGame] = useState(null)
    const [word, setWord] = useState('')
    const [wordClass, setWordClass] = useState('')
    const [chosenWord, setChosenWord] = useState(null)
    const [isWon, setIsWon] = useState(false)
    const [attempt, setAttempt] = useState(3)
    const [isDisable, setIsDisable] = useState(false)
    var timeoutId = null


    useEffect(() => {
        socketService.emit('game-watch', gameId)
        addEventListenerByGame()

        socketService.on('player-leave', async () => {
            if (!isWon && attempt > 0) return
            eventBusService.emit('user-msg', { txt: 'Player Left - Game over', class: 'danger' })
            setTimeout(() => {
                navigate(`/start`);
            }, 3000);
        })

        socketService.on('player-won', () => {
            eventBusService.emit('user-msg', { txt: 'Player guess won', class: 'success' })
            setIsWon(true)
            setTimeout(() => {
                navigate(`/start`);
            }, 3000);
        })
        socketService.on('player-lost', () => {
            eventBusService.emit('user-msg', { txt: 'The other player run out all the attempts', class: 'danger' })
            setTimeout(() => {
                navigate(`/start`);
            }, 3000);
        })

        return () => {
            removeGame(gameId)
            socketService.off('player-leave')
            socketService.emit('player-leave')
            socketService.off('player-in')
            socketService.off('player-won')
            socketService.off('player-lost')
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
        if (isDisable) return
        eventBusService.emit('erase-drawing')
    }


    const onWordClick = (word) => {
        if (isDisable) return
        setChosenWord(word)
        if (word === game.word) {
            setIsDisable(true)
            setWordClass('success')
            setIsWon(isWon => true)
            socketService.emit('player-won', gameId)
            eventBusService.emit('user-msg', { txt: 'You WIN!', class: 'success' })
            setTimeout(() => {
                navigate('/start')
            }, 1000);
        } else {
            setWordClass('wrong')
            if (attempt === 1) {
                setIsDisable(true)
                eventBusService.emit('user-msg', { txt: 'You have run out of attempts', class: 'danger' })
                socketService.emit('player-lost', gameId)
                setAttempt(attempt => attempt - 1)
                setTimeout(() => {
                    navigate('/start')
                }, 3000);
            } else {
                eventBusService.emit('user-msg', { txt: 'Wrong..TRY AGAIN', class: 'danger' })
                setAttempt(attempt => attempt - 1)
            }
        }
        timeoutId = setTimeout(() => {
            clearTimeout(timeoutId)
            setWordClass('')
            setChosenWord(null)
        }, 3000);

    }

    const onTimesUp = () => {
        setIsDisable(true)
        eventBusService.emit('user-msg', { txt: 'Sorry, time is up', class: 'danger' })
        setTimeout(() => {
            navigate('/start')
        }, 3000);
    }

    if (!isStart) return (
        <section className="draw-app">
            <h2 className='wait-title'>Wait for another player to join you</h2>
        </section>
    )
    return (
        <section className="draw-app">
            {type === 'draw' ?
                <React.Fragment>
                    <div className='header'>
                        <h2 className='word-description'>Your word is <span>{game?.word}</span></h2>
                        <div className='timer-container'>
                            <Timer timesUp={onTimesUp} secondsAmount={60} />
                        </div>

                    </div>
                    <div className='canvas-container'>
                        <CanvasDraw isDrawer={true} />
                    </div>
                    <div className='actions'>
                        <button onClick={onEraseCanvas} className="delete">Clear canvas</button>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <div className='header'>
                        <h3 className='attempt'>
                            Attempts left: <span>{attempt}</span>
                        </h3>
                        <div className='timer-container'>
                            <Timer timesUp={onTimesUp} secondsAmount={60} />
                        </div>
                    </div>
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