import axios from "axios";
import { useState, useEffect } from 'react'

const imgStyle = {
  marginTop: '30px',
}
const Result = ({ filtered, searchTerm, setSearchTerm }) => {
  const [countryData, setCountryData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (filtered.length !== 1) {
      setCountryData(null)
      return
    }

    const fetchCountryData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${filtered[0]}`
        )
        setCountryData(response.data)
      } catch (error) {
        console.error('Failed to fetch country data:', error)
        setCountryData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchCountryData()
  }, [filtered])

  if (filtered.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  if (filtered.length > 1) {
    return (
      <div>
        <ul>
          {filtered.map((country) => (
            <li key={country}>{country}
              <button onClick={() => setSearchTerm(country)}>Show</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (filtered.length === 0) {
    return <div></div>
  }

  if (loading) {
    return <p>loading info of {filtered[0]}</p>
  }

  if (countryData) {
    return (
      <div>
        <h1>{countryData.name.common}</h1>
        <p>Capital {countryData.capital}</p>
        <p>Area {countryData.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(countryData.languages || {}).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={countryData.flags.png} style={imgStyle} />
      </div>
    )
  }
  return null
}
export default Result
