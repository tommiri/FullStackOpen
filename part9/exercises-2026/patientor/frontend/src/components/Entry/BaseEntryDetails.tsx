import { ReactNode } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import { Entry } from '../../types';
import { useDiagnoses } from '../../context/diagnosesContext';

type BaseEntryDetailsProps = {
  entry: Entry;
  icon: ReactNode;
  headerExtra?: ReactNode;
  children?: ReactNode;
};

export const BaseEntryDetails = ({
  entry,
  icon,
  headerExtra,
  children,
}: BaseEntryDetailsProps) => {
  const { getDiagnosisName } = useDiagnoses();

  return (
    <Card variant="outlined" style={{ marginBottom: '0.75rem' }}>
      <CardContent>
        <Typography>
          {entry.date} {icon} {headerExtra}
        </Typography>
        <Typography>
          <em>{entry.description}</em>
        </Typography>

        {children}

        {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Diagnoses</Typography>
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    <Typography>
                      {code} {getDiagnosisName(code)}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Typography>
          <em>Diagnosed by {entry.specialist}</em>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BaseEntryDetails;
