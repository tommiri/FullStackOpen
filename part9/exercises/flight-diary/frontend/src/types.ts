export type DiaryEntry = {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
};

export type NewEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
