import { useState } from 'react';
import { Visibility, type NewDiary, Weather } from '../types';

type Props = {
  onSubmit: (entry: NewDiary) => Promise<void> | void;
};

const NewEntryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const createDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await onSubmit({
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };
  return (
    <>
      <form onSubmit={createDiary}>
        <div>
          <label htmlFor="diaryDate">date</label>
          <input
            type="date"
            name="diaryDate"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div>
          <span style={{ marginRight: '0.75rem' }}>visibility</span>
          {Object.values(Visibility).map((value) => (
            <span key={value} style={{ marginRight: '0.5rem' }}>
              <label htmlFor={`visibility-${value}`}>{value}</label>
              <input
                type="radio"
                name="visibility"
                id={`visibility-${value}`}
                value={value}
                checked={visibility === value}
                onChange={(event) => setVisibility(event.target.value)}
                required
              />
            </span>
          ))}
        </div>

        <div>
          <span style={{ marginRight: '0.75rem' }}>weather</span>
          {Object.values(Weather).map((value) => (
            <span key={value} style={{ marginRight: '0.5rem' }}>
              <label htmlFor={`weather-${value}`}>{value}</label>
              <input
                type="radio"
                name="weather"
                id={`weather-${value}`}
                value={value}
                checked={weather === value}
                onChange={(event) => setWeather(event.target.value)}
                required
              />
            </span>
          ))}
        </div>

        <div>
          <label htmlFor="comment">comment</label>
          <input
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewEntryForm;
