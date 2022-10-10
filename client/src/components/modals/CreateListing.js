 const CreateListing = ({handleSpecialInput, handleInput, addListing, setIsShowingCreatePostModal}) => {
    return (
        <section id='company-post-modal' onClick={() => setIsShowingCreatePostModal(false)} >
        <form id='company-post-modal-form' onSubmit={addListing} onClick={(e) => e.stopPropagation()}>
            <h2>Create Listing</h2>
            <div className='input-container'>
            <p>Listing title</p>
            <input onChange={handleInput} name='title' required />

            </div>
            <div className='input-container'>
            <p>Description</p>
            <textarea  onChange={handleInput} id='listing-desc-creact' name='description' required placeholder='Proivde a detailed description of the dancers role and excpectations'/>
            </div>
            <div className='input-container'>
                <p>Compensation</p>
            <input  onChange={handleInput} name='compensation' required />
            </div>
            <div className='input-container'>
                <p>Rehersal start date</p>
            <input  onChange={handleInput} type='datetime-local' name='rehersal_start_date' required placeholder='Rehersal start date'/>
            </div>
            <div className='input-container'>
            <p>Show start date</p>
            <input  onChange={handleInput} type='datetime-local' name='show_date_start' required placeholder='Perforamce start date'/>
            </div>
            <div className='input-container'>
            <p>Location</p>
            <input  onChange={handleInput} name='location' minLength='5' maxLength='5' type={'number'} required placeholder='Zip code'/>
            </div>
            <div className='input-container'>
            <p>Years of expirence</p>
            <input  onChange={handleInput} name='years_of_expirence' type={'number'} required />
            </div>
            <div className='new-listing-modal-dd'>
            <label>
            Choose style:    
            <select id='create-listing-style' onChange={(e)=>handleSpecialInput(e, 'style')} name='style' required placeholder='What dance styles will be utilized in this position'>
                <option value={['ballet']} >Ballet</option>
                <option value={['tap']} >Tap</option>
                <option value={['jazz']} >Jazz</option>
                <option value={['hiphop']} >Hip hop</option>
                <option value={['contemporary']} >Contemporary</option>
            </select>
            </label>
            <label>
                Choose prefered gender: 
            <select  onChange={(e)=> handleSpecialInput(e, 'dancer_gender')} name='dancer_gender' required placeholder='Prefered dancer gender'>
            <option value={['male']}>Male</option>
            <option value={['female']}>Female</option>
            <option value={['non-binary']}>Non-binary</option>
            <option value={['non-binary', 'male', 'female']}>Any</option>
            </select>
            </label>
            </div>
            <button className='hover'>Post listing</button>
        </form>
    </section>
    )
 }

 export default CreateListing