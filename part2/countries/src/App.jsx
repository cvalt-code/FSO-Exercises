import { useState, useEffect } from 'react'
import axios from 'axios'


const CountryDisplay = ({name}) => {
  const [countryData, setCountryData] = useState(null)
  const [countryWeather, setCountryWeather] = useState(null)
  useEffect(() => {
    axios
  .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
  .then( response => {
    setCountryData(response.data)
  }
  )

  }, [name])

  
  useEffect(() => {
    if (countryData){
      // We use the first capital in the array
    const capital = countryData.capital[0]
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)  
    .then( response => {
    setCountryWeather(response.data)

  }
  )}

  }, [countryData])

  if (!countryData ) {
    return <div>Loading details for {name}...</div>
  }
  if (!countryWeather ) {
    return <div>Loading weather for {name}...</div>
  }
  else {
    console.log(countryData)
    console.log(countryWeather)
    console.log(countryWeather.weather[0].icon)
  }

  return(
    <div>
      <h1>{name}</h1>

      <p>Capital: {countryData.capital}</p>
      <p>Area: {countryData.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryData.languages).map(l => (<li key={l}>{l}</li>))}
      </ul>
      <img src={countryData.flags.svg} width="300" height="200"/>
      <h2> Weather in {countryData.capital[0]}</h2>
      <p>Temperature {countryWeather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/payload/api/media/file/${countryWeather.weather[0].icon}.png`}/> 
      <p>Wind {countryWeather.wind.speed} m/s</p>   
    </div>
  )
}

const Country = (props) => {
  console.log(props.countryList)
  const handleButtonClick = (name) => {
  return(
    props.setCountry(name)
  )
}
  if (props.countryList.length > 10) {
    return(
      <div> Too many matches, specify another filter</div>
    )
  }
  if (props.countryList.length === 1) {
    return(
      <CountryDisplay name={props.countryList[0].common}/>
    )
  }

  else {
    return(
      <ul>
      {props.countryList.map(name => <li key={name.common}>{name.common} <button onClick={() => handleButtonClick(name.common)}>show</button></li>)}
    </ul>
    )
  }
}

const App = (props) => {
  const [country, setCountry] = useState('')
  const [countryInfo, setCountryInfo] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])
  const [allCountries, setAllCountries] = useState([])

useEffect(() => {
        console.log('effect run once, downloading all country data')
        console.log('fetching countries...')
        axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
        setAllCountries(response.data)
          
 
        })
    }
  , [])

  useEffect(() => {
    console.log('effect run, country is now', country)

    // skip if currency is not defined
    if (country) {
      console.log('fetching countries...')
      const countries = allCountries.map(c => c.name)
      setCountriesFiltered(countries.filter(c => c.common.toLowerCase().includes(country.toLowerCase())))
    }
  }, [country]) 

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  return (
    <div>
       find countries <input value={country} onChange={handleCountryChange}/>
       <Country countryList={countriesFiltered} setCountry={setCountry}></Country>
    </div>
  )
}

export default App