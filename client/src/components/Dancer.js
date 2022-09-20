import { useEffect, useState } from "react"

const Dancer = ()=> {
const [dancerInfo, setDancerInfo] = useState({})
const [currentlySelectedApplicaton, setCurrentlySelectedApplicaton] = useState({applicationId: 2, status: 'callback_2'})

useEffect(()=> {
const getDancerInfo = async() => {
    let req = await fetch(`http://localhost:3000/applications_by_dancer/1`)
    let res = await req.json()
    setDancerInfo(res)
}

getDancerInfo()
}, [])

const updateApplicationStaus = async() => {
    let req = await fetch(`http://localhost:3000//applications/${currentlySelectedApplicaton.applicationId}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({status: currentlySelectedApplicaton.status})
    })
    let res = await req.json()
    console.log(res)
}

    console.log(dancerInfo)
return (
    <div><button onClick={()=> {updateApplicationStaus()}}>Click</button></div>
    
)
}

export default Dancer