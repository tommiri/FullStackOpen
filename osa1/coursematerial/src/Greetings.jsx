const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old.
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  );
};

const App = () => {
  const name = "Tommi";
  const age = 23;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Henna" age={11 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
};

export default App;
