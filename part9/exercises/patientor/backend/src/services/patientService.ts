import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import { parseDiagnosisCodes } from '../utils';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const id = uuid();

  const newEntry = {
    id,
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default { getNonSensitivePatients, addPatient, getPatient, addEntry };
