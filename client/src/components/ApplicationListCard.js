const ApplicationsListCard = ({app, rejectApplication, setModalInfo, setEmailInfo}) => {
    const handleMessageText = () => {
        if (app.status == '0'){
            return 'Call back'
        } else if (app.status == '1'){
            return 'call back 2'
        } else if (app.status == '2'){
            return 'callback 3'
        } else {
            return 'hired'
        }
    }
return (
    <div className="applicant-card" key={app.id}>
    <img alt='dancer headshot' src={app.dancer.headshot}/>
    <div className="applicant-card-left-container">
        <h5>{app?.dancer?.first_name}</h5>
    </div>
    <div>
            <button className="hover" onClick={()=> { setEmailInfo({user_name: 'Callbck', from_name: 'Callbck',user_email: app.dancer.email, message: `Unfortunatly, you weren't the right fit for this position.  Keep applying and you'll get there!`, to_name: app.dancer.first_name});rejectApplication(app.id)}}>Reject</button>
            <button className="hover" onClick={()=> {setModalInfo(app); setEmailInfo({user_name: 'Callbck', from_name: 'Callbck',user_email: app.dancer.email, message: `Exciting news!  They have decided to give you a ${handleMessageText()}, you will here from them shortly`, to_name: app.dancer.first_name})}}>See more</button>
    </div>
</div>
)
}

export default ApplicationsListCard