import { useEffect, useState } from "react"

const ListingPage = () => {
    const [currentListingId, setCurrentListingId] = useState(1)
    const [displayedListing, setDisplayedListing] = useState({})
    useEffect(()=> {
        const getCurrentListing = async()=> {
            let req = await fetch(`http://localhost:3000/listings/${currentListingId}`)
            let res = await req.json()
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
        console.log(res)
    }


return (
    <div>ListingPage
        <button onClick={()=> {setCurrentListingId(currentListingId + 1)}}>next listing</button>
        <button onClick={()=> {setCurrentListingId(currentListingId - 1)}}>previous listing</button>
        <button onClick={()=> {applyForListing()}}>Apply</button>
        {/* <p>{JSON.stringify(displayedListing)}</p> */}
    </div>
)
}

export default ListingPage