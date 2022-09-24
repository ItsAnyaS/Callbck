import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Search.css'
const Search = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useState({})
    const [listings, setListings] = useState([])
        const handleSearch = async() => {
            let req = await fetch('http://localhost:3000/listings_search', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(searchParams)
            })
            let res = await req.json()
            console.log(res)
            setListings(res)
        }

    const handleInput = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =(e) => {
        e.preventDefault()
        handleSearch()
    }

    useEffect(()=> {
        const getAllListings = async() => {
            let req = await fetch("http://localhost:3000/listings")
            let res = await req.json()
            setListings(res)
        }
        getAllListings()
    }, [])

console.log(searchParams)
    return (
        <main>
            <header>
                <form onSubmit={handleSubmit} onChange={handleInput}>
                    <input placeholder='search' name='keywords' />
                    <select name='style'>
                        <option selected="selected" value={""} >--Select a style--</option>
                        <option name='tap'>tap</option>
                        <option name='ballet'>ballet</option>
                        <option name='jazz'>jazz</option>
                        <option name='contemporary'>contemporary</option>
                    </select>
                    <input name='location' placeholder='location'/>
                    <button>Search</button>
                </form>
            </header>
            <section id='listing-container'>
            {listings.map(listing => {
                return (
                    <div className='listing-item'onClick={()=> {navigate(`/listing/${listing?.id}`)}} key={listing?.id}>
                        <div className='listing-item-info'>
                        <h4>{listing?.title}</h4>
                        <p>{listing?.description}</p>
                        </div>
                        <div className='listing-item-cta'>
                            <h5>${listing?.compensation}</h5>
                        </div>
                    </div>
                )
            })}
              
            </section>
        </main>
    )
}

export default Search