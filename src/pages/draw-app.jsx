import React from 'react'
import { eventBusService } from '../services/event-bus.service';
import { Canvas } from '../cmps/canvas';
import { ClearCanvasButton } from '../cmps/clear-canvas-button';


export const DrawApp = () => {

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