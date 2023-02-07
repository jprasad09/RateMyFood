import React, { useState } from 'react'
import styles from './searchBar.module.css'
import { getRestaurantsAfterSearch } from '../../../redux/actions/restaurant.action'
import { useDispatch } from 'react-redux'

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("")

    const dispatch = useDispatch()

    return (
        <div className={styles.searchBarContainer}>
            <input
                className={styles.searchBarInput} 
                key="search-bar"
                value={searchInput}
                placeholder={"Search Restaurants"}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={() => dispatch(getRestaurantsAfterSearch(searchInput))} className={styles.searchBarButton}>Search</button>
        </div>
    )
}

export default SearchBar