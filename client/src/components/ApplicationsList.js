import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser';
import '../styles/ApplicationsList.css'
import ApplicationsListCard from "./ApplicationListCard"
import AppModal from "./modals/AppModal";
import Cookies from "js-cookie";
const ApplicationsList = () => {
    const form = useRef({to_name: 'Anya'})
    const { id } = useParams()
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [applications1, setApplications1] = useState([])
    const [applications2, setApplications2] = useState([])
    const [applications3, setApplications3] = useState([])
    const [hired, setHired] = useState([])
    const [modalInfo, setModalInfo] = useState()
    const [numOfApps, setNumOfApps] = useState(0)
    const [refresh, setRefresh] = useState(false)

    const getApplications = async() => {
        let isCompany = Cookies.get('company-auth-token')
        if (!isCompany){
            navigate('/')
        }
        let req = await fetch(`/applications_by_listings/${id}`)
        if (req.ok){
            let res = await req.json()
            setApplications(res)
            let hiredApps = res.filter(app => app.status === 'hired')
            let notHiredApps = res.filter(app => app.status !== 'hired' && app.status !== "4")
            setNumOfApps(notHiredApps.length)
            setHired(hiredApps)
            let filteredApplications = res.filter(app => app.status === '0')
            setApplications(filteredApplications)
            filteredApplications = res.filter(app => app.status === '1')
            setApplications1(filteredApplications)
            filteredApplications = res.filter(app => app.status === '2')
            setApplications2(filteredApplications)
            filteredApplications = res.filter(app => app.status === '3')
            setApplications3(filteredApplications)
        }else {
            console.log('error')
        }
        
    }


    const updateApplication = async(listingId, status) => {
        let sendStatus 
        if (parseInt(status) < 3){
            // console.log(status)
            sendStatus = `${parseInt(status) + 1}`
        }else {
            sendStatus = 'hired'
        }
        let req = await fetch(`/applications/${listingId}`, {
            method: 'PATCH',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({status: sendStatus})
        })
        let res = await req.json()
        setModalInfo(false)
        setRefresh(prev => !prev)
        
    }

    const rejectApplication = async(listingId) => {
        let req = await fetch(`/applications/${listingId}`, {
            method: 'PATCH',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({status: '4'})
        })
        let res = await req.json()
        if (req.ok){
            let filteredApplications = applications.filter(app => app.id !== listingId)
            setApplications(filteredApplications)
            setRefresh(prev => !prev)
        }
    }

    useEffect(()=> {
        getApplications()
    }, [refresh])

    return (
        <main id='application-list-page'>
<header>
{ <h1>You currently have {numOfApps} open application{applications.length == 1? '': 's'}</h1>}
</header>
<section id='apps-page-container'>
    { applications.length !== 0 && <section id='applied'>
        <h3>Applied</h3>
        {
        applications.map(app => <ApplicationsListCard  key={app.id} app={app}  rejectApplication={rejectApplication} setModalInfo={setModalInfo}/>)
        }
    </section>}
  { applications1.length !== 0 &&  <section id="callback_1">
        <h3>First Callback</h3>
        {
        applications1.map(app => <ApplicationsListCard key={app.id} app={app}  rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
        }
    </section>}

   { applications2.length !== 0 && <section id="callback_2">
        <h3>Second Callback</h3>
        {
        applications2.map(app => <ApplicationsListCard key={app.id} app={app} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
        }
    </section>}

  { applications3.length !== 0 &&  <section id='final_callback'>
        <h3>Final Callback</h3>
        {
        applications3.map(app => <ApplicationsListCard key={app.id} app={app}  rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
        }
    </section>}
        { hired.length !== 0 && <section id='hired'>
        <h3>Hired for this position</h3>
        {hired.map( app => <div key={app.id}>{app?.dancer?.first_name} | {app?.dancer?.email}</div>)}
    </section>}
    {  modalInfo && <AppModal modalInfo={modalInfo} rejectApplication={rejectApplication} updateApplication={updateApplication} setModalInfo={setModalInfo}/>}
    </section>
</main>
    )
}

export default ApplicationsList