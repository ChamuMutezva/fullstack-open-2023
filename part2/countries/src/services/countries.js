import axios from "axios";
// const api_key = import.meta.env.VITE_SOME_KEY;

const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`;
const weatherstackUrl=`http://api.weatherstack.com/current?access_key=d4b3c6fb12681e77040741800fa1d9d4&query=Harare`

const getCountries = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};

const getWeather = async () => {
    const request = axios.get(weatherstackUrl);
    const response = await request;
    return response.data;
};

export default { getCountries, getWeather };
