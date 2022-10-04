import { NavLink, useNavigate } from "react-router-dom"
import "../styles/Navbar.css"
import { UserContext } from "../App"
import { useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const {globalUser, setGlobalUser} =useContext(UserContext)
    const [userInfo, setUserInfo] = useState({})
    const [submitData, setSubmitData] = useState()
    const [submitType, setSubmitType] = useState()
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
        route = 'dancers'
    }
    else if (!authToken){
        authToken = Cookies.get('company-auth-token')
        route = 'companies'
    }
    let req = await fetch(`http://localhost:3000/${route}_by_token`, {
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
            let req = await fetch(`http://localhost:3000/${route}/${userInfo.id}`, {
                method: "DELETE",
                headers: {"Content-type": 'application/json'}
            })
            if (req.ok ){
                setIsSettingsOpen(false)
                handleSignOut()
            }
        } else if (submitType === 'edit'){
            let req = await fetch(`http://localhost:3000/${route}/${userInfo.id}`, {
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
            console.log('none')
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
           {isSettingsOpen &&  <section id="settings-modal" onClick={()=> {setIsSettingsOpen(false); setSubmitData({})}}>
            <form onSubmit={handleSubmit} id="settings-container" className={isSettingsOpen && 'slide-up'} onClick={(e)=> {e.stopPropagation()}}>
                <h1>Settings</h1>
               { globalUser.isDancer &&  <div className="input-divider">
                    <div className="input-container">
                        <p>First name</p>
                        <input name="first_name" value={userInfo.first_name} onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>Last name</p>
                        <input name="last_name" value={userInfo.last_name} onChange={handleInputChange}/>
                    </div>
                </div>}
                { !globalUser.isDancer && 
                <div className="input-container">
                    <p>Comapany name</p>
                    <input name="name" value={userInfo.name} onChange={handleInputChange}/>
                </div>
                }
                <hr/>
                <div className="settings-info-container">
                    <div className="input-container">
                        <p>Zip code</p>
                        <input name="location"  value={userInfo.location}  onChange={handleInputChange}  />
                    </div>
                   { globalUser.isDancer &&  <div className="input-container">
                        <p>Years of expirence</p>
                        <input name="years_of_experience" type={'number'} value={userInfo.years_of_experience} onChange={handleInputChange} />
                    </div>}
                    { globalUser.isDancer && <div className="input-container">
                        <p>Gender</p>
                        <select  name='gender' id="gender-drop-down" placeholder="Gender"  onChange={handleInputChange} > 
                        <option defaultChecked={true} disabled >---Select-one---</option>
                        <option value={'female'} >Female</option>
                        <option value={'male'}>Male</option>
                        <option value={'non-binary'}>Non-binary</option>
                        <option value={'other'}>Other</option>
                        </select>
                    </div>}
                    { !globalUser.isDancer && 
                    <div className="input-container">
                        <p>Bio</p>
                        <input name="bio" value={userInfo?.bio} onChange={handleInputChange}/>
                    </div>}
                    { !globalUser.isDancer && 
                    <div className="input-container">
                        <p>Logo</p>
                        <input name="logo" value={userInfo?.logo} onChange={handleInputChange}/>
                    </div>}
                    { !globalUser.isDancer && 
                    <div className="input-container">
                        <p>Number of employees</p>
                        <input name="number_of_employees" type={'number'} value={userInfo?.number_of_employees} onChange={handleInputChange}/>
                    </div>}
                   {!globalUser.isDancer &&  <div className="input-container">
                        <p>Company type</p>
                        <select name='company_type' required placeholder="Company type" onChange={handleInputChange}> 
                            <option defaultChecked={true} disabled >---Select-one---</option>
                            <option value={'not-for-profit'} >Not for Profit</option>
                            <option value={'for-profit'}>For Profit</option>
                        </select>
                    </div>}
                  {/* {globalUser.isDancer &&  <div className="input-container">
                        <p>Headshot</p>
                        <input name='image' style={{marginLeft: '-325px'}} required placeholder="upload" type={'file'}/>
                        </div>}
                    { globalUser.isDancer && <div className="input-container">
                        <p>Resume</p>
                        <input name='resume' required placeholder="upload" style={{marginLeft: '-325px'}} type={'file'}/>
                        </div>} */}

                        {globalUser.isDancer && <div className="input-container">
                        <p>Dance reel</p>
                        <input name="dance_reel" value={userInfo.dance_reel} onChange={handleInputChange} />
                    </div>}
                </div>
                        <div className="settings-btn-container">
                            <button onClick={()=> {setSubmitType('delete')}} className="settings-del-btn hover">Delete Account</button>
                            <button  onClick={()=> {submitData ? setSubmitType('edit') : setSubmitType('none')}} className="settings-save-btn hover">Save</button>
                        </div>
             </form>
            </section>}
        </nav>
    )
}

export default Navbar