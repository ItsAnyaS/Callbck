import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import emailjs from '@emailjs/browser';
import '../styles/ApplicationsList.css'
import ApplicationsListCard from "./ApplicationListCard"
const ApplicationsList = () => {
    const form = useRef({to_name: 'Anya'})
    const { id } = useParams()
    const [applications, setApplications] = useState([])
    const [modalInfo, setModalInfo] = useState()
    const [numOfApps, setNumOfApps] = useState(0)
    const [emailInfo, setEmailInfo] = useState({user_name: '', user_email: '', to_name: '', message: ''})
    const [refresh, setRefresh] = useState(false)

    const getApplications = async() => {
        let req = await fetch(`http://localhost:3000/applicaitons_by_listings/${id}`)
        let res = await req.json()
        setApplications(res)
        let filteredApps = applications.filter(app => app.status !== 'hired')
        setNumOfApps(filteredApps.length)
        console.log(res)

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
        console.log (res)
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
    console.log(emailInfo)

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
            <section id='applied'>
            <h3>Applied</h3>
               {
                applications.filter( app => app.status === '0').map(app => <ApplicationsListCard  key={app.id} app={app} setEmailInfo={setEmailInfo} rejectApplication={rejectApplication} setModalInfo={setModalInfo}/>)
               }
            </section>
            <section id="callback_1">
            <h3>First Callback</h3>
            {
                applications.filter( app => app.status === '1').map(app => <ApplicationsListCard key={app.id} app={app} setEmailInfo={setEmailInfo} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
               }
            </section>

            <section id="callback_2">
            <h3>Second Callback</h3>
            {
                applications.filter( app => app.status === '2').map(app => <ApplicationsListCard key={app.id} app={app} setEmailInfo={setEmailInfo} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
               }
            </section>

            <section id='final_callback'>
                <h3>Final Callback</h3>
            {
                applications.filter( app => app.status === '3').map(app => <ApplicationsListCard key={app.id} app={app} setEmailInfo={setEmailInfo} rejectApplication={rejectApplication}setModalInfo={setModalInfo}/>)
               }
            </section>
            <section id='hired'>
                <h3>Hired for this position</h3>
                {applications.filter(app => app.status === 'hired').map( app => <p key={app.id}>{app?.dancer?.first_name}</p>)}

            </section>
            {  modalInfo && <section onClick={()=> {setModalInfo(false)}} id='expanded-application-modal'>
               <div id="exp-app-modal-container" onClick={(e)=> {e.stopPropagation()}}>
                <div id="exp-app-top-container">
                    <div id='app-top-left'>
                        <img src={modalInfo?.dancer?.headshot}/>
                        <h3>{modalInfo?.dancer?.first_name} {modalInfo?.dancer?.last_name}</h3>
                        <p>Gender: {modalInfo?.dancer?.gender}</p>
                        <p>Email: {modalInfo?.dancer?.email}</p>
                        <p>Years of expirence: {modalInfo?.dancer?.years_of_expirence || 0}</p>
                        <a href={`${modalInfo?.dancer?.dance_reel}`}>See dance reel</a>
                    </div>
                    <div id="pdf-container">
                    <iframe is="x-frame-bypass" id="embeded-pdf" src={modalInfo?.dancer?.resume} > 
                     </iframe>
                    </div>
                </div>
                <div id="exp-app-btn-container">
                    <button className="hover" onClick={()=> {rejectApplication(modalInfo?.id); setModalInfo(false)}}>Reject</button>
                    { parseInt(modalInfo.status) < 3 &&<button className="hover" onClick={()=> {updateApplication(modalInfo.id, modalInfo.status)}}>Send Callback</button>}
                    <button className="hover" onClick={()=> {updateApplication(modalInfo.id, '3')}} >Mark as Hired</button>
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