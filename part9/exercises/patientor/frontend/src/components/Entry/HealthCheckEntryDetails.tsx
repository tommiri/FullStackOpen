import { Favorite, MedicalServices } from '@mui/icons-material';

import { assertNever } from '../../utils';

import { HealthCheckRating, HealthCheckEntry } from '../../types';

import BaseEntryDetails from './BaseEntryDetails';

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  let healthColor = '';

  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      healthColor = 'green';
      break;
    case HealthCheckRating.LowRisk:
      healthColor = 'yellow';
      break;
    case HealthCheckRating.HighRisk:
      healthColor = 'orange';
      break;
    case HealthCheckRating.CriticalRisk:
      healthColor = 'red';
      break;
    default:
      assertNever(entry.healthCheckRating);
  }

  return (
    <BaseEntryDetails entry={entry} icon={<MedicalServices />}>
      <div>
        <Favorite sx={{ color: healthColor }} />
      </div>
    </BaseEntryDetails>
  );
};

export default HealthCheckEntryDetails;
