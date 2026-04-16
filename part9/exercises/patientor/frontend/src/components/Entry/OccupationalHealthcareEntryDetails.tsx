import { Typography } from '@mui/material';
import { Work } from '@mui/icons-material';

import { OccupationalHealthcareEntry } from '../../types';

import BaseEntryDetails from './BaseEntryDetails';

type Props = {
  entry: OccupationalHealthcareEntry;
};

const OccupationalHealthcareEntryDetails = ({ entry }: Props) => (
  <BaseEntryDetails
    entry={entry}
    icon={<Work />}
    headerExtra={entry.employerName}
  >
    {entry.sickLeave && (
      <Typography>
        Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
      </Typography>
    )}
  </BaseEntryDetails>
);

export default OccupationalHealthcareEntryDetails;
