import { SyntheticEvent, useEffect, useState } from 'react';
import DiaryList from './components/DiaryList';
import { DiaryEntry } from './types';
import { getAllEntries } from './services/diaryService';
import { createEntry } from './services/diaryService';
import Notification from './components/Notification';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
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
      setNewVisibility('');
      setNewWeather('');
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
          Date
          <input
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <div>
          Visibility
          <input
            value={newVisibility}
            onChange={(e) => setNewVisibility(e.target.value)}
          />
        </div>
        <div>
          Weather
          <input
            value={newWeather}
            onChange={(e) => setNewWeather(e.target.value)}
          />
        </div>
        <div>
          Comment
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
