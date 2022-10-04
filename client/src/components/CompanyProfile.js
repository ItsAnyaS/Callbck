import '../styles/CompanyProfile.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
const CompanyProfile = () => {
    const {globalUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [listingInfo, setListingInfo] = useState({company_auth_token: Cookies.get('company-auth-token')})
    const [isShowingCreatePostModal, setIsShowingCreatePostModal] = useState(false)
    const [currentListings, setCurrentListings] = useState([])

    useEffect(() => {
        const getCurrentListings = async() => {
            let authToken = Cookies.get('company-auth-token')
            let req = await fetch(`http://localhost:3000/listings_by_company`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({company_auth_token: authToken})
            })
            let res = await req.json()
            if (req.ok){
                setCurrentListings(res)
            }
        }
        setListingInfo({...listingInfo, gender: 'female', style: 'ballet'})
        getCurrentListings()
    }, [])

    const handleInput = (e) => {
        let key = e.target.name
        let value = e.target.value
        setListingInfo({
            ...listingInfo,
            [key]: value
        })
    }

    const handleGenderInput = (e) => {
        let value = e.target.value
        value =  value.split(',')
        setListingInfo({...listingInfo,
        dancer_gender: [value]
    })
    }

    const handleStyleInput = (e) => {
        let value = e.target.value
        value = value.split(',')
        setListingInfo({
            ...listingInfo,
            style: [value]
        })
    }

    const addListing = async(e) => {
        e.preventDefault()
        let req = await fetch('http://localhost:3000/listings', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(listingInfo)
        })
        let res = await req.json()
        if (req.ok) {
            setIsShowingCreatePostModal(false)
            setCurrentListings(prev => [...prev, res])
        }
    }

    const handleListingDelete = async(listing) => {

        let req =  await fetch(`http://localhost:3000/listings/${listing.id}`, {
            method: 'DELETE',
            headers: {"content-type": "application/json"}
        })
        let res = await req.json()
        if (req.ok) {

        let filteredListings = currentListings.filter(cur => {
            return (cur.id != listing.id)
        })
        setCurrentListings(filteredListings)
    }

    }
    return (
<main id='company-page'>
    <header id='company-page-header'>
        <h1>Welcome, {globalUser?.name}</h1>
        <button className='hover' onClick={ () => setIsShowingCreatePostModal(true) }>Create listing</button>
    </header>
   { isShowingCreatePostModal && <section id='company-post-modal' onClick={() => setIsShowingCreatePostModal(false)} >
        <form id='company-post-modal-form' onSubmit={addListing} onClick={(e) => e.stopPropagation()}>
            <h2>Create Listing</h2>
            <input onChange={handleInput} name='title' required placeholder='Listing title' />
            <textarea  onChange={handleInput} name='description' required placeholder='Proivde a detailed description of the dancers role and excpectations'/>
            <input  onChange={handleInput} name='compensation' required placeholder='What is the compensation for this role'/>
            <input  onChange={handleInput} type='datetime-local' name='rehersal_start_date' required placeholder='Rehersal start date'/>
            <input  onChange={handleInput} type='datetime-local' name='show_date_start' required placeholder='Perforamce start date'/>
            <input  onChange={handleInput} name='location' required placeholder='zipcode of location'/>
            <input  onChange={handleInput} name='years_of_expirence' required placeholder='Years of expirence'/>
            <div className='new-listing-modal-dd'>
            <label>
            Choose style:    
            <select id='create-listing-style' onChange={handleStyleInput} name='style' required placeholder='What dance styles will be utilized in this position'>
                <option value={['ballet']} >Ballet</option>
                <option value={['tap']} >Tap</option>
                <option value={['jazz']} >Jazz</option>
                <option value={['hiphop']} >Hip hop</option>
                <option value={['contemporary']} >Contemporary</option>
            </select>
            </label>
            <label>
                Choose prefered gender: 
            <select  onChange={handleGenderInput} name='dancer_gender' required placeholder='Prefered dancer gender'>
            <option value={['male']}>Male</option>
            <option value={['female']}>Female</option>
            <option value={['non-binary']}>Non-binary</option>
            <option value={['non-binary', 'male', 'female']}>Any</option>
            </select>
            </label>
            </div>
            <button className='hover'>Post listing</button>
        </form>
    </section>}
    <section id='company-page-listing-section'>
      { currentListings.length !== 0 &&  <h2>Current listings:</h2>}
        { currentListings.length === 0 &&<div><h1>You have no open listings</h1></div>}
        {currentListings.map(listing => {
            return (
                <div onClick={() => {navigate(`/listing/${listing.id}`)}} className='seller-page-listing-item' key={listing?.id}>
                    <div className='spli-wrapper'>
                    <h4>{listing?.title}</h4>
                    <p>{listing?.description}</p>
                    </div>
                    <button className='hover' id='delete-listing-company-btn' onClick={(e)=> { e.stopPropagation(); navigate(`/company/application_list/${listing.id}`)}}>See applicants</button>
                    <button className='hover' id='delete-listing-company-btn' onClick={(e)=> { e.stopPropagation() ;handleListingDelete(listing)}}>Delete</button>
                </div>
            )
        })}
    </section>
</main>
    )
}

export default CompanyProfile