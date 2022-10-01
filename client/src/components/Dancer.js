import { useEffect, useState, useContext } from "react"
import '../styles/Dancer.css'
import {UserContext} from '../App'
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
const DancerProfile = ()=> {
    const navigate =useNavigate()
    const {globalUser} = useContext(UserContext)
const [list1, setList1] = useState([])
const [list2, setList2] = useState([])
const [list3, setList3] = useState([])
const [list4, setList4] = useState([])

    useEffect(()=> {
        const getDancerInfo = async() => {
            let authToken = Cookies.get('auth-token')
            let req = await fetch(`http://localhost:3000/applications_by_dancer`, {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({auth_token: authToken})
            })
            let res = await req.json()
            // console.log(res)
            let applied =  await res.filter(app => { return app.status === '0'})
            setList1(applied)
            let callback1 = await res.filter(app => { return app.status === '1'})
            setList2(callback1)
            let callback2 = await res.filter(app => { return app.status === '2'})
            setList3(callback2)
            let callback3 = await res.filter(app => { return app.status === '3'})
            setList4(callback3)
        }

        getDancerInfo()
    }, [])



    

return (


    <main id='dancer-page'>
        <header id='dancer-header'>
            <h1>Welcome, {globalUser?.first_name}</h1>
        </header>
        <section id='container-wrapper'>
            <h1>Current applications:</h1>
       { list1.length !== 0 && <div className="container" id='list1'  >
            <h3>Applied</h3>
            {list1.map(item => {
                return (
                    <div key={item.id} className='dancer-app-item'>
                        <div>
                        <h4>{item?.listing?.title}</h4>
                        <p>Applied: {new Date( item?.listing?.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
                        </div>
                        <button onClick={()=> {navigate(`/listing/${item.listing.id}`)}} className="hover">Visit listing</button>
                        </div>
                )
            })}
            </div>}

            { list2.length !== 0 && <div className="container" id='list2'  >
            <h3>First callback</h3>
            {list2.map(item => {
                return (
                    <div key={item.id} className='dancer-app-item'>
                        <div>
                        <h4>{item?.listing?.title}</h4>
                        <p>Applied: {new Date( item?.listing?.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
                        </div>
                        <button onClick={()=> {navigate(`/listing/${item.listing.id}`)}} className="hover">Visit listing</button>
                        </div>
                )
            })}
            </div>}

            { list3.length !== 0 && <div className="container" id='list3'  >
            <h3>Second callback</h3>
            {list3.map(item => {
                return (
                    <div key={item.id} className='dancer-app-item'>
                        <div>
                        <h4>{item?.listing?.title}</h4>
                        <p>Applied: {new Date( item?.listing?.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
                        </div>
                        <button onClick={()=> {navigate(`/listing/${item.listing.id}`)}} className="hover">Visit listing</button>
                        </div>
                )
            })}
            </div>}

            { list4.length !== 0 && <div className="container" id='list4'  >
            <h3>Final callback</h3>
            {list4.map(item => {
                return (
                    <div key={item.id} className='dancer-app-item'>
                        <div>
                        <h4>{item?.listing?.title}</h4>
                        <p>Applied: {new Date( item?.listing?.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
                        </div>
                        <button onClick={()=> {navigate(`/listing/${item.listing.id}`)}} className="hover">Visit listing</button>
                        </div>
                )
            })}
            </div>}
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