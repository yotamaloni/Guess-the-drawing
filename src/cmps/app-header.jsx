import { BrowserRouter as Router, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

export const AppHeader = () => {


    const user = useSelector((state) => state.user)

    return (
        <section className="app-header">
            <div className="main-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/draw">DRAW</NavLink>
            </div>
            <div>
                {user?.username}
            </div>
        </section>
    )
}