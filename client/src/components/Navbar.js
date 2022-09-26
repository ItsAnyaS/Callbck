import { NavLink, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
const Navbar = () => {
    const navigate = useNavigate()
    return (
        <nav id='navbar'>
            <div onClick={()=> {navigate('/')}} id='logo'>Logo</div>
            <ul id='nav-list'>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/search'><li className="nav-item">Listings</li></NavLink>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/dancer_profile'><li className="nav-item">Profile</li></NavLink>
            </ul>
        </nav>
    )
}

export default Navbar