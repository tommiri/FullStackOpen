import { Gender, Entry, Diagnosis } from './types';
import z from 'zod';

// export const newEntrySchema = z.object({
//   id: z.string(),
//   description: z.string(),
//   date: z.string(),
//   specialist: z.string(),
//   diagnosisCodes: z.array(Diagnosis),
// });

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(z.object(Entry)),
});
