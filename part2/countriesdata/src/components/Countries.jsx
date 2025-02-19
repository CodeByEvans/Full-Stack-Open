import SingleCountry from './singleCountry';
import Entry from './Entry';

const Countries = ({countries, search}) =>{

    if (search === ''){
        return
    } else if(countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }else if (countries.length === 1) {
        return(
            <div>
                <SingleCountry filteredData={countries} />
            </div>
        )
    } else {
        return (
            <div>
                {countries.map((countries) => {
                    return (<Entry country={countries}/>)
                })}
            </div>
        )
    }
}

export default Countries