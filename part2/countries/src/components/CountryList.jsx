import Country from './Country';
import Button from './Button';

const CountryList = ({ countries, setFilter }) => {
  if (countries.length === 0) {
    return <div>No countries found!</div>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  const showCountry = (country) => {
    setFilter(country);
  };

  return countries.map((country, i) => {
    const name = country.name.common;

    return (
      <div key={i}>
        {name}
        <Button handler={() => showCountry(name)} text={'show'} />
      </div>
    );
  });
};

export default CountryList;
