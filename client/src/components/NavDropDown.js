import { NavLink } from "react-router-dom"

const NavDropDown = ({isLoggedIn, globalUser, handleSignOut, handleSettingsOpen, setIsActive}) => {
    console.log(isLoggedIn)
    return (
        <ul id='drop-down-nav-list' onClick={()=> {setIsActive(false)}}>
            <div className="close-nav-modal" onClick={()=> {setIsActive(false)}}><ion-icon name="close-outline"></ion-icon></div>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/'><li onClick={()=> {setIsActive(false)}} className="dd-nav-item">Home</li></NavLink>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/search'><li onClick={()=> {setIsActive(false)}} className="dd-nav-item">Listings</li></NavLink>
              { isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/${globalUser?.isDancer? 'profile': 'dashboard'}`}><li onClick={()=> {setIsActive(false)}} className="dd-nav-item">Profile</li></NavLink>}
              { isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} onClick={(e) => {handleSignOut(e); setIsActive(false)}} to={`/`}><li className="dd-nav-item">Sign out</li></NavLink>}
              { !isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/login`} ><li onClick={()=> {setIsActive(false)}} className="dd-nav-item">LOGIN</li></NavLink>}
              { !isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/signup`}><li onClick={()=> {setIsActive(false)}} className="dd-nav-item">Sign Up</li></NavLink>}
              { isLoggedIn&& <li className="dd-nav-item gear" onClick={()=> { setIsActive(false);handleSettingsOpen()}}>Settings</li>}
        </ul>
    )
}

export default NavDropDown