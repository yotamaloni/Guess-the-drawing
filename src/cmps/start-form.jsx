import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm"
import { gameService } from '../services/game.service';

export const StartForm = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [username, setUsername] = useState('')

    const updateUsername = (value) => {
        setUsername(value.username)
    }

    const [register] = useForm({
    }, updateUsername)


    const onPlayerEnter = async (type) => {
        if (!username) {
            inputRef.current.focus()
            return
        }
        try {
            const game = await gameService.getGame({ username, type })
            navigate(`/${game._id}/${type}`);

        } catch (err) {
            console.log('There was a problem to find game', err);
        }
    }

    return (
        <section className="start-form">
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label >
                    <input ref={inputRef} {...register('username', undefined, 'Enter username...')} />
                </label>
            </form >
            <div className='actions'>
                <button onClick={() => onPlayerEnter('draw')} className='done'>I want to Draw</button>
                <button onClick={() => onPlayerEnter('guess')} className='delete'>I want to Guess</button>
            </div>
        </section >
    )
}
