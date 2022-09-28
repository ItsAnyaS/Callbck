import { useEffect, useState } from "react"
import { useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import '../styles/Register.css'

const DancerSignUp = () => {
    const navigate = useNavigate()
    const [newDancerInfo, setNewDancerInfo] = useState()
    const [isStepTwo, setIsStepTwo] = useState(false)
    const [duplicateDancerError, setDuplicateDancerError] = useState()

    useEffect(()=> {
        setNewDancerInfo({...newDancerInfo, gender:'female'})
    }, [])

    const createNewDancer = async(e) => {
        e.preventDefault()
        let req = await fetch('http://localhost:3000/auth/signup', {
            method: "POST", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newDancerInfo)
            })
        let res = await req.json()
        if (req.ok){
            Cookies.set('auth-token', res["auth-token"], { expires: 7 })
            navigate('/dancer_profile')
        }
    }

    const handleInput = (e) => {
        let key = e.target.name
        let value = e.target.value
        setNewDancerInfo({
            ...newDancerInfo,
            [key]: value
        })
    }

    const handleStepOne = async(e) => {
        e.preventDefault()
        let req = await fetch(`http://localhost:3000/dancers_by_email/${newDancerInfo.email}`)
        let res = await req.json()
        if (res == null){
            setIsStepTwo(true)
        }
        else {
            setDuplicateDancerError('There is already an account with this email.')
        }
    }
   
    return (
    <main id='signup-page'>
    <section>
        <h1>Dancer sign up</h1>
   { !isStepTwo && <form onSubmit={handleStepOne}>
        <input className="first_name_input" name='first_name' onChange={handleInput} required placeholder="First name"/>
        <input name='last_name' onChange={handleInput} required placeholder="Last name"/> 
        <input name='email' onChange={handleInput} required placeholder="Email" type={'email'}/> 
        <button className="hover">Next <ion-icon name="arrow-forward-outline"></ion-icon></button>
    </form>}
   { isStepTwo && <form onSubmit={createNewDancer}>
    <div>
       <label htmlFor="gender-drop-down">Choose gender:</label> 
       <select name='gender' id="gender-drop-down" required placeholder="Gender" onChange={handleInput}> 
        <option defaultChecked={true} disabled >---Select-one---</option>
        <option value={'female'} >Female</option>
        <option value={'male'}>Male</option>
        <option value={'non-binary'}>Non-binary</option>
        </select>
    </div>
        <input name='location' minLength="5" maxLength="5" onChange={handleInput} type={'number'} required placeholder="Zip code"/> 
        <input name="password_digest" required type={'password'} placeholder="Password" onChange={handleInput} />
        <button >Create Account</button>
    </form>}
        <button onClick={()=> {navigate('/company/signup')}}>Register as company</button>
    </section>   
    </main>
    )

}

export default DancerSignUp