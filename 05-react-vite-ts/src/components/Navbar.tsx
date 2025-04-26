import React from "react"
import { NavLink } from "react-router-dom"

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = () => {

    return (
        <div className="flex items-center justify-around bg-gray-400 w-full">
            <h1 className="text-white"> Blog </h1>
            <nav className="flex items-center justify-around">
                <NavLink className="text-white underline-dashed px-4" to={'/'} > Posts </NavLink>
                <NavLink className="text-white underline-dashed px-4" to={'/Tags'} > Tags </NavLink>
                <NavLink className="text-white underline-dashed px-4" to={'/about'} > About </NavLink>
            </nav>
        </div>
    )
}