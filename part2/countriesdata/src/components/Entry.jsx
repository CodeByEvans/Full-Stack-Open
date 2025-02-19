import { useState } from "react"

const Entry = ({country}) => {
    const [toggle, setToggle] = useState(false)

    const toggleBtn = () => {
        setToggle((prevState) => !prevState)
    }

    return (
            <div style={{padding: "5px 0"}} key={country.cca3}>
                <p>{country.name.common} <button onClick={toggleBtn}>show</button></p>
                {toggle && (
                    <div>
                        <p>Capital: {country.capital}</p>
                        <p>Area: {country.area} </p>
                        <h2>languages:</h2>
                        <ul>
                            {Object.entries(country.languages).map(([key, language]) => (
                                <li key={key}>{language}</li>
                            ))}
                        </ul>
                        <img src={country.flags.png}/>
                    </div>
                )}
            </div>
    )
}

export default Entry