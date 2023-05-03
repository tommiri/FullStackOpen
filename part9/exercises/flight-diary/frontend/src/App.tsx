import { SyntheticEvent, useEffect, useState } from 'react';

import { DiaryEntry, Visibility, Weather } from './types';
import { getAllEntries, createEntry } from './services/diaryService';

import DiaryList from './components/DiaryList';
import Notification from './components/Notification';
import Radio from './components/Radio';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState<Visibility>(
    Visibility.Great
  );
  const [newWeather, setNewWeather] = useState<Weather>(
    Weather.Sunny
  );
  const [newComment, setNewComment] = useState('');
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getEntries = async () => {
      try {
        const data = await getAllEntries();
        setEntries(data);
      } catch (error) {
        setHasError(true);
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage('Something went wrong.');
        }
      }
    };

    getEntries();
  }, []);

  const entryCreation = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await createEntry({
        date: newDate,
        visibility: newVisibility,
        weather: newWeather,
        comment: newComment,
      });

      setHasError(false);
      setEntries(entries.concat(data));
      setNewDate('');
      setNewVisibility(Visibility.Great);
      setNewWeather(Weather.Sunny);
      setNewComment('');
      setMessage('Successfully created new entry!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setHasError(true);
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Something went wrong.');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={message} error={hasError} />
      <form onSubmit={entryCreation}>
        <div>
          Date:
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <div>
          Visibility:
          <Radio
            label="Great"
            name="visibility"
            value={newVisibility}
            onChange={() => setNewVisibility(Visibility.Great)}
            checked
          />
          <Radio
            label="Good"
            name="visibility"
            value={newVisibility}
            onChange={() => setNewVisibility(Visibility.Good)}
          />
          <Radio
            label="Ok"
            name="visibility"
            value={newVisibility}
            onChange={() => setNewVisibility(Visibility.Ok)}
          />
          <Radio
            label="Poor"
            name="visibility"
            value={newVisibility}
            onChange={() => setNewVisibility(Visibility.Poor)}
          />
        </div>
        <div>
          Weather:
          <Radio
            label="Sunny"
            name="Weather"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Sunny)}
            checked
          />
          <Radio
            label="Rainy"
            name="Weather"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Rainy)}
          />
          <Radio
            label="Cloudy"
            name="Weather"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Cloudy)}
          />
          <Radio
            label="Stormy"
            name="Weather"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Stormy)}
          />
          <Radio
            label="Windy"
            name="Weather"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Windy)}
          />
        </div>
        <div>
          Comment:
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <DiaryList entries={entries} />
    </div>
  );
};

export default App;
