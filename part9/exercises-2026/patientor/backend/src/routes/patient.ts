import express, { NextFunction, Request, Response } from 'express';

import patientService from '../services/patientService';
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import { newEntrySchema, newPatientSchema } from '../utils';
import z from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const parsedData = newEntrySchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient>) => {
  const patient = patientService.getPatient(req.params.id);
  res.json(patient);
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | string>
  ) => {
    const patient = patientService.getPatient(req.params.id);

    if (!patient) {
      return res.status(404).json('No patient found');
    }

    const addedEntry = patientService.addEntry(patient, req.body);
    return res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
