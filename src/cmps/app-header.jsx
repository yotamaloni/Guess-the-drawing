import { BrowserRouter as Router, NavLink } from "react-router-dom"
export const AppHeader = () => {
    return (
        <section className="app-header">
            <div className="main-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/draw">DRAW</NavLink>
            </div>
        </section>
    )
}