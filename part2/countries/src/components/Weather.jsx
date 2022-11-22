import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ coordinates }) => {
  const [temp, setTemp] = useState();
  const [iconSrc, setIconSrc] = useState('');
  const [iconAlt, setIconAlt] = useState('');
  const [wind, setWind] = useState();

  const hook = () => {
    const [lat, lon] = coordinates;
    const apiKey = process.env.REACT_APP_API_KEY;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        const data = response.data;
        const iconName = data.weather[0].icon;
        const weatherDesc = data.weather[0].description;
        setTemp(data.main.temp);
        setIconSrc(
          `http://openweathermap.org/img/wn/${iconName}@2x.png`
        );
        setIconAlt(weatherDesc);
        setWind(data.wind.speed);
      });
  };

  useEffect(hook, []);

  return (
    <div>
      <div>Temperature: {temp} &#8451;</div>
      <img src={iconSrc} alt={iconAlt} />
      <div>Wind speed: {wind} m/s</div>
    </div>
  );
};

export default Weather;
