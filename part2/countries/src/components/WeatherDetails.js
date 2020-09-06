import React from 'react';

const WeatherDetails = ({ weather }) => {
  if (weather === null) {
    return <div></div>;
  }
  return (
    <div>
      <h2>Current weather in {weather.city}</h2>
      <p>
        <b>{weather.description}</b>
      </p>
      <p>
        <b>Temperature: </b> {weather.temperature} celsius
      </p>
      <p>
        <b>Wind: </b> {weather.windSpeed} {weather.windDir}
      </p>
      <img src={weather.icon} alt={`${weather.city} weather`}></img>
    </div>
  );
};

export default WeatherDetails;
