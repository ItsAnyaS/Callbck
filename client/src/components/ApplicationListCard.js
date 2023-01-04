// import headshot from '.../public/headshot'
const ApplicationsListCard = ({app, rejectApplication, setModalInfo}) => {
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
    <img alt='dancer headshot' src='/headshot.jpeg'/>
    <div className="applicant-card-left-container">
        <h5>{app?.dancer?.first_name}</h5>
    </div>
    <div>
            <button className="hover" onClick={()=> { rejectApplication(app.id)}}>Reject</button>
            <button className="hover" onClick={()=> {setModalInfo(app)}}>See more</button>
    </div>
</div>
)
}

export default ApplicationsListCard