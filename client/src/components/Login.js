import '../styles/Login.css'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Login = () => {
    const navigate = useNavigate()
    const {globalUser, setGlobalUser} = useContext(UserContext)
    const [loginType, setLoginType] = useState('dancer')
    const [loginInfo, setLoginInfo] = useState({})
    const dancerLogin = async(e) => {
        e.preventDefault()
        let req = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(loginInfo)
        })
        let res = await req.json()
        if (req.ok) {
            setGlobalUser({first_name: res.first_name, last_name: res.last_name, isDancer: true})
            Cookies.set('auth-token', res["auth-token"])
            navigate('/dancer_profile')
        }
    }

    const companyLogin = async(e) => {
        e.preventDefault()
        let req = await fetch('http://localhost:3000/auth/company/login',  {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(loginInfo)
        })
        let res = await req.json()
        if (req.ok) {
            setGlobalUser({name: res.name, isDancer: false})
            Cookies.set('company-auth-token', res["company-auth-token"], {expires: 7})
            navigate('/company_profile')
        }
    }

    const handleInput = (e) => {
        let key = e.target.name
        let value = e.target.value
        setLoginInfo({...loginInfo,
        [key]: value
         })
    }


return (
    <main>
        {loginType == 'dancer' && 
        <section>
            <form onSubmit={(e)=> {dancerLogin(e)}}>
                <input name='email' onChange={handleInput} placeholder='Email' type={'email'}/>
                <input name='password' onChange={handleInput} placeholder='Password' type={'password'}/>
                <button>Login</button>
                <button onClick={()=> {setLoginType('company'); setLoginInfo({})}}>Login as company</button>
            </form>
        </section>}
        { loginType == 'company' &&
            <section>
                <form onSubmit={(e)=> {companyLogin(e)}}>
                <input name='email' onChange={handleInput} placeholder='Email' type={'email'}/>
                <input name='password' onChange={handleInput} placeholder='Password' type={'password'}/>
                <button>Login</button>
                <button onClick={()=> {setLoginType('dancer'); setLoginInfo({})}}>Login as dancer</button>
                </form>
                <h3>{}</h3>
            </section>
        }
    </main>
)
}

export default Login