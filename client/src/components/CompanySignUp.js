import { useEffect, useState, useContext } from "react"
import { useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { UserContext} from '../App'
import '../styles/Register.css'

const CompanySignUp = () => {
    const {setGlobalUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [newCompanyInfo, setNewCompanyInfo] = useState()

    useEffect(()=> {
        setNewCompanyInfo({...newCompanyInfo, company_type:'not-for-profit'})
    }, [])

    const createNewCompany = async(e) => {
        e.preventDefault()
        let req = await fetch('/auth/company/signup', {
            method: "POST", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newCompanyInfo)
            })
        let res = await req.json()
        console.log(res)
        if (req.ok){
            setGlobalUser({name: res.name, isDancer: false})
            Cookies.set('company-auth-token', res["company-auth-token"], { expires: 7 })
            navigate('/company_profile')
        }
    }

    const handleInput = (e) => {
        let key = e.target.name
        let value = e.target.value
        setNewCompanyInfo({
            ...newCompanyInfo,
            [key]: value
        })
    }
   
    return (

<main id='signup--dancer-page'>
<section id='signup-left-container'></section>
<section id="dancer-signup-container">
    <h1>Company sign up</h1>

{ <form id="dancer-signup-form" onSubmit={createNewCompany}>
<div className="input-divider">
    <div className="input-container">
    <p htmlFor="name">Company name</p>
    <input  onChange={handleInput} name='name' required placeholder="Company name"/>
    </div>

    <div className="input-container">
    <p>Number of employees</p>
    <input name='number_of_employees' onChange={handleInput}  required placeholder="Number of employees...(approx)"/> 
    </div>
</div>


<div className="input-divider">
    <div className="input-container">
    <p>Email</p>
    <input name='email' onChange={handleInput} required placeholder="Email" type={'email'}/> 
    </div>


    <div className="input-container">
    <p>Zip code</p>
    <input name='location' minLength="5" maxLength="5"  onChange={handleInput} type={'number'} required placeholder="Zip code"/> 
    </div>
</div>

<div className="input-divider">
    <div className="input-container">
    <p>Bio</p>
    <textarea id="signup-ta"  name='bio' required onChange={handleInput}></textarea>
    </div>


    <div className="input-container">
    <p>Company type</p>
    <select name='company_type' required placeholder="Company type" onChange={handleInput}> 
        <option defaultChecked={true} disabled >---Select-one---</option>
        <option value={'not-for-profit'} >Not for Profit</option>
        <option value={'for-profit'}>For Profit</option>
    </select>
    </div>
</div>


<div className="input-divider">
        <div className="input-container">
        <p>Company logo</p>
        <input name='logo'  onChange={handleInput}  required type={'text'} placeholder="Link to company logo" />
        </div>
        <div className="input-container">
        <p>Passwod</p>
        <input name="password"  onChange={handleInput} required type={'password'} placeholder="Password" />
        </div>
</div>

    <button className="create-dancer-account-btn hover">Create Account</button>
</form>}
    <button className="hover change-type" onClick={()=> {navigate('/dancer/signup')}}>Register as dancer</button>
</section>   
</main>
    )

}

export default CompanySignUp