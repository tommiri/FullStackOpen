import { createContext, useContext } from 'react';

import type { Diagnosis } from '../types';

export type DiagnosesContextValue = {
  getDiagnosisName: (code: Diagnosis['code']) => string | undefined;
  allDiagnosisCodes: Array<Diagnosis['code']>;
};

const DiagnosesContext = createContext<DiagnosesContextValue | undefined>(
  undefined
);

export const useDiagnoses = (): DiagnosesContextValue => {
  const context = useContext(DiagnosesContext);

  if (!context) {
    throw new Error(
      'useDiagnoses must be used within a DiagnosesContext.Provider'
    );
  }

  return context;
};

export default DiagnosesContext;
