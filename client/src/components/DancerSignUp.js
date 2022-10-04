import { useEffect} from "react"
import { useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import '../styles/Register.css'
import { UserContext } from "../App"
import { useContext } from "react"

const DancerSignUp = () => {
    const  {setGlobalUser} = useContext(UserContext)
    const navigate = useNavigate()
    // const [newDancerInfo, setNewDancerInfo] = useState()

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
            setGlobalUser({first_name: res.first_name, last_name: res.last_name, isDancer: true})
            Cookies.set('auth-token', res["auth-token"], { expires: 7 })
            navigate('/dancer_profile')
        }
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
        data.append('dancer[years_of_experience]',e.target.years_of_expirence.value)
        data.append('dancer[location]', e.target.location.value)
        data.append('dancer[dance_reel]', e.target.dance_reel.value)
        data.append('dancer[password_digest]', e.target.password_digest.value)
        // setNewDancerInfo(data)
        createNewDancer(data)
    }



    return (
    <main id='signup--dancer-page'>
    <section id='signup-left-container'></section>
    <section id="dancer-signup-container">
        <h1>Dancer sign up</h1>

   { <form id="dancer-signup-form" onSubmit={handleSubmit}>
    <div className="input-divider">
        <div className="input-container">
        <p htmlFor="first_name">First name</p>
        <input  name='first_name' required placeholder="First name"/>
        </div>

        <div className="input-container">
        <p>Last name</p>
        <input name='last_name'  required placeholder="Last name"/> 
        </div>
    </div>


    <div className="input-divider">
        <div className="input-container">
        <p>Email</p>
        <input name='email'  required placeholder="Email" type={'email'}/> 
        </div>


        <div className="input-container">
        <p>Zip code</p>
        <input name='location' minLength="5" maxLength="5"  type={'number'} required placeholder="Zip code"/> 
        </div>
    </div>

    <div className="input-divider">
        <div className="input-container">
            <p>Gender</p>
        <select  name='gender' id="gender-drop-down" required placeholder="Gender" > 
        <option defaultChecked={true} disabled >---Select-one---</option>
        <option value={'female'} >Female</option>
        <option value={'male'}>Male</option>
        <option value={'non-binary'}>Non-binary</option>
        <option value={'other'}>Other</option>
        </select>
        </div>

        <div className="input-container">
        <p>Years of expirence</p>
        <input name='years_of_expirence' required placeholder="Years of expirence" type={'number'}/> 
        </div>
    </div>

    <div className="input-divider">
        <div className="input-container">
        <p>Headshot</p>
        <input name='image' required placeholder="upload" type={'file'}/>
        </div>
        <div className="input-container">
        <p>Resume</p>
        <input name='resume'  required placeholder="upload" type={'file'}/>
        </div>

    </div>
    <div className="input-divider">
            <div className="input-container">
            <p>Dance reel</p>
            <input name='dance_reel'  required type={'text'} placeholder="Youtube link to dance reel" />
            </div>
            <div className="input-container">
            <p>Passwod</p>
            <input name="password_digest" required type={'password'} placeholder="Password" />
            </div>
    </div>

        <button className="create-dancer-account-btn hover">Create Account</button>
    </form>}
        <button className="hover change-type" onClick={()=> {navigate('/company/signup')}}>Register as company</button>
    </section>   
    </main>
    )

}

export default DancerSignUp