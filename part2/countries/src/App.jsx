import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import CountryList from './components/CountryList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const display = filter === '';

  const countriesToShow = display
    ? countries
    : countries.filter(({ name }) =>
        name.common.toLowerCase().includes(filter.toLowerCase())
      );

  // console.log(countriesToShow);
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
      });
  };

  useEffect(hook, []);

  const handleFilterChange = (event) => setFilter(event.target.value);

  return (
    <div>
      <Filter handleFilter={handleFilterChange} filter={filter} />
      <br />
      <CountryList
        countries={countriesToShow}
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;
