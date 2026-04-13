import { Typography } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';

import { HospitalEntry } from '../../types';
import BaseEntryDetails from './BaseEntryDetails';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => (
  <BaseEntryDetails entry={entry} icon={<LocalHospital />}>
    <Typography>Discharged on: {entry.discharge.date}</Typography>
    <Typography>Reason: {entry.discharge.criteria}</Typography>
  </BaseEntryDetails>
);

export default HospitalEntryDetails;
