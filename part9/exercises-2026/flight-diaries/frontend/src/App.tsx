import { useEffect, useState } from 'react';
import { getAllDiaries, addDiary } from './services/diaryService';

import type { DiaryEntry, NewDiary } from './types';
import NewEntryForm from './components/NewEntryForm';
import Notify from './components/Notify';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handleCreateDiary = async (content: NewDiary) => {
    try {
      const newDiary = await addDiary(content);
      setDiaries((prev) => prev.concat(newDiary));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        notify(error.response?.data);
      } else {
        notify('Error: something went wrong.');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notify errorMessage={errorMessage} />
      <NewEntryForm onSubmit={handleCreateDiary} />

      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
          {d.comment && <div>comment: {d.comment}</div>}
        </div>
      ))}
    </div>
  );
}

export default App;
