import { useEffect, useState } from "react"

const DancerSignUp = () => {
    const [newDancerInfo, setNewDancerInfo] = useState()
    const [isStepTwo, setIsStepTwo] = useState(false)
    const createNewDancer = async() => {
        let req = await fetch('http://localhost:3000/dancers', {
            method: "POST", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newDancerInfo)
            })
        let res = await req.json()
        console.log(res)
    }
    const handleInput = (e) => {
        let key = e.target.name
        let value = e.target.value
        setNewDancerInfo({
            ...newDancerInfo,
            [key]: value
        })
    }
    console.log(newDancerInfo)
    return (
    <main>
    <section>
        <h1>Dancer sign up</h1>
   { !isStepTwo && <form onSubmit={(e)=> { e.preventDefault() ;setIsStepTwo(true)}}>
        <input name='first_name' onChange={handleInput} required placeholder="First name"/>
        <input name='last_name' onChange={handleInput} required placeholder="Last name"/> 
        <input  name='email' onChange={handleInput} required placeholder="Email" type={'email'}/> 
        <button>Next</button>
    </form>}
   { isStepTwo && <form>
        <input name='gender' required placeholder="Gender"/> 
        <input name='style' required placeholder="Dance styles"/> 
        <input name='location' minLength="5" maxLength="5" type={'number'} required placeholder="Zip code"/> 
        <button>Create Account</button>
    </form>}
    </section>   
    </main>
    )

}

export default DancerSignUp