import {useState, useEffect} from 'react'

const Search = () => {
    const [searchParams, setSearchParams] = useState({})
        const handleSearch = async() => {
            let req = await fetch('http://localhost:3000/listings_search', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(searchParams)
            })
            let res = await req.json()
            console.log(res)
        }

    const handleInput = (key, value) => {
        setSearchParams({
            ...searchParams,
            [key]: value
        })
    }

    return (
        <div>
            Search
        </div>
    )
}

export default Search