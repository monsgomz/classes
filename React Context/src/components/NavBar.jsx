import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.css'

export default function NavBar() {
  return(
        <nav className='navBar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/favs">Favs</NavLink>
        </nav>
    )
}
