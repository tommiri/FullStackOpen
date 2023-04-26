import { PartProps } from '../types';

const Part = ({ part }: PartProps) => {
  let baseElement = (
    <strong>
      {part.name} {part.exerciseCount}
    </strong>
  );

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case 'basic':
      return (
        <p>
          {baseElement}
          <br />
          <em>{part.description}</em>
        </p>
      );

    case 'group':
      return (
        <p>
          {baseElement}
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          {baseElement}
          <br />
          <em>{part.description}</em>
          <br />
          {part.backgroundMaterial}
        </p>
      );
    case 'special':
      return (
        <p>
          {baseElement}
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
