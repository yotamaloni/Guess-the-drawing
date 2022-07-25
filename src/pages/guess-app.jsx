import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { eventBusService } from '../services/event-bus.service.js';
import { socketService } from '../services/socket.service.js'
import { gameService } from '../services/game.service.js'
import { CanvasGuess } from '../cmps/canvas-guess';
import { ClearCanvasButton } from '../cmps/clear-canvas-button';


export const GuessApp = () => {

    const { gameId } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        socketService.emit('game-watch', gameId)
        addEventListenerByGame()
        socketService.on('player-leave', async () => {
            console.log('PLAYER LEFT!!');
            // await gameService.removeGame(gameId)
            navigate(`/`);
        })
        return () => {
            socketService.emit('player-leave')
            socketService.off('player-in')
            socketService.off('player-leave')
        }
    }, []);

    const addEventListenerByGame = async () => {
        const game = await gameService.getGameById(gameId)
        if (game.players.length < 2) {
            socketService.on('player-in', async () => {
                startGame()
            })
        } else {
            socketService.emit('player-in', gameId)
            startGame()
        }
    }


    const startGame = () => {
        console.log('GAME STARTED!!');
    }

    const onEraseCanvas = () => {
        eventBusService.emit('erase-drawing')
    }

    return (
        <section className="draw-app">
            <div className='canvas-container'>
                <CanvasGuess isDrawer={true} />
            </div>
        </section>
    )
} 