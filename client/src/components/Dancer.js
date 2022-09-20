import { useEffect, useState } from "react"

const DancerProfile = ()=> {
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
}
return (
    <div>Dancer Profile</div>
    
)
}

export default DancerProfile