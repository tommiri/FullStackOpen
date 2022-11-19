const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Content = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part) => {
        return (
          <>
            <p key={part.name}> Name: {part.name} </p>
            <p>Exercises: {part.exercises}</p>
            <br></br>
          </>
        );
      })}
    </div>
  );
};

const Total = ({ courseParts }) => {
  let exercisesSum = 0;

  for (const part of courseParts) {
    exercisesSum += part.exercises;
  }

  return <p>Number of exercises: {exercisesSum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </div>
  );
};

export default App;
