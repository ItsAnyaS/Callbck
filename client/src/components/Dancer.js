import { useEffect, useState } from "react"
import '../styles/Dancer.css'

const DancerProfile = ()=> {
const [applications, setApplications] = useState([])
const [list1, setList1] = useState([])
const [list2, setList2] = useState([])
const [list3, setList3] = useState([])
const [list4, setList4] = useState([])
const [origin, setOrigin] = useState() 
const [droppedOn, setDroppedOn] = useState()

    useEffect(()=> {
        const getDancerInfo = async() => {
            let req = await fetch(`http://localhost:3000/applications_by_dancer/1`)
            let res = await req.json()
            setApplications(res)
            console.log(res)
            let applied =  await res.filter(app => { return app.status == '0'})
            setList1(applied)
            let callback1 = await res.filter(app => { return app.status == '1'})
            setList2(callback1)
            let callback2 = await res.filter(app => { return app.status == '2'})
            setList3(callback2)
            let callback3 = await res.filter(app => { return app.status == '3'})
            setList4(callback3)
        }

        getDancerInfo()
    }, [])

    const updateApplicationStaus = async(id, status) => {
        let req = await fetch(`http://localhost:3000//applications/${id}`, {
            method: 'PATCH',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({status: status})
        })
        let res = await req.json()
        console.log(res)
    }

    const handleDrop = (item, e) => {
        if (droppedOn == 'list1' && origin != 'list1'){
            setList1(prev => [...prev, item])
            
            if (origin == 'list2'){
                updateApplicationStaus(item.id, '0')
                let filteredList = list2.filter(listItem => { return listItem?.id != item?.id})
                setList2(filteredList)
            } else if (origin == 'list3'){
                updateApplicationStaus(item.id, '0')
                let filteredList = list3.filter(listItem => { return listItem?.id != item?.id})
                setList3(filteredList)
            } else if (origin == 'list4'){
                updateApplicationStaus(item.id, '0')
                let filteredList = list4.filter(listItem => { return listItem?.id != item?.id})
                setList4(filteredList)
            }
        } else if(droppedOn == 'list2'  && origin != 'list2') {
            setList2(prev => [...prev, item])
            if (origin == 'list1'){
                updateApplicationStaus(item.id, '1')
                let filteredList = list1.filter(listItem => { return listItem?.id != item?.id})
                setList1(filteredList)
            } else if (origin == 'list3'){
                updateApplicationStaus(item.id, '1')
                let filteredList = list3.filter(listItem => { return listItem?.id != item?.id})
                setList3(filteredList)
            } else if (origin == 'list4'){
                updateApplicationStaus(item.id, '1')
                let filteredList = list4.filter(listItem => { return listItem?.id != item?.id})
                setList4(filteredList)
            }
        } else if(droppedOn == 'list3'  && origin != 'list3' && origin != 'list1') {
            setList3(prev => [...prev, item])
            if (origin == 'list2'){
                updateApplicationStaus(item.id, '2')
                let filteredList = list2.filter(listItem => { return listItem?.id != item?.id})
                setList2(filteredList)
            } else if (origin == 'list4'){
                updateApplicationStaus(item.id, '2')
                let filteredList = list4.filter(listItem => { return listItem?.id != item?.id})
                setList4(filteredList)
            }
        }  else if(droppedOn == 'list4'  && origin != 'list4' && origin != 'list1' && origin != 'list2') {
            setList4(prev => [...prev, item])
            if (origin == 'list3'){
                updateApplicationStaus(item.id, '3')
                let filteredList = list3.filter(listItem => { return listItem?.id != item?.id})
                setList3(filteredList)
            }
        }
    }





return (


    <main>
        <header>
            <h1>Welcome, Dancer</h1>
        </header>
        <section id='container-wrapper'>
        <div className="container" id='list1'  onDragOver={(e)=> {e.preventDefault()}} onDragEnterCapture={(e)=>{setDroppedOn('list1')}} >
            <h3>Applied</h3>
            {list1.map(item => {
                return (
                    <p key={item.id} onDragOver={(e)=> {e.preventDefault()}} className="dragable" onDragStart={(e)=> {setOrigin(e.target.parentElement.id)}} onDragEnd={(e)=> { handleDrop(item, e);e.preventDefault()}} draggable >{item?.listing?.title}</p>
                )
            })}
            </div>

        <div className="container" id='list2' onDragOver={(e)=> {e.preventDefault()}} onDragEnterCapture={(e)=>{setDroppedOn('list2')}}>
        <h3>First callback</h3>
        {list2.map(item => {
                return (
                    <p key={item.id}  onDragOver={(e)=> {e.preventDefault()}} className="dragable" onDragStart={(e)=> {setOrigin(e.target.parentElement.id)}} onDragEnd={(e)=> {handleDrop(item, e)}} draggable >{item?.listing?.title}</p>
                )
            })}
        </div>

        <div className="container" id='list3'  onDragOver={(e)=> {e.preventDefault()}} onDragEnterCapture={(e)=>{setDroppedOn('list3')}}>
        <h3>Second callback</h3>
        {list3.map(item => {
                return (
                    <p key={item.id}  onDragOver={(e)=> {e.preventDefault()}} className="dragable" onDragStart={(e)=> {setOrigin(e.target.parentElement.id)}} onDragEnd={(e)=> {handleDrop(item, e)}} draggable='true' >{item?.listing?.title}</p>
                )
            })}
        </div>

        <div className="container"  onDragOver={(e)=> {e.preventDefault()}} id='list4' onDragEnterCapture={(e)=>{setDroppedOn('list4')}}>
        <h3>Final callback</h3>
        {list4.map(item => {
                return (
                    <p key={item.id}  onDragOver={(e)=> {e.preventDefault()}} className="dragable" onDragStart={(e)=> {setOrigin(e.target.parentElement.id)}} onDragEnd={(e)=> {handleDrop(item, e)}} draggable >{item?.listing?.title}</p>
                )
            })}
        </div>
        </section>
    </main>
    
)
}

export default DancerProfile







// We have stages 0, 1 , 2 , 3, 4
//  0 is applied, 
//  1, is first callback
//  2, is second callback,
// 3, is final callback,
// 4, is accepted

// if something starts in 0 and ends in 0 it stays zero with no change
// if an item goes to its current loction + 1 when update status + one 
// if an item goes to its current locaton -1 then upate status -1
// if an item goes to its current location where the location is > 1 more than the current location. dont do anythung