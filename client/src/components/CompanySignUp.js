import { useEffect, useState } from "react"

const CompanySignUp = () => {
    const [newCompanyInfo, setNewCompanyInfo] = useState({name: 'NYCB'})
    const createNewCompany = async() => {
        let req = await fetch('http://localhost:3000/companies', {
            method: "POST", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newCompanyInfo)
            })
        let res = await req.json()
        console.log(res)
    }
    const handleInput = (key, value) => {
        setNewCompanyInfo({
            ...newCompanyInfo,
            [key]: value
        })
    }
    console.log(newCompanyInfo)
return (
    <div><button onClick={()=> {createNewCompany()}} >Click me</button></div>
)
}

export default CompanySignUp