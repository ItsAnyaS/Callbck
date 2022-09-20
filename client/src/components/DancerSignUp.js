import { useEffect, useState } from "react"

const DancerSignUp = () => {
    const [newDancerInfo, setNewDancerInfo] = useState()
    const createNewDancer = async() => {
        let req = await fetch('http://localhost:3000/dancers', {
            method: "POST", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newDancerInfo)
            })
        let res = await req.json()
        console.log(res)
    }
    const handleInput = (key, value) => {
        setNewDancerInfo({
            ...newDancerInfo,
            [key]: value
        })
    }
    console.log(newDancerInfo)
return (
    <div><input name="first_name" onChange={(e)=> {handleInput(e.target.name, e.target.value)}}/></div>
)
}

export default DancerSignUp