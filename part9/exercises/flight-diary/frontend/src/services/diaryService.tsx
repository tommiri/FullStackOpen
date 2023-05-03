import axios from 'axios';
import { DiaryEntry, NewEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllEntries = async () => {
  try {
    const res = await axios.get<DiaryEntry[]>(baseUrl);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const createEntry = async (object: NewEntry) => {
  try {
    const res = await axios.post<DiaryEntry>(baseUrl, object);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
