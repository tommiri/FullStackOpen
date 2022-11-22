const Part = ({ part }) => {
  return (
    <div>
      <p> Part name: {part.name} </p>
      <p>Exercises: {part.exercises}</p>
      <br />
    </div>
  );
};

export default Part;
