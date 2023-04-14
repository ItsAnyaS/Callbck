import { NavLink, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
import { UserContext } from "../App"
import { useContext, useState, useEffect } from "react"
import NavDropDown from "./modals/NavDropDown"
import Cookies from "js-cookie"
import Settings from "./Settings"
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const {globalUser, setGlobalUser} =useContext(UserContext)
    const [userInfo, setUserInfo] = useState({})
    const [submitData, setSubmitData] = useState()
    const [submitType, setSubmitType] = useState()
    const navigate = useNavigate()
    const [isHamburger, setIsHamburger] = useState(false)
    const [isActive, setIsActive] = useState(false)
    
    useEffect(() => {
        if (globalUser){
            setIsLoggedIn(true)
        }else {
            setIsLoggedIn(false)
        }

        const handleResize = () => {
            if (window.innerWidth < 700) {
              setIsHamburger(true);
            } else {
              setIsHamburger(false);
            }
            
          }
          handleResize()
          window.addEventListener('load', handleResize)
          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize)
          }
        
    }, [globalUser])
    
    const handleSettingsOpen = async() => {
        setIsSettingsOpen(true)
        let route = ''
    let authToken = Cookies.get('auth-token')
    if (authToken){
        route = 'dancers'
    }
    else if (!authToken){
        authToken = Cookies.get('company-auth-token')
        route = 'companies'
    }
    let req = await fetch(`/${route}_by_token`, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({token: authToken})
    })
    let res = await req.json()
    setUserInfo(res)
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

    const handleInputChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        setUserInfo({
            ...userInfo,
            [key]: value
        })

        setSubmitData({
            ...submitData,
            [key]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let route = ''
        let authToken = Cookies.get('auth-token')
        if (authToken){
            route = 'dancers'
        }
        else if (!authToken){
            authToken = Cookies.get('company-auth-token')
            route = 'companies'
        }
        if (submitType === 'delete'){
            let req = await fetch(`/${route}/${userInfo.id}`, {
                method: "DELETE",
                headers: {"Content-type": 'application/json'}
            })
            if (req.ok ){
                setIsSettingsOpen(false)
                handleSignOut()
            }
        } else if (submitType === 'edit'){
            let req = await fetch(`/${route}/${userInfo.id}`, {
                method: "PATCH",
                headers: {"Content-type": 'application/json'},
                body: JSON.stringify(submitData)
            })
            if (req.ok){
                setIsSettingsOpen(false)
                if (globalUser.isDancer){
                setGlobalUser({first_name: submitData.first_name ?  submitData.first_name: globalUser.first_name, last_name: submitData.last_name? submitData.last_name: globalUser.last_name, isDancer: true})
                }else {
                setGlobalUser({name: submitData.name? submitData.name: globalUser.name, isDancer: false})
                }
            }
        } else if (submitType === 'none'){
            setIsSettingsOpen(false)
        }
    } 

    return (
        <nav id='navbar'>
            <div onClick={()=> {navigate('/')}} id='logo'>
                <img id='logo-img' alt="Callbck" src='/callbck-logo-v2.png'/>
            </div>
            { !isHamburger && <ul id='nav-list'>
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/search'><li className="nav-item">Listings</li></NavLink>
                {/* <NavLink style={{textDecoration: 'none', color: 'black'}} to='/about'><li className="nav-item">About</li></NavLink> */}
              { isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/${globalUser?.isDancer? 'profile': 'dashboard'}`}><li className="nav-item">{globalUser?.isDancer? 'Profile': 'Dashboard'}</li></NavLink>}
              { isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} onClick={handleSignOut} to={`/`}><li className="nav-item">Sign out</li></NavLink>}
              { !isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/login`}><li className="nav-item">Login</li></NavLink>}
              { !isLoggedIn&& <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/signup`}><li className="nav-item">Sign Up</li></NavLink>}
              { isLoggedIn&& <li className="nav-item gear" onClick={()=> {handleSettingsOpen()}}><ion-icon name="settings-outline"></ion-icon></li>}
            </ul>}
            {
                isHamburger &&
                <div className="hamburger-icon" onClick={()=> {setIsActive(true)}}>
                    <ion-icon name="menu-outline"></ion-icon>
                </div>
            }
            {isActive &&
            <NavDropDown isLoggedIn={isLoggedIn} setIsActive={setIsActive} globalUser={globalUser} handleSignOut={handleSignOut} handleSettingsOpen={handleSettingsOpen}/>
        }
        {isSettingsOpen && <Settings globalUser={globalUser} userInfo={userInfo} setIsSettingsOpen={setIsSettingsOpen} setSubmitData={setSubmitData} handleSubmit={handleSubmit} isSettingsOpen={isSettingsOpen} handleInputChange={handleInputChange} setSubmitType={setSubmitType} submitData={submitData}/>}
        </nav>
    )
}

export default Navbar