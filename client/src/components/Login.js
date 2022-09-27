import '../styles/Login.css'
import { useState, useEffect } from 'react'
const Login = () => {
    const [loginType, setLoginType] = useState('dancer')
return (
    <main>
        {loginType == 'dancer' && 
        <section>
            <form>
                <input placeholder='Email' type={'email'}/>
                <input placeholder='Password' type={'password'}/>
                <button>Login</button>
                <button onClick={()=> {setLoginType('company')}}>Login as company</button>
            </form>
        </section>}
        { loginType == 'company' &&
            <section>
                <input placeholder='Email' type={'email'}/>
                <input placeholder='Password' type={'password'}/>
                <button>Login</button>
                <button onClick={()=> {setLoginType('dancer')}}>Login as dancer</button>
            </section>
        }
    </main>
)
}

export default Login