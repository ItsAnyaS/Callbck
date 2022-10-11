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
        <fieldset>
            <legend>Company name</legend>
            <input onChange={handleInput} name='name' required />
        </fieldset>

        <fieldset>
        <legend>Number of employees</legend>
        <input name='number_of_employees' onChange={handleInput}  required /> 
        </fieldset>
</div>


<div className="input-divider">
    <fieldset>
        <legend>Email</legend>
        <input name='email' onChange={handleInput} required placeholder="Email" type={'email'}/> 
    </fieldset>


        <fieldset>
            <legend>Zipcode</legend>
    <input name='location' minLength="5" maxLength="5"  onChange={handleInput} type={'number'} required /> 
        </fieldset>
</div>

<div className="input-divider">
    <fieldset>
        <legend>Bio</legend>
        <textarea id="signup-ta"  name='bio' required onChange={handleInput}></textarea>
    </fieldset>


        <fieldset>
            <legend>Company type</legend>
    <select name='company_type' required placeholder="Company type" onChange={handleInput}> 
        <option defaultChecked={true} disabled >---Select-one---</option>
        <option value={'not-for-profit'} >Not for Profit</option>
        <option value={'for-profit'}>For Profit</option>
    </select>
        </fieldset>
</div>


<div className="input-divider">
        <fieldset>
            <legend>Logo</legend>
            <input name='logo'  onChange={handleInput}  required type={'text'} placeholder="Link to company logo" />
        </fieldset>
        <fieldset>
            <legend>Password</legend>
        <input name="password"  onChange={handleInput} required type={'password'} placeholder="Password" />
        </fieldset>
</div>

    <button className="create-dancer-account-btn hover">Create Account</button>
</form>}
    <button className="hover change-type" onClick={()=> {navigate('/signup')}}>Register as dancer</button>
</section>   
</main>
    )

}

export default CompanySignUp