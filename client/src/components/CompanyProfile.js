import '../styles/CompanyProfile.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import CreateListing from './modals/CreateListing'
const CompanyProfile = () => {
    const {globalUser} = useContext(UserContext)
    const navigate = useNavigate()

    const [listingInfo, setListingInfo] = useState({company_auth_token: Cookies.get('company-auth-token')})
    const [isShowingCreatePostModal, setIsShowingCreatePostModal] = useState(false)
    const [currentListings, setCurrentListings] = useState([])

    useEffect(() => {
        const getCurrentListings = async() => {
            let authToken = Cookies.get('company-auth-token')
            let req = await fetch(`/listings_by_company`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({company_auth_token: authToken})
            })
            if (req.ok){
                let res = await req.json()
                setCurrentListings(res)
            }else {
                navigate('/')
            }
        }
        setListingInfo({...listingInfo, dancer_gender: [['male']], style: ['ballet']})
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

    const handleSpecialInput = (e, inputType) => {
        let value = e.target.value
        value =  value.split(',')
        setListingInfo({...listingInfo,
        [inputType]: [value]
    })
    }


    const addListing = async(e) => {
        e.preventDefault()
        let req = await fetch('/listings', {
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
        let req =  await fetch(`/listings/${listing.id}`, {
            method: 'DELETE',
            headers: {"content-type": "application/json"}
        })
        if (req.ok) {
        let filteredListings = currentListings.filter(curListing => {
            return (curListing.id !== listing.id)
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
    { isShowingCreatePostModal && 
        <CreateListing
        handleSpecialInput={handleSpecialInput}
        handleInput={handleInput}
        addListing={addListing}
        setIsShowingCreatePostModal={setIsShowingCreatePostModal}
        />
        }
        <section id='company-page-listing-section'>
        { currentListings.length !== 0 && 
        <h2>Current listings:</h2>}
        { currentListings.length === 0 &&
            <div>
                <h1>You have no open listings</h1>
            </div>}
            {currentListings.map(listing => {
                return (
                    <div onClick={() => {navigate(`/listing/${listing.id}`)}} className='seller-page-listing-item' key={listing?.id}>
                        <div className='spli-wrapper'>
                        <h4>{listing?.title}</h4>
                        <p>{listing?.description}</p>
                        </div>
                        <button className='hover' id='delete-listing-company-btn' onClick={(e)=> { e.stopPropagation(); navigate(`/dancer-applications/${listing.id}`)}}>See applicants</button>
                        <button className='hover' id='delete-listing-company-btn' onClick={(e)=> { e.stopPropagation() ;handleListingDelete(listing)}}>Delete</button>
                    </div>
                )
            })}
        </section>
    </main>
    )
}

export default CompanyProfile