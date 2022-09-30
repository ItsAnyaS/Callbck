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
        // setNewDancerInfo({...newDancerInfo, gender:'female'})
    }, [])

    const createNewDancer = async(data) => {
       
        let req = await fetch('http://localhost:3000/dancers', {
            method: "POST", 
            body: data
            })
        let res = await req.json()
        console.log(res)
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

  
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('dancer[first_name]', e.target.first_name.value)
        data.append('dancer[last_name]',e.target.last_name.value)
        data.append('dancer[email]', e.target.email.value)
        data.append('dancer[gender]', e.target.gender.value)
        data.append('dancer[image]',e.target.image.files[0])
        data.append('dancer[resume]',e.target.resume.files[0])
        data.append('dancer[location]', e.target.location.value)
        data.append('dancer[password_digest]', e.target.password_digest.value)
        setNewDancerInfo(data)
        createNewDancer(data)
        console.log(data)
    }



    return (
    <main id='signup-page'>
    <section>
        <h1>Dancer sign up</h1>
   { <form onSubmit={handleSubmit}>
        <input className="first_name_input" name='first_name' onChange={handleInput} required placeholder="First name"/>
        <input name='last_name' onChange={handleInput} required placeholder="Last name"/> 
        <input name='email' onChange={handleInput} required placeholder="Email" type={'email'}/> 
    <div>
       <label htmlFor="gender-drop-down">Choose gender:</label> 
       <select name='gender' id="gender-drop-down" required placeholder="Gender" onChange={handleInput}> 
        <option defaultChecked={true} disabled >---Select-one---</option>
        <option value={'female'} >Female</option>
        <option value={'male'}>Male</option>
        <option value={'non-binary'}>Non-binary</option>
        </select>
        <input name='image' onChange={(e) => {console.log(e.target.files[0])}} placeholder="upload" type={'file'}/>
        <input name='resume' onChange={(e) => {console.log(e.target.files[0])}} placeholder="upload" type={'file'}/>
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