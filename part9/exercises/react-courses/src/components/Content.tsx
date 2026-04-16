import Part from './Part';
import type { CoursePart } from '../types';

interface ContentProps {
  content: CoursePart[];
}

const Content = ({ content }: ContentProps) => {
  return (
    <>
      {content.map((item) => (
        <Part key={item.name} part={item} />
      ))}
    </>
  );
};

export default Content;
