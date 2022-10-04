const Settings = ({globalUser, setIsSettingsOpen, setSubmitData, handleSubmit, isSettingsOpen, userInfo, handleInputChange, setSubmitType, submitData}) => {
return (
    <section id="settings-modal" onClick={()=> {setIsSettingsOpen(false); setSubmitData({})}}>
    <form onSubmit={handleSubmit} id="settings-container" className={isSettingsOpen && 'slide-up'} onClick={(e)=> {e.stopPropagation()}}>
        <h1>Settings</h1>
       { globalUser.isDancer &&  <div className="input-divider">
            <div className="input-container">
                <p>First name</p>
                <input name="first_name" value={userInfo?.first_name} onChange={handleInputChange} />
            </div>
            <div className="input-container">
                <p>Last name</p>
                <input name="last_name" value={userInfo?.last_name} onChange={handleInputChange}/>
            </div>
        </div>}
        { !globalUser.isDancer && 
        <div className="input-container">
            <p>Comapany name</p>
            <input name="name" value={userInfo?.name} onChange={handleInputChange}/>
        </div>
        }
        <hr/>
        <div className="settings-info-container">
            <div className="input-container">
                <p>Zip code</p>
                <input name="location"  value={userInfo?.location}  onChange={handleInputChange}  />
            </div>
           { globalUser.isDancer &&  <div className="input-container">
                <p>Years of expirence</p>
                <input name="years_of_experience" type={'number'} value={userInfo?.years_of_experience} onChange={handleInputChange} />
            </div>}
            { globalUser.isDancer && <div className="input-container">
                <p>Gender</p>
                <select  name='gender' id="gender-drop-down" placeholder="Gender"  onChange={handleInputChange} > 
                <option defaultChecked={true} disabled >---Select-one---</option>
                <option value={'female'} >Female</option>
                <option value={'male'}>Male</option>
                <option value={'non-binary'}>Non-binary</option>
                <option value={'other'}>Other</option>
                </select>
            </div>}
            { !globalUser.isDancer && 
            <div className="input-container">
                <p>Bio</p>
                <input name="bio" value={userInfo?.bio} onChange={handleInputChange}/>
            </div>}
            { !globalUser.isDancer && 
            <div className="input-container">
                <p>Logo</p>
                <input name="logo" value={userInfo?.logo} onChange={handleInputChange}/>
            </div>}
            { !globalUser.isDancer && 
            <div className="input-container">
                <p>Number of employees</p>
                <input name="number_of_employees" type={'number'} value={userInfo?.number_of_employees} onChange={handleInputChange}/>
            </div>}
           {!globalUser.isDancer &&  <div className="input-container">
                <p>Company type</p>
                <select name='company_type' required placeholder="Company type" onChange={handleInputChange}> 
                    <option defaultChecked={true} disabled >---Select-one---</option>
                    <option value={'not-for-profit'} >Not for Profit</option>
                    <option value={'for-profit'}>For Profit</option>
                </select>
            </div>}
                {globalUser.isDancer && <div className="input-container">
                <p>Dance reel</p>
                <input name="dance_reel" value={userInfo?.dance_reel} onChange={handleInputChange} />
            </div>}
        </div>
                <div className="settings-btn-container">
                    <button onClick={()=> {setSubmitType('delete')}} className="settings-del-btn hover">Delete Account</button>
                    <button  onClick={()=> {submitData ? setSubmitType('edit') : setSubmitType('none')}} className="settings-save-btn hover">Save</button>
                </div>
     </form>
    </section>
)
}

export default Settings