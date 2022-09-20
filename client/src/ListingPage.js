import { useEffect, useState } from "react"

const ListingPage = () => {
    const [currentListingId, setCurrentListingId] = useState(1)
    const [displayedListing, setDisplayedListing] = useState({})
    useEffect(()=> {
        const getCurrentListing = async()=> {
            //why is it giving me the number + 1
            let req = await fetch('http://localhost:3000/listings/3')
            let res = await req.json()
            setDisplayedListing(res)
            console.log(displayedListing)
        }
        getCurrentListing()
    },[])
return (
    <div>ListingPage</div>
)
}

export default ListingPage