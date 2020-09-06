import React, { useEffect, useState } from 'react';

import WeatherDetails from './WeatherDetails';
import axios from 'axios';

const weatherStackApiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY;

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${country.capital}`
      )
      .then((response) => {
        const weatherData = response.data.current;
        setWeather({
          city: country.city,
          description: weatherData.weather_descriptions[0],
          temperature: weatherData.temperature,
          windSpeed: weatherData.wind_speed,
          windDir: weatherData.wind_dir,
          icon: weatherData.weather_icons[0],
        });
      });
  }, [country]);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`$flag {country.name}`}
        style={{ width: '20%', height: 'auto' }}
      ></img>
      <WeatherDetails weather={weather}></WeatherDetails>
    </div>
  );
};

const Country = ({ country, setSearchName }) => {
  const setSelectedCountry = () => {
    setSearchName(country.name);
  };
  return (
    <div>
      {country.name} <button onClick={setSelectedCountry}>Show</button>
    </div>
  );
};

const CountryList = ({ countries, setSearchName }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <Country
            key={country.numericCode}
            country={country}
            setSearchName={setSearchName}
          ></Country>
        ))}
        ;
      </div>
    );
  }

  return (
    <div>
      <div>
        {countries.map((country) => (
          <CountryDetails key={country.numericCode} country={country}></CountryDetails>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
