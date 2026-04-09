import type { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const partStyle = {
  marginBottom: '0.8em',
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div style={partStyle}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
        </div>
      );
    case 'background':
      return (
        <div style={partStyle}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case 'group':
      return (
        <div style={partStyle}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      );
    case 'special':
      return (
        <div style={partStyle}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>required skills: {part.requirements.join(', ')}</div>
        </div>
      );
    default:
      break;
  }
};

export default Part;
