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


    return (
        <section className="app-header">
            <div className="main-nav">
                <NavLink to="/">Guess The Drawing</NavLink>
            </div>
            <div className="user-container">
                {user?.username ?
                    <NavLink className="icon-container" to="/start">
                        <MemberIcon username={user.username} />
                    </NavLink>
                    :
                    <NavLink className="icon-container" to="/start">
                        <div className="icon-container"><AccountCircleOutlinedIcon /></div>
                    </NavLink>

                }
            </div>

        </section>
    )
}