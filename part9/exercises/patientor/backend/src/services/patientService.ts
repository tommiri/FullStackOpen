import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const getPatient = (id: string): Patient | unknown => {
  return patients.find((patient) => id === patient.id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitivePatients, getPatient, addPatient };
