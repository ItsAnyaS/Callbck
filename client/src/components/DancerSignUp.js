import { useEffect, useState } from "react"

const DancerSignUp = () => {
    const [newDancerInfo, setNewDancerInfo] = useState()
    const [isStepTwo, setIsStepTwo] = useState(false)
    const [duplicateDancerError, setDuplicateDancerError] = useState()

    useEffect(()=> {
        setNewDancerInfo({...newDancerInfo, gender:['female']})
    }, [])

    const createNewDancer = async(e) => {
        e.preventDefault()
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

    const handleStepOne = async(e) => {
        e.preventDefault()
        let req = await fetch(`http://localhost:3000/dancers_by_email/${newDancerInfo.email}`)
        let res = await req.json()
        console.log(res)
        if (res == null){
            setIsStepTwo(true)
        }
        else {
            setDuplicateDancerError('There is already an account with this email.')
        }
    }
    const handleGenderInput = (e) => {
        let value = e.target.value
        setNewDancerInfo({...newDancerInfo,
        gender: [value]})
    }

    console.log(newDancerInfo)
    return (
    <main>
    <section>
        <h1>Dancer sign up</h1>
   { !isStepTwo && <form onSubmit={handleStepOne}>
        <input name='first_name' onChange={handleInput} required placeholder="First name"/>
        <input name='last_name' onChange={handleInput} required placeholder="Last name"/> 
        <input name='email' onChange={handleInput} required placeholder="Email" type={'email'}/> 
        <button>Next</button>
    </form>}
   { isStepTwo && <form onSubmit={createNewDancer}>
        <select name='gender' required placeholder="Gender" onChange={handleGenderInput}> 
        <option defaultChecked={true} disabled >---Select-one---</option>
        <option value={'female'} >Female</option>
        <option value={'male'}>Male</option>
        <option value={'non-binary'}>Non-binary</option>
        </select>
        <input name='location' minLength="5" maxLength="5" onChange={handleInput} type={'number'} required placeholder="Zip code"/> 
        <button >Create Account</button>
    </form>}
    </section>   
    </main>
    )

}

export default DancerSignUp