import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import patientService from '../../services/patients';

import { Patient } from '../../types';
import EntryDetails from '../Entry';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
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

  return (
    <>
      <Typography variant="h4" sx={{ my: 2 }}>
        {patient.name}
      </Typography>
      <Typography>Gender: {patient.gender}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography variant="h5" sx={{ my: 2 }}>
        Entries
      </Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries yet!</Typography>
      ) : (
        patient.entries.map((entry) => {
          return <EntryDetails entry={entry} />;
        })
      )}
    </>
  );
};

export default PatientPage;
