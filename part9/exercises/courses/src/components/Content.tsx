import { ContentProps } from '../types';
import Part from './Part';

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {' '}
      {parts.map((part) => {
        return <Part part={part} />;
      })}
    </>
  );
};

export default Content;
