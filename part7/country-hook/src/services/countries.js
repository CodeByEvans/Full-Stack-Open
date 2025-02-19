import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getCountry =  (country) => {
    return axios.get(`${baseUrl}/${country}`)
    .then(response => response.data)
}

export default getCountry