const ApplicationsListCard = ({app, rejectApplication, setModalInfo, setEmailInfo}) => {
    // user_email: 'anyasirman@outlook.com', message: 'Hi', to_name: 'Ana'
return (
    <div className="applicant-card" key={app.id}>
    <img alt='dancer headahot' src="https://daisybeattyphotography.com/wp-content/uploads/2016/07/ballet-dancer-headshots-manhattan-nyc-daisy-beatty-photography-684x1024(pp_w480_h718).png"/>
    <div className="applicant-card-left-container">
        <h5>{app?.dancer?.first_name}</h5>
        <p>Gender: {app?.dancer?.gender}</p>
    </div>
    <div>
            <button className="hover" onClick={()=> {rejectApplication(app.id)}}>Reject</button>
            <button className="hover" onClick={()=> {setModalInfo(app); setEmailInfo({user_name: 'Callbck',user_email: app.dancer.email, message: `Congradulations on the big win, ${app.company_id} decided you were the one and is excited to give you a call back.  They will be reaching out to you shortly.`, to_name: app.dancer.first_name})}}>See more</button>
    </div>
</div>
)
}

export default ApplicationsListCard