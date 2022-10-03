const AppModal = ({modalInfo, setModalInfo, rejectApplication, updateApplication, setEmailInfo}) => {
    console.log(modalInfo)
return (
    <section onClick={()=> {setModalInfo(false)}} id='expanded-application-modal'>
               <div id="exp-app-modal-container" onClick={(e)=> {e.stopPropagation()}}>
                <div id="exp-app-top-container">
                    <div id='app-top-left'>
                        <img src={modalInfo?.dancer?.headshot}/>
                        <h3>{modalInfo?.dancer?.first_name} {modalInfo?.dancer?.last_name}</h3>
                        <p>Gender: {modalInfo?.dancer?.gender}</p>
                        <p>Email: {modalInfo?.dancer?.email}</p>
                        <p>Years of expirence: {modalInfo?.dancer?.years_of_experience}</p>
                        <a target='_blanck' href={`${modalInfo?.dancer?.dance_reel}`}>See dance reel</a>
                    </div>
                    <div id="pdf-container">
                    <iframe is="x-frame-bypass" id="embeded-pdf" src={modalInfo?.dancer?.resume} > 
                     </iframe>
                    </div>
                </div>
                <div id="exp-app-btn-container">
                    <button className="hover" onClick={()=> { setEmailInfo({user_name: 'Callbck', from_name: 'Callbck',user_email: modalInfo.dancer.email, message: `Unfortunatly, you weren't the right fit for this position.  Keep applying and you'll get there!`, to_name: modalInfo.dancer.first_name});rejectApplication(modalInfo.id); setModalInfo(false)}}>Reject</button>
                    { parseInt(modalInfo.status) < 3 &&<button className="hover" onClick={()=> {updateApplication(modalInfo.id, modalInfo.status)}}>Send Callback</button>}
                    <button className="hover" onClick={()=> {updateApplication(modalInfo.id, '3')}} >Mark as Hired</button>
                </div>
               </div>
               </section>
)
}

export default AppModal

