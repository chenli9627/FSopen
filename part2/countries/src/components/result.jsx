/* import axios from "axios"
const Result = ({ filtered }) => {
    if (filtered.length > 1 || filtered.length == 0) {
        return (filtered.map((country, index) => <li key={index}>{country}</li>))
    } else {
        const info = async () => {
            const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filtered[0]}`)
            const responseData = await response.data
            // const responseData = response
            return (
                <div>
                    <h1>{filtered[0]}</h1>
                    <p>Capital {responseData.capital}</p>
                    <p>Area {responseData.area}</p>
                    <h2>Languages</h2>
                       
                    <img src={responseData.flags.png}/>
                </div>
            )
        }

        info()
    }
}


export default Result */
import axios from "axios"
import { useState, useEffect } from "react"

const Result = ({ filtered }) => {
  const [countryData, setCountryData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 如果 filtered 不是恰好1个国家，清空数据
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

  // 多个国家：显示列表
  if (filtered.length > 1) {
    return (
      <div>
        <p>找到 {filtered.length} 个国家，请缩小搜索范围：</p>
        <ul>
          {filtered.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      </div>
    )
  }

  // 没有国家
  if (filtered.length === 0) {
    return <p>请输入搜索词来查找国家</p>
  }

  // 加载中
  if (loading) {
    return <p>加载国家信息中...</p>
  }

  // 单个国家：显示详细信息
  if (countryData) {
    return (
      <div>
        <h1>{countryData.name.common}</h1>
        <p>首都: {countryData.capital?.join(', ')}</p>
        <p>面积: {countryData.area} km²</p>
        <h2>语言:</h2>
        <ul>
          {Object.values(countryData.languages || {}).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img 
          src={countryData.flags.png} 
          alt={`${countryData.name.common} 国旗`}
          style={{ width: '200px', marginTop: '10px' }}
        />
      </div>
    )
  }

  return null
}

export default Result