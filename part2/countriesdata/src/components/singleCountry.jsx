import { useState, useEffect } from "react";
import axios from 'axios';

const SingleCountry = ({filteredData}) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${filteredData[0].capital}&appid=${import.meta.env.VITE_SOME_KEY}&units=metric`)
          .then((response) => {
            setWeather([response.data])
            console.log(response.data)
          }) 
    }, [filteredData])


    return (
        <>
            {filteredData.map(country => (
                <div key={country.cca3}>
                    <h1>{country.name.common}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area} </p>
                    <h2>languages:</h2>
                    <ul>
                        {Object.entries(country.languages).map(([key, language]) => (
                            <li key={key}>{language}</li>
                        ))}
                    </ul>
                    <img src={country.flags.png} alt="flag"/>
                    {weather.length > 0 && (
                        <div>
                            <h2>Weather in {weather[0].name}</h2>
                            <p>temperature of {weather[0].main.temp} Celsius</p>
                            <img src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`}/>
                            <p>wind {weather[0].wind.speed} m/s</p>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}

export default SingleCountry