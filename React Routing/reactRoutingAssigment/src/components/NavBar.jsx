import { NavLink } from "react-router-dom";
import './NavBar.css';

export default function NavBar(){
    return(
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/addresses">Address</NavLink>
        </nav>
    )
}