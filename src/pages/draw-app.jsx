import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { eventBusService } from '../services/event-bus.service.js';
import { socketService } from '../services/socket.service.js'
import { gameService } from '../services/game.service.js'
import { Canvas } from '../cmps/canvas';
import { ClearCanvasButton } from '../cmps/clear-canvas-button';


export const DrawApp = (props) => {
    const { gameId } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        socketService.emit('game-watch', gameId)
        socketService.on('player-leave', async () => {
            console.log('PLAYER LEFT!!');
            await gameService.removeGame(gameId)
            navigate(`/`);
        })
        return () => {
            socketService.off('player-leave')
        }
    }, []);

    const onEraseCanvas = () => {
        eventBusService.emit('erase-drawing')
    }
    const onDoneDrawing = () => {
        console.log('done');
    }
    return (
        <section className="draw-app">
            <div className='canvas-container'>
                <Canvas isDrawer={true} />
            </div>
            <div className='actions'>
                <button onClick={onEraseCanvas} className="delete">Erase</button>
                <button onClick={onDoneDrawing} className="done">Done</button>
            </div>
        </section>
    )
} 