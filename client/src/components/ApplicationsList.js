import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import emailjs from '@emailjs/browser';
import '../styles/ApplicationsList.css'
import ApplicationsListCard from "./ApplicationListCard"
import AppModal from "./AppModal";
const ApplicationsList = () => {
    const form = useRef({to_name: 'Anya'})
    const { id } = useParams()
    const [applications, setApplications] = useState([])
    const [applications1, setApplications1] = useState([])
    const [applications2, setApplications2] = useState([])
    const [applications3, setApplications3] = useState([])
    const [hired, setHired] = useState([])
    const [modalInfo, setModalInfo] = useState()
    const [numOfApps, setNumOfApps] = useState(0)
    const [emailInfo, setEmailInfo] = useState({user_name: '', user_email: '', to_name: '', message: ''})
    const [refresh, setRefresh] = useState(false)

    const getApplications = async() => {
        let req = await fetch(`http://localhost:3000/applicaitons_by_listings/${id}`)
        let res = await req.json()
        setApplications(res)
        let hiredApps = res.filter(app => app.status === 'hired')
        let notHiredApps = res.filter(app => app.status !== 'hired')
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
        
    }

    const sendEmail = () => {
        emailjs.sendForm('service_i8bn0me', 'template_zh7l9ng', form.current, '-7XoatvWc_L2_1I1v')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };

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
        sendEmail()
        setRefresh(prev => !prev)
        
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
    <form id="no-form" ref={form} onSubmit={(e) => {e.preventDefault()}}>
        <label>Name</label>
        <input readOnly type="text" name="user_name" value={emailInfo.user_name} />
        <label>to</label>
        <input readOnly type="text" name="to_name" value={emailInfo.to_name}  />
        <label>Email</label>
        <input readOnly type="email" name="user_email" value={emailInfo.user_email}/>
        <label>Message</label>
        <textarea readOnly name="message"  value={emailInfo.message}/>
        <input type="submit" value="Send"/>
    </form>
</header>
<section id='apps-page-container'>
    { applications.length !== 0 && <section id='applied'>
        <h3>Applied</h3>
        {
        applications.map(app => <ApplicationsListCard  key={app.id} app={app} setEmailInfo={setEmailInfo} rejectApplication={rejectApplication} setModalInfo={setModalInfo}/>)
        }
    </section>}
  { applications1.length !== 0 &&  <section id="callback_1">
        <h3>First Callback</h3>
        {
        applications1.map(app => <ApplicationsListCard key={app.id} app={app} setEmailInfo={setEmailInfo} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
        }
    </section>}

   { applications2.length !== 0 && <section id="callback_2">
        <h3>Second Callback</h3>
        {
        applications2.map(app => <ApplicationsListCard key={app.id} app={app} setEmailInfo={setEmailInfo} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
        }
    </section>}

  { applications3.length !== 0 &&  <section id='final_callback'>
        <h3>Final Callback</h3>
        {
        applications3.map(app => <ApplicationsListCard key={app.id} app={app} setEmailInfo={setEmailInfo} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
        }
    </section>}
        { hired.length !== 0 && <section id='hired'>
        <h3>Hired for this position</h3>
        {hired.map( app => <p key={app.id}>{app?.dancer?.first_name}</p>)}
    </section>}
    {  modalInfo && <AppModal modalInfo={modalInfo} rejectApplication={rejectApplication} updateApplication={updateApplication} setModalInfo={setModalInfo}/>}
    </section>
</main>
    )
}

export default ApplicationsList