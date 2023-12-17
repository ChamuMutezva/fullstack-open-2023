import { useState, useEffect } from "react";
import countriesService from "./services/countries";
const api_key = import.meta.env.VITE_WEATHER_KEY;
import axios from "axios";

function App() {
    const [countries, setCountries] = useState([]); // all countries array
    const [searchCountry, setSearchCountry] = useState(""); // Search term
    const [displayData, setDisplayData] = useState([]); // Filter array and Display content when countries are less than or equal to 10
    const [targetCountry, setTargetCountry] = useState("London"); // Display details when filter has one country
    const [weather, setWeather] = useState({});

    useEffect(() => {
        countriesService.getCountries().then((initialCountries) => {
            setCountries(initialCountries);
        });
    }, []);

    useEffect(() => {
        axios
            .get(
                `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${targetCountry}&aqi=no`
            )
            .then((response) => {
                setWeather(response.data);
            })
            .catch((error) => {
                alert(error);
            });
    }, [targetCountry]);
    console.log(weather);

    const onChange = (evt) => {
        setSearchCountry(evt.target.value);
        const filterCountries = countries.filter((country) =>
            country.name.common
                .toLowerCase()
                .includes(evt.target.value.toLowerCase())
        );
        setDisplayData(filterCountries);
        console.log(filterCountries);
        if (filterCountries.length === 1) {
            console.log(filterCountries[0].name.common);
            setTargetCountry(filterCountries[0].name.common);
        }
    };

    const handleClickCountry = (targetCountry) => {
        const filterCountries = countries.filter((country) =>
            country.name.common
                .toLowerCase()
                .includes(targetCountry.toLowerCase())
        );
        setDisplayData(filterCountries);
        if (filterCountries.length === 1) {
            console.log(filterCountries[0].name.common);
            setTargetCountry(filterCountries[0].name.common);
        }
    };

    const displayCountry = (country) => {
        console.log(country);
        return (
            <div key={country.cca3}>
                {" "}
                <h3>{country.name.common}</h3>{" "}
                <p>
                    Capital:{" "}
                    {country.capital.map((capital, idx) => (
                        <span key={idx}>{capital}</span>
                    ))}
                </p>
                <p>Area: {country.area}</p>
                <div>
                    <h3 className="text-lg font-bold">languages</h3>
                    <ul className="flex flex-wrap gap-4">
                        {Object.keys(country.languages).map((key, idx) => (
                            <li key={idx}>{country.languages[key]}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <img
                        src={country.flags.svg}
                        alt={`the flag of ${country.name.common}`}
                        className="block"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="p-8">
            <div>
                <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Find countries
                </label>
                <input
                    type="search"
                    name="country"
                    id="country"
                    value={searchCountry}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="flex flex-col gap-8 my-8">
                {displayData.length > 10 ? (
                    <p>Too many countries</p>
                ) : displayData.length > 1 ? (
                    displayData.map((country, idx) => (
                        <div key={country.cca3} className="flex gap-4">
                            <h3>{country.name.common}</h3> <span>{idx}</span>
                            <button
                                className="rounded-lg bg-slate-900 text-white p-2 min-w-[8rem]"
                                onClick={() =>
                                    handleClickCountry(country.name.common)
                                }
                            >
                                show
                            </button>
                        </div>
                    ))
                ) : (
                    <div>
                        {displayData.map((country) => displayCountry(country))}
                    </div>
                )}
            </div>
            {targetCountry && displayData.length === 1 && (
                <div>
                    <h3>Weather conditions for {weather.location.name}</h3>
                    <p>Temperature {weather.current.feelslike_c} celcius</p>
                    <img
                        src={weather.current.condition.icon}
                        alt={weather.current.condition.text}
                    />
                    <p> {weather.current.condition.text}</p>
                </div>
            )}
        </div>
    );
}

export default App;
