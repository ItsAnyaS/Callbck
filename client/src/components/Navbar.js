import { NavLink, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
import { UserContext } from "../App"
import { useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const {globalUser, setGlobalUser} =useContext(UserContext)
    const navigate = useNavigate()

useEffect(() => {
    if (globalUser){
        setIsLoggedIn(true)
    }else {
        setIsLoggedIn(false)
    }

}, [globalUser])




    const handleSignOut = () => {
        navigate('/');
        setGlobalUser();
        if (Cookies.get('auth-token')){
            Cookies.remove('auth-token'); 
        }else {
            Cookies.remove('company-auth-token')
        }
    }


    return (
        <nav id='navbar'>
            <div onClick={()=> {navigate('/')}} id='logo'>Logo</div>
            <ul id='nav-list'>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/search'><li className="nav-item">Listings</li></NavLink>
              { isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/${globalUser?.isDancer? 'dancer_profile': 'company_profile'}`}><li className="nav-item">Profile</li></NavLink>}
              { isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} onClick={handleSignOut} to={`/`}><li className="nav-item">Sign out</li></NavLink>}
              { !isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/login`}><li className="nav-item">LOGIN</li></NavLink>}
            </ul>
        </nav>
    )
}

export default Navbar