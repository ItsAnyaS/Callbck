import { NavLink, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
import { UserContext } from "../App"
import { useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const {globalUser, setGlobalUser} =useContext(UserContext)
    const navigate = useNavigate()

useEffect(() => {
    if (globalUser){
        setIsLoggedIn(true)
    }else {
        setIsLoggedIn(false)
    }

}, [globalUser])

const handleSettingsOpen = async() => {
    setIsSettingsOpen(true)
    let route = ''
    let authToken = Cookies.get('auth-token')
    if (authToken){
        console.log('dancer')
        route = 'dancers_by_token'
    }
    else if (!authToken){
        authToken = Cookies.get('company-auth-token')
        console.log('company')
        route = 'companies_by_token'
    }
    let req = await fetch(`http://localhost:3000/${route}`, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({token: authToken})
    })
    let res = await req.json()
    console.log(res)

}



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
            <div onClick={()=> {navigate('/')}} id='logo'>
                <img id='logo-img' src='./callbck-logo-v2.png'/>
            </div>
            <ul id='nav-list'>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/search'><li className="nav-item">Listings</li></NavLink>
              { isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/${globalUser?.isDancer? 'dancer_profile': 'company_profile'}`}><li className="nav-item">Profile</li></NavLink>}
              { isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} onClick={handleSignOut} to={`/`}><li className="nav-item">Sign out</li></NavLink>}
              { !isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/login`}><li className="nav-item">LOGIN</li></NavLink>}
              { !isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/signup`}><li className="nav-item">Sign Up</li></NavLink>}
              { isLoggedIn&& <li className="nav-item gear" onClick={()=> {handleSettingsOpen()}}><ion-icon name="settings-outline"></ion-icon></li>}
            </ul>
           {isSettingsOpen &&  <section id="settings-modal" onClick={()=> {setIsSettingsOpen(false)}}>
            <div id="settings-container" className={isSettingsOpen && 'slide-up'} onClick={(e)=> {e.stopPropagation()}}>
                Hello world
            </div>
            </section>}
        </nav>
    )
}

export default Navbar