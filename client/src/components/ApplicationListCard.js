const ApplicationsListCard = ({app, rejectApplication, setModalInfo}) => {
return (
    <div className="applicant-card" key={app.id}>
    <img alt='dancer headahot' src="https://daisybeattyphotography.com/wp-content/uploads/2016/07/ballet-dancer-headshots-manhattan-nyc-daisy-beatty-photography-684x1024(pp_w480_h718).png"/>
    <div className="applicant-card-left-container">
        <h5>{app?.dancer?.first_name}</h5>
        <p>Gender: {app?.dancer?.gender}</p>
    </div>
    <div>
            <button className="hover" onClick={()=> {rejectApplication(app.id)}}>Reject</button>
            <button className="hover" onClick={()=> {setModalInfo(app)}}>See more</button>
    </div>
</div>
)
}

export default ApplicationsListCard