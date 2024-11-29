import React from "react"
import { NavLink } from "react-router-dom"
import '../App.css'

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = () => {

    return (
        <div className="nav">
            <h1 className="title"> Blog </h1>
            <nav className="nav-links">
                <NavLink className="nav-link" to={'/'} > Posts </NavLink>
                <NavLink className="nav-link" to={'/Tags'} > Tags </NavLink>
                <NavLink className="nav-link" to={'/about'} > About </NavLink>
            </nav>
        </div>
    )
}