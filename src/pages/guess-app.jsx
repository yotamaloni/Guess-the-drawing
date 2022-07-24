import React from 'react'
import { Canvas } from '../cmps/canvas';
import { ClearCanvasButton } from '../cmps/clear-canvas-button';


export const GuessApp = () => {

    return (
        <section className="draw-app">
            <div className='canvas-container'>
                <CanvasGuess />
            </div>
        </section>
    )
} 