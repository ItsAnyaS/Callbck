import { useEffect, useState } from "react"
import { useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const CompanySignUp = () => {
    const navigate = useNavigate()
    const [newCompanyInfo, setNewCompanyInfo] = useState()
    const [isStepTwo, setIsStepTwo] = useState(false)
    const [duplicateCompanyError, setDuplicateCompanyError] = useState()

    useEffect(()=> {
        setNewCompanyInfo({...newCompanyInfo, company_type:'not-for-profit'})
    }, [])

    const createNewCompany = async(e) => {
        e.preventDefault()
        let req = await fetch('http://localhost:3000/auth/company/signup', {
            method: "POST", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newCompanyInfo)
            })
        let res = await req.json()
        console.log(res)
        if (req.ok){
            Cookies.set('company-auth-token', res["company-auth-token"], { expires: 7 })
            // navigate('/company_profile')
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

    const handleStepOne = async(e) => {
        e.preventDefault()
        setIsStepTwo(true)
    }
   
    return (
    <main>
    <section>
        <h1>Company sign up</h1>
   { !isStepTwo && <form onSubmit={handleStepOne}>
        <input name='name' onChange={handleInput} required placeholder="Company name"/>
        <textarea name='bio' onChange={handleInput} required placeholder="Short bio describing your companies goals..."/> 
        <input name='email' onChange={handleInput} required placeholder="Email" type={'email'}/> 
        <button>Next</button>
    </form>}
   { isStepTwo && <form onSubmit={createNewCompany}>
        <select name='company_type' required placeholder="Company type" onChange={handleInput}> 
        <option defaultChecked={true} disabled >---Select-one---</option>
        <option value={'not-for-profit'} >Not for Profit</option>
        <option value={'for-profit'}>For Profit</option>
        </select>
        <input name='location' minLength="5" maxLength="5" onChange={handleInput} type={'number'} required placeholder="Zip code"/> 
        <input name='number_of_employees' onChange={handleInput} type={'number'} required placeholder="Number of employees"/> 
        <input name='logo' onChange={handleInput} required placeholder="Link to your logo"/> 
        <input name="password_digest" required type={'password'} placeholder="Password" onChange={handleInput} />
        <button >Create Account</button>
    </form>}
    </section>   
    </main>
    )

}

export default CompanySignUp