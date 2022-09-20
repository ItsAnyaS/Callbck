import { useEffect, useState } from "react"

const Dancer = ()=> {
const [dancerInfo, setDancerInfo] = useState({})

useEffect(()=> {
const getDancerInfo = async() => {
    let req = await fetch(`http://localhost:3000/applications_by_dancer/1`)
    let res = await req.json()
    console.log(res)
}

getDancerInfo()
}, [])

    
return (
    <div>Hello world</div>
)
}

export default Dancer