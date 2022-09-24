import { NavLink } from "react-router-dom"
import "../styles/Navbar.css"
const Navbar = () => {
    return (
        <nav id='navbar'>
            <div id='logo'>Logo</div>
            <ul id='nav-list'>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/search'><li className="nav-item">Listings</li></NavLink>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/dancer_profile'><li className="nav-item">Profile</li></NavLink>
            </ul>
        </nav>
    )
}

export default Navbar