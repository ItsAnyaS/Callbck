import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../styles/ListingPage.css'

const ListingPage = () => {
    let { id } = useParams()
    const [currentListingId, setCurrentListingId] = useState(id)
    const [displayedListing, setDisplayedListing] = useState({})
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
    const [dancerApplicationInfo] = useState({dancer_id: 11, listing_id: currentListingId, company_id: 1, role: 'soloist'})
    
    const applyForListing = async() => {
        fetch('http://localhost:3000/applications', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(dancerApplicationInfo)
        })
        // let res = await .json()
        // console.log(res)
    }
// console.log(displayedListing)
return (
    <main id='listing-page'>
        <header id='listing-page-header'>
            <div>
            <h1>{displayedListing?.title}</h1>
            <p>{new Date( displayedListing?.updated_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
            </div>
            <h2 id='listing-page-info-comp'>${displayedListing?.compensation}</h2>
        </header>
        <section id="listing-page-info">
            <h1>Description:</h1>
            <p>{displayedListing?.description}</p>
            <h3>Location</h3>
            <p>{displayedListing?.location}</p>
            {/* <iframe referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/view?key=AIzaSyDej2gyib9LdZv2wQO2_6MInDwv-glcoeE&center=-33.8569,151.2152&zoom=14&maptype=satellite"
                allowfullscreen>
            </iframe> */}
            <h3>Prefered gender:</h3>
            <div id="listing-pref-gender-container">
            {displayedListing?.dancer_gender?.map((item, index) => {
                return (
                    <p key={index} >{item}</p>
                )
            })}
            </div>
            <p>{displayedListing?.style}</p>
            <h3>Years of expirence required: </h3>
            <p>{displayedListing?.years_of_expirence || '0'}</p>
        <button onClick={()=> {applyForListing()}}>Apply</button>
        </section>
        <section id="listing-page-company-section">
            <img  alt={`This is a logo of ${displayedListing?.company?.name}`} src={displayedListing?.company?.logo}/>
            <h4>{displayedListing?.company?.name}</h4>
            <h5>Number of Employees: {displayedListing?.company?.number_of_employees}</h5>
            <p>{displayedListing?.company?.bio}</p>
            <p>{displayedListing?.company?.location}</p>
        </section>
       {currentListingId - 1 !== 0 ? <button onClick={()=> {setCurrentListingId(currentListingId - 1)}}>previous listing</button>: <button>previous listing</button>}
        <button onClick={()=> {setCurrentListingId(currentListingId + 1)}}>next listing</button>
        {/* <p>{JSON.stringify(displayedListing)}</p> */}
    </main>
)
}

export default ListingPage