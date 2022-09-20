import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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
    const [dancerApplicationInfo, setDancerApplicationInfo] = useState({dancer_id: 1, listing_id: currentListingId, company_id: 1, role: 'soloist'})
    
    const applyForListing = async() => {
        let req = await fetch('http://localhost:3000/applications', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(dancerApplicationInfo)
        })
        let res = await req.json()
        // console.log(res)
    }
// console.log(displayedListing)
return (
    <div>
        <header>
            <h1>{displayedListing?.title}</h1>
            <h2>{displayedListing?.updated_at}</h2>
            <h2>${displayedListing?.compensation}</h2>
        </header>
        <section>
            <img src={displayedListing?.image} alt='listing photo' />
            <p>{displayedListing?.description}</p>
            <p>{displayedListing?.location}</p>
            {displayedListing?.dancer_gender?.map((item, index) => {
                return (
                    <p key={index} >{item}</p>
                )
            })}
            <p>{displayedListing?.style}</p>
            <p>Years of expirence required: {displayedListing?.years_of_expirence || '0'}</p>
        <button onClick={()=> {applyForListing()}}>Apply</button>
        </section>
        <section>
            <img src={displayedListing?.company?.logo}/>
            <h4>{displayedListing?.company?.name}</h4>
            <h5>Number of Employees: {displayedListing?.company?.number_of_employees}</h5>
            <p>{displayedListing?.company?.bio}</p>
            <p>{displayedListing?.company?.location}</p>
        </section>
       {currentListingId - 1 !== 0 ? <button onClick={()=> {setCurrentListingId(currentListingId - 1)}}>previous listing</button>: <button>previous listing</button>}
        <button onClick={()=> {setCurrentListingId(currentListingId + 1)}}>next listing</button>
        {/* <p>{JSON.stringify(displayedListing)}</p> */}
    </div>
)
}

export default ListingPage