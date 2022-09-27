import { NavLink, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
import { UserContext } from "../App"
import { useContext } from "react"
const Navbar = () => {
    const {globalUser, setGlobalUser} =useContext(UserContext)
    const navigate = useNavigate()
    console.log('nav', globalUser)
    return (
        <nav id='navbar'>
            <div onClick={()=> {navigate('/')}} id='logo'>Logo</div>
            <ul id='nav-list'>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/search'><li className="nav-item">Listings</li></NavLink>
              { globalUser&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/${globalUser.isDancer? 'dancer_profile': 'company_profile'}`}><li className="nav-item">Profile</li></NavLink>}
              { globalUser&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/`}><li className="nav-item">Sign out</li></NavLink>}
              { !globalUser&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/login`}><li className="nav-item">LOGIN</li></NavLink>}
            </ul>
        </nav>
    )
}

export default Navbar