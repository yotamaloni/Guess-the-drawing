import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/action"
import { useForm } from "../hooks/useForm"
import { gameService } from '../services/game.service';

export const StartForm = () => {

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const [username, setUsername] = useState('')

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { setUser, setGameDone } = bindActionCreators(actionCreators, dispatch)




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
            setUser({ username })
            setGameDone({ isGameDone: false })
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
