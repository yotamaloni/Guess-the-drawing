import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import CloseIcon from '@mui/icons-material/Close';

import { actionCreators } from "../store/action"
import { useForm } from "../hooks/useForm"
import { gameService } from '../services/game.service';
import CircularIndeterminate from '../cmps/loader.jsx'

export const StartForm = (props) => {

    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)
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
            setIsLoading(true)
            const game = await gameService.getGame({ username, type })
            const { closeModal } = props
            setUser({ username })
            setGameDone(false)
            if (closeModal) closeModal()
            setIsLoading(false)
            navigate(`/${game._id}/${type}`);

        } catch (err) {
            console.log('There was a problem to find game', err);
        }
    }
    if (isLoading) return (
        <div className="start-form loader-container">
            <div className='loader' >
                <CircularIndeterminate />
            </div>
        </div>
    )
    return (
        <section className="start-form">

            <h3> Come on, Let's start!</h3>
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label >
                    <input ref={inputRef} {...register('username', undefined, 'Enter username...')} />
                </label>
            </form >
            <div className='actions'>
                <button onClick={() => onPlayerEnter('draw')} className='done'>I want to Draw</button>
                <button onClick={() => onPlayerEnter('guess')} className='delete'>I want to Guess</button>
            </div>
            {
                props.isModal &&
                <div className="close-btn" onClick={() => props.closeModal(true)}>
                    <CloseIcon />
                </div>
            }

        </section >
    )
}
