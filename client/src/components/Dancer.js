import { useEffect, useState } from "react"
import '../styles/Dancer.css'

const DancerProfile = ()=> {
const [currentlySelectedApplicaton, setCurrentlySelectedApplicaton] = useState()
const [applications, setApplications] = useState([])
const [list1, setList1] = useState([])
const [list2, setList2] = useState([])

useEffect(()=> {
const getDancerInfo = async() => {
    let req = await fetch(`http://localhost:3000/applications_by_dancer/1`)
    let res = await req.json()
    setApplications(res)
    console.log(res)
    let applied =  await res.filter(app => { return app?.status == 'applied'})
    setList1(applied)
    let callback1 = await res.filter(app => { return app?.status == 'callback_1'})
    setList2(callback1)
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



const [origin, setOrigin] = useState() 

const [droppedOn, setDroppedOn] = useState()

const handleDrop = (item) => {
    if (droppedOn == 'list1' && origin != 'list1'){
        setList1(prev => [...prev, item])
        if (origin == 'list2'){
            let filteredList = list2.filter(listItem => { return listItem?.id != item?.id})
            setList2(filteredList)
        }
    } else if(droppedOn == 'list2'  && origin != 'list2') {
        setList2(prev => [...prev, item])
        if (origin == 'list1'){
            let filteredList = list1.filter(listItem => { return listItem?.id != item?.id})
            setList1(filteredList)
        }
    }
}
const handleStatusChange = (currentStatus) => {
if (currentStatus == 'applied'){
    return 'callback_1'
} else if ( currentStatus == 'callback_1'){
    return 'callback_2'
} else if (currentStatus == 'callback_2'){
    return 'final_callback'
}
}



return (


    <main>
        <header>
            <h1>Welcome, Dancer</h1>
        </header>
        <div className="container" id='list1' onDragEnterCapture={(e)=>{setDroppedOn('list1'); console.log('enter')}} >
            {list1.map(item => {
                return (
                    <p className="dragable" onDragStart={(e)=> {setOrigin(e.target.parentElement.id)}} onDragEnd={(e)=> {handleDrop(item);  setCurrentlySelectedApplicaton({applicationId:item?.id, status: handleStatusChange(item.status)}); updateApplicationStaus()}} draggable >{item?.listing?.title}</p>
                )
            })}
            </div>
        <div className="container" id='list2' onDragEnterCapture={(e)=>{setDroppedOn('list2')}}>
        {list2.map(item => {
                return (
                    <p className="dragable" onDragStart={(e)=> {setOrigin(e.target.parentElement.id)}}  onDragEnd={(e)=> {handleDrop(item);  setCurrentlySelectedApplicaton({applicationId:item?.id, status: handleStatusChange(item.status)});updateApplicationStaus()}} draggable >{item?.listing?.title}</p>
                )
            })}
        </div>
    </main>
    
)
}

export default DancerProfile
