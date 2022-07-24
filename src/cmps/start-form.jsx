import React, { useEffect, useState } from 'react'

import { useForm } from "../hooks/useForm"

export const StartForm = () => {

    const [username, setUsername] = useState('')

    const updateUsername = (value) => {
        setUsername(value)
    }

    const [register] = useForm({
        model: '',
        type: ''
    }, updateUsername)


    const onPlayerEnter = (type) => {
        console.log(username);
    }

    return (
        <section className="start-form">
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label >
                    <input {...register('username', undefined, 'Enter username...')} />
                </label>
            </form >
            <div className='actions'>
                <button onClick={() => onPlayerEnter('draw')} className='done'>I want to Draw</button>
                <button onClick={() => onPlayerEnter('guess')} className='delete'>I want to Guess</button>
            </div>
        </section >
    )
}
