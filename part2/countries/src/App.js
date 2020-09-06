import React, { useEffect, useState } from 'react';

import CountryList from './components/CountryList';
import Filter from './components/Filter';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow = searchName
    ? countries.filter((country) => country.name.toLowerCase().includes(searchName.toLowerCase()))
    : countries;

  return (
    <div>
      <Filter
        string={searchName}
        handleChange={(event) => setSearchName(event.target.value)}
      ></Filter>
      <CountryList countries={countriesToShow} setSearchName={setSearchName}></CountryList>
    </div>
  );
};

export default App;
