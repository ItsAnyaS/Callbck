import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../styles/ApplicationsList.css'
import ApplicationsListCard from "./ApplicationListCard"
const ApplicationsList = () => {
    const { id } = useParams()
    const [applications, setApplications] = useState([])
    const [modalInfo, setModalInfo] = useState()
    const [numOfApps, setNumOfApps] = useState(0)

    const getApplications = async() => {
        let req = await fetch(`http://localhost:3000/applicaitons_by_listings/${id}`)
        let res = await req.json()
        setApplications(res)
        let filteredApps = applications.filter(app => app.status !== 'hired')
        setNumOfApps(filteredApps.length)

    }

    const updateApplication = async(listingId, status) => {
        let sendStatus 
        if (parseInt(status) < 3){
            console.log(status)
            sendStatus = `${parseInt(status) + 1}`
        }else {
            sendStatus = 'hired'
        }
        let req = await fetch(`http://localhost:3000/applications/${listingId}`, {
            method: 'PATCH',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({status: sendStatus})
        })
        let res = await req.json()
        setModalInfo(false)
        console.log (res)
    }

    const rejectApplication = async(listingId) => {
        let req = await fetch(`http://localhost:3000/applications/${listingId}`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json"}
        })
        let res = await req.json()
        console.log(res)
        if (req.ok){
            let filteredApplications = applications.filter(app => app.id !== listingId)
            setApplications(filteredApplications)
        }
    }

    useEffect(()=> {
        getApplications()
    }, [])

    return (
        <main id='application-list-page'>
            <header>
            { <h1>You currently have {numOfApps} open application{applications.length == 1? '': 's'}</h1>}
            </header>
            <section id='applied'>
            <h3>Applied</h3>
               {
                applications.filter( app => app.status === '0').map(app => <ApplicationsListCard app={app} rejectApplication={rejectApplication} setModalInfo={setModalInfo}/>)
               }
            </section>
            <section id="callback_1">
            <h3>First Callback</h3>
            {
                applications.filter( app => app.status === '1').map(app => <ApplicationsListCard app={app} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
               }
            </section>

            <section id="callback_2">
            <h3>Second Callback</h3>
            {
                applications.filter( app => app.status === '2').map(app => <ApplicationsListCard app={app} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
               }
            </section>

            <section id='final_callback'>
                <h3>Final Callback</h3>
            {
                applications.filter( app => app.status === '3').map(app => <ApplicationsListCard app={app} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
               }
            </section>
            {  modalInfo && <section onClick={()=> {setModalInfo(false)}} id='expanded-application-modal'>
               <div id="exp-app-modal-container" onClick={(e)=> {e.stopPropagation()}}>
                <div id="exp-app-top-container">
                    <div id='app-top-left'>
                        <img src="https://daisybeattyphotography.com/wp-content/uploads/2016/07/ballet-dancer-headshots-manhattan-nyc-daisy-beatty-photography-684x1024(pp_w480_h718).png"/>
                        <h3>{modalInfo?.dancer?.first_name} {modalInfo?.dancer?.last_name}</h3>
                        <p>Gender: {modalInfo?.dancer?.gender}</p>
                        <p>Email: {modalInfo?.dancer?.email}</p>
                        <p>Years of expirence: {modalInfo?.dancer?.years_of_expirence || 0}</p>
                        <a href={`${modalInfo?.dancer?.dance_reel}`}>See dance reel</a>
                    </div>
                    <div id="pdf-container">
                    <iframe id="embeded-pdf" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf" > 
                     </iframe>
                    </div>
                </div>
                <div id="exp-app-btn-container">
                    <button onClick={()=> {rejectApplication(modalInfo?.id); setModalInfo(false)}}>Reject</button>
                    { parseInt(modalInfo.status) < 3 &&<button onClick={()=> {updateApplication(modalInfo.id, modalInfo.status)}}>Send Callback</button>}
                    <button onClick={()=> {updateApplication(modalInfo.id, '3')}} >Mark as Hired</button>
                </div>
                {/* <div id="exp-app-bottom-container">
                    <button>Previous</button>
                    <button>Next</button>
                </div> */}
               </div>
               </section>}
        </main>
    )
}

export default ApplicationsList