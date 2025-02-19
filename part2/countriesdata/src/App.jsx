import { useState, useEffect } from 'react'
import axios from 'axios';
import Countries from './components/Countries';
import Filter from './components/Filter';

function App() {
  const [countries, setCountries] = useState ([]);
  const [search, setSearch] = useState('')

      useEffect(() => {
        axios
          .get('https://studies.cs.helsinki.fi/restcountries/api/all')
          .then(response => {
            setCountries(response.data)
          })
          .catch(error => {
            console.error ('Error fetching countries', error)
          });
    }, [])

    const handleSearch = (e) => {
      setSearch(e.target.value)
    }

    const countriesToShow = countries.filter(country => 
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <>
      <div>
        <Filter value={search} onChange={handleSearch} />
        <Countries countries={countriesToShow} search={search} />
      </div>
    </>
  )
}

export default App
