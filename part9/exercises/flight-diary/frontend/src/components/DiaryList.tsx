import { NonSensitiveDiaryEntry } from '../types';
import ListEntry from './ListEntry';

type DiaryListProps = {
  entries: NonSensitiveDiaryEntry[];
};

const DiaryList = ({ entries }: DiaryListProps) => {
  return (
    <>
      {entries.map((e) => (
        <ListEntry key={e.id} entry={e} />
      ))}
    </>
  );
};

export default DiaryList;
