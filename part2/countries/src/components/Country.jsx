import Weather from './Weather';

const Country = ({ country }) => {
  const name = country.name.common;
  const capital = country.capital[0];
  const capitalCoords = country.capitalInfo.latlng;
  const area = country.area;
  const languages = Object.values(country.languages);
  const flag = country.flags.png;

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <img src={flag} alt={`Flag of ${name}`} />
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
      </div>

      <div>
        <h3>Languages</h3>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Weather in {capital}</h2>
        <Weather coordinates={capitalCoords} />
      </div>
    </div>
  );
};

export default Country;
