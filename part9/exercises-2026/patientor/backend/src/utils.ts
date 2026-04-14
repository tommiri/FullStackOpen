import { Diagnosis, Gender, HealthCheckRating } from './types';
import z from 'zod';

const baseEntrySchema = z.object({
  id: z.string(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
  specialist: z.string().nonempty(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().nonempty(),
  sickLeave: z
    .object({
      startDate: z.string().nonempty(),
      endDate: z.string().nonempty(),
    })
    .optional(),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().nonempty(),
    criteria: z.string().nonempty(),
  }),
});

export const entrySchema = z.discriminatedUnion('type', [
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
]);

export const newEntrySchema = z.discriminatedUnion('type', [
  healthCheckEntrySchema.omit({ id: true }).strict(),
  occupationalHealthcareEntrySchema.omit({ id: true }).strict(),
  hospitalEntrySchema.omit({ id: true }).strict(),
]);

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema),
});

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};
