import { useState, useEffect } from 'react'
import axios from 'axios'
import { useMemo } from 'react'
import Result from './components/Result'
// import Result from './components/Result'

const App = () => {
  // const [value, setValue] = useState('')
  // const [data, setData] = useState({})
  const [allCountries, setAllCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  // const [filtered, setFiltered] = useState([])


  useEffect(() => {
    const fetchCountries = async () => {
      console.log('begin effect')
      try {
        const response = await axios.get(
          'https://studies.cs.helsinki.fi/restcountries/api/all'
        )
        const commonNames = response.data.map(item => item.name.common)
        setAllCountries(commonNames)
        console.log('Countries fetched:', commonNames)
      } catch (error) {
        console.error('Error fetching countries:', error)
      } finally { setLoading(false) }
      console.log('end effect')
    }

    fetchCountries()
  }, [])


  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filtered = useMemo(() => {
    return allCountries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [allCountries, searchTerm])


  if (loading) return <div>loading...</div>
  return (
    <div>
      {/* <div>{allCountries.map((country, index) => <li key={index}>{index}: {country}</li>)}</div> */}
      <div>
        find countries
        <input onChange={handleChange} value={searchTerm} style={{marginLeft:'20px'}} />
      </div>
      {/* <ul>{filtered.map((country, index) => <li key={index}>{country}</li>)} */}
      {/* </ul> */}
      <ul>
        <Result filtered={filtered}searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </ul>
    </div>
  )

}


export default App
