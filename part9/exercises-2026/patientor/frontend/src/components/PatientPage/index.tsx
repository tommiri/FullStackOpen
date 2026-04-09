import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import patientService from '../../services/patients';

import { Patient } from '../../types';

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
      <h2>{patient.name}</h2>
      <div>gender: {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </>
  );
};

export default PatientPage;
