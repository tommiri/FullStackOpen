import axios from 'axios';

import type { DiaryEntry, NewDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((res) => res.data);
};

export const addDiary = (newDiary: NewDiary) => {
  return axios.post<DiaryEntry>(baseUrl, newDiary).then((res) => res.data);
};
