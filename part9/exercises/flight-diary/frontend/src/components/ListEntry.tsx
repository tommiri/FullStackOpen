import { NonSensitiveDiaryEntry } from '../types';

type ListEntryProps = {
  entry: NonSensitiveDiaryEntry;
};

const ListEntry = ({ entry }: ListEntryProps) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>
        visibility: {entry.visibility}
        <br />
        weather: {entry.weather}
      </p>
    </div>
  );
};

export default ListEntry;
