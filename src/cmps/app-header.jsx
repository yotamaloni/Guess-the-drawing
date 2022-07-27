import { BrowserRouter as Router, NavLink } from "react-router-dom"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import { actionCreators } from "../store/action";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { MemberIcon } from "./member-icon";
import { StartForm } from "../cmps/start-form";
import React from "react";

export const AppHeader = () => {

    const [isFormOpen, setIsFormOpen] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const { setUser } = bindActionCreators(actionCreators, dispatch)

    const toggleForm = (isShutDown = null) => {
        if (isShutDown === true) {
            setIsFormOpen(false)
            return
        }
        setIsFormOpen(!isFormOpen)
    }

    return (
        <section className="app-header">
            <div className="main-nav">
                <NavLink onClick={() => toggleForm(true)} to="/">Guess The Drawing</NavLink>
            </div>
            <div className="user-container">
                {user?.username ?
                    <div onClick={() => toggleForm()} className="icon-container">
                        <MemberIcon username={user.username} />
                    </div>
                    :
                    <div onClick={() => toggleForm()} className="icon-container"><AccountCircleOutlinedIcon /></div>
                }
            </div>
            {isFormOpen && <StartForm title={'Would you like to start a new game?'} closeModal={toggleForm} />}

        </section>
    )
}