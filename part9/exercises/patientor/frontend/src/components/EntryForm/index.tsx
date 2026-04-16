import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Diagnosis, Entry, HealthCheckRating, NewEntry } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';
import { useDiagnoses } from '../../context/diagnosesContext';

type Props = {
  id: string;
  onEntryAdded: (entry: Entry) => void;
  notify: (msg: string) => void;
  entryType: Entry['type'];
};

const EntryForm = ({ id, onEntryAdded, notify, entryType }: Props) => {
  const [prevEntryType, setPrevEntryType] = useState(entryType);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [rating, setRating] = useState<HealthCheckRating>(0);
  const [employer, setEmployer] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const { allDiagnosisCodes } = useDiagnoses();

  const resetFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setRating(0);
    setDiagnosisCodes([]);
    setEmployer('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  if (entryType !== prevEntryType) {
    setPrevEntryType(entryType);
    resetFields();
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const sharedFields = {
        description,
        date,
        specialist,
        diagnosisCodes,
      };

      let newEntry: NewEntry;

      switch (entryType) {
        case 'Hospital':
          newEntry = {
            type: 'Hospital',
            ...sharedFields,
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
          };
          break;
        case 'OccupationalHealthcare':
          newEntry = {
            type: 'OccupationalHealthcare',
            ...sharedFields,
            employerName: employer,
            sickLeave:
              sickLeaveStart && sickLeaveEnd
                ? {
                    startDate: sickLeaveStart,
                    endDate: sickLeaveEnd,
                  }
                : undefined,
          };
          break;
        case 'HealthCheck':
          newEntry = {
            type: 'HealthCheck',
            ...sharedFields,
            healthCheckRating: rating,
          };
          break;
      }

      const addedEntry = await patientService.addEntry(id, newEntry);
      onEntryAdded(addedEntry);

      resetFields();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data.error ?? 'Failed to add entry';
        notify(`Error: ${msg[0].path[0]}: ${msg[0].message}`);
        return;
      }

      notify('Unexpected error.');
    }
  };

  return (
    <Box sx={{ border: '1px solid', padding: '1rem', my: '0.75rem' }}>
      <Typography variant="h5">New {entryType} entry</Typography>

      <Box sx={{ py: '1rem' }} component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            type="date"
            label="Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            variant="standard"
            slotProps={{ inputLabel: { shrink: true } }}
          ></TextField>
          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            variant="standard"
          ></TextField>
          <TextField
            label="Specialist"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
            variant="standard"
          ></TextField>
          <Autocomplete
            disablePortal
            value={diagnosisCodes}
            onChange={(_, value) => setDiagnosisCodes(value)}
            options={allDiagnosisCodes}
            multiple
            renderInput={(params) => (
              <TextField {...params} label="Diagnosis codes" />
            )}
          ></Autocomplete>

          {entryType === 'HealthCheck' && (
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <RadioGroup
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                row
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Healthy"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Low risk"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="High risk"
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="Critical risk"
                />
              </RadioGroup>
            </FormControl>
          )}

          {entryType === 'OccupationalHealthcare' && (
            <>
              <TextField
                label="Employer"
                value={employer}
                onChange={(event) => setEmployer(event.target.value)}
                variant="standard"
              ></TextField>
              <Typography variant="h6">Sick leave</Typography>
              <TextField
                type="date"
                label="Start date"
                value={sickLeaveStart}
                onChange={(event) => setSickLeaveStart(event.target.value)}
                variant="standard"
                slotProps={{ inputLabel: { shrink: true } }}
              ></TextField>
              <TextField
                type="date"
                label="End date"
                value={sickLeaveEnd}
                onChange={(event) => setSickLeaveEnd(event.target.value)}
                variant="standard"
                slotProps={{ inputLabel: { shrink: true } }}
              ></TextField>
            </>
          )}

          {entryType === 'Hospital' && (
            <>
              <Typography variant="h6">Discharge</Typography>
              <TextField
                type="date"
                label="Date"
                value={dischargeDate}
                onChange={(event) => setDischargeDate(event.target.value)}
                variant="standard"
                slotProps={{ inputLabel: { shrink: true } }}
              ></TextField>
              <TextField
                label="Criteria"
                value={dischargeCriteria}
                onChange={(event) => setDischargeCriteria(event.target.value)}
                variant="standard"
              ></TextField>
            </>
          )}

          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" sx={{ mt: '1rem' }}>
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: '1rem' }}
              onClick={resetFields}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default EntryForm;
