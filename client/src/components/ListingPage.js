import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import '../styles/ListingPage.css'
import { UserContext } from "../App"
import Cookies from "js-cookie"

const ListingPage = () => {
    let { id } = useParams()
    const [currentListingId, setCurrentListingId] = useState(id)
    const [displayedListing, setDisplayedListing] = useState({dancer_gender: [[]]})
    const [appError, setAppError] = useState('')
    const {globalUser} = useContext(UserContext)
    useEffect(()=> {
        const getCurrentListing = async()=> {
            let req = await fetch(`http://localhost:3000/listings/${currentListingId}`)
            let res = await req.json()
            if (currentListingId < 1){
                setCurrentListingId(1)
            }
            if (res == null) {
                setCurrentListingId(1)
            }
            setDisplayedListing(res)
        }
        getCurrentListing()
    },[currentListingId])
    let authToken = Cookies.get('auth-token')
    const [dancerApplicationInfo] = useState({auth_token: authToken, listing_id: currentListingId, company_id: 1, role: 'soloist'})
    
    const applyForListing = async() => {
       let req = await fetch('http://localhost:3000/applications', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(dancerApplicationInfo)
        })
        let res = await req.json()
        setAppError(res.message)
        setTimeout(() => {
            setAppError('')
        }, 4900)
    }
// console.log(displayedListing)
return (
    <main id='listing-page'>
      {appError &&  <div id='app-alert'><p>{appError}</p></div>}
        <header id='listing-page-header'>
            <div>
            <h1>{displayedListing?.title}</h1>
            <p>{new Date( displayedListing?.updated_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
            </div>
            <h2 id='listing-page-info-comp'>${displayedListing?.compensation}</h2>
        </header>
        <section id="listing-page-info">
            <h1>Description:</h1>
            <p id="listing-desc">{displayedListing?.description}</p>
            <h3>Location</h3>
            <p>{displayedListing?.location}</p>
                <h3>Dance style:</h3>
                <p className="gender-item">{displayedListing?.style}</p>
            <h3>Prefered gender:</h3>
            <div id="listing-pref-gender-container">
            {displayedListing?.dancer_gender[0].map((item, index) => {
                return (
                    <p className="gender-item" key={index} >{item}</p>
                )
            })}
            </div>
            <h3>Years of expirence required: </h3>
            <p>{displayedListing?.years_of_expirence || '0'}</p>
            <h3>Rehersals start date</h3>
            <p>{ new Date(displayedListing?.rehersal_start_date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
            <h3>Show Start Date</h3>
            <p>{new Date( displayedListing?.show_date_start).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
    { globalUser?.isDancer &&  <button className="hover" onClick={()=> {applyForListing()}}>Apply</button>}
        </section>
        <section id="listing-page-company-section">
            <div id='listing-company-name-container'>
            <img  alt={`This is a logo of ${displayedListing?.company?.name}`} src={displayedListing?.company?.logo}/>
            <h4>{displayedListing?.company?.name}</h4>
            </div>
            <h5>Company size: {displayedListing?.company?.number_of_employees > 100 ? 'Large': 'Small'}</h5>
            <p>{displayedListing?.company?.bio}</p>
            <p>{displayedListing?.company?.location}</p>
        </section>
        <section id='listing-pagination-seciton'>
       {currentListingId - 1 !== 0 ? <button className="lps-rb" onClick={()=> {setCurrentListingId(currentListingId - 1)}}>Previous listing</button>: <button className="lps-rb no-pag">Previous listing</button>}
        <button onClick={()=> {setCurrentListingId(currentListingId + 1)}}>Next listing</button>
        </section>
    </main>
)
}

export default ListingPage