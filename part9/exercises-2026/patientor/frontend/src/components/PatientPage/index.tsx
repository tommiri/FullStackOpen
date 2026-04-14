import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, MenuItem, TextField, Typography } from '@mui/material';

import patientService from '../../services/patients';

import { Entry, Patient } from '../../types';
import EntryDetails from '../Entry';
import EntryForm from '../EntryForm';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState('');
  const [entryType, setEntryType] = useState<Entry['type']>('HealthCheck');
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const fetchedPatient = await patientService.getOne(id);
      setPatient(fetchedPatient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Patient not found!</div>;
  }

  const handleEntryAdded = (entry: Entry) => {
    setPatient((prev) =>
      prev ? { ...prev, entries: [...prev.entries, entry] } : prev
    );
  };

  const notify = (msg: string) => {
    setErrorMessage(msg);

    setTimeout(() => setErrorMessage(''), 5000);
  };

  return (
    <>
      <Typography variant="h4" sx={{ my: 2 }}>
        {patient.name}
      </Typography>
      <Typography>Gender: {patient.gender}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="Entry type"
        value={entryType}
        select
        fullWidth
        onChange={(event) => setEntryType(event.target.value as Entry['type'])}
        sx={{ mt: '1rem' }}
      >
        <MenuItem value="HealthCheck">Health check</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational healthcare
        </MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
      </TextField>
      <EntryForm
        id={patient.id}
        onEntryAdded={handleEntryAdded}
        notify={notify}
        entryType={entryType}
      />

      <Typography variant="h5" sx={{ my: 2 }}>
        Entries
      </Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries yet!</Typography>
      ) : (
        patient.entries.map((entry) => {
          return <EntryDetails key={entry.id} entry={entry} />;
        })
      )}
    </>
  );
};

export default PatientPage;
