import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Patient } from '../../types.ts';
import patientService from '../../services/patients.ts';
import { Typography } from '@mui/material';

const PatientDetailsPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const patientId = useParams().patientId; // maybe unsafe?

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await patientService.getById(patientId);
      setPatient(fetchedPatient);
    };
    void fetchPatient();
  }, [patientId]);

  return (
    <div>
      <Typography variant="h3" style={{ marginTop: '0.5em' }}>
        {patient?.name}
      </Typography>
      <Typography>gender: {patient?.gender}</Typography>
      <Typography>ssn: {patient?.ssn}</Typography>
      <Typography>occupation: {patient?.occupation}</Typography>
    </div>
  );
};

export default PatientDetailsPage;
