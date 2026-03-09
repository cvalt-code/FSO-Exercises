import { useState, useEffect } from 'react'
import axios from 'axios'

 
const Country = (props) => {
  console.log(props.countryList)
  if (props.countryList.length > 10) {
    return(
      <div> Too many matches, specify another filter</div>
    )
  }
  else {
    return(
      <ul>
      {props.countryList.map(name => <li key={name.common}>{name.common}</li>)}
    </ul>
    )
  }
}

const App = (props) => {
  const [country, setCountry] = useState('')
  const [countryInfo, setCountryInfo] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])

  useEffect(() => {
    console.log('effect run, country is now', country)

    // skip if currency is not defined
    if (country) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const countries = response.data.map(c => c.name)
          console.log(country)
          setCountriesFiltered(countries.filter(c => c.common.toLowerCase().startsWith(country.toLowerCase())))
 
        })
    }
  }, [country]) 

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  return (
    <div>
       find countries <input value={country} onChange={handleCountryChange}/>
       <Country countryList={countriesFiltered}></Country>
    </div>
  )
}

export default App