import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ feedback }) => {
  if (feedback.all === 0) {
    return <p>No feedback given</p>;
  }

  const average = (feedback.good - feedback.bad) / feedback.all;
  const positivePct = (feedback.good / feedback.all) * 100;

  const avgRounded = Math.round(average * 100) / 100;
  const positiveRounded = Math.round(positivePct * 100) / 100;

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={feedback.good} />
        <StatisticLine text="Neutral" value={feedback.neutral} />
        <StatisticLine text="Bad" value={feedback.bad} />
        <StatisticLine text="All" value={feedback.all} />
        <StatisticLine text="Average" value={avgRounded} />
        <StatisticLine
          text="Positive"
          value={positiveRounded + " %"}
        />
      </tbody>
    </table>
  );
};

const Button = ({ handleClick, text }) => (
  <button
    onClick={handleClick}
    style={{ fontSize: 32 + "px", marginRight: 4 + "px" }}
  >
    {text}
  </button>
);

const App = () => {
  const [goodFb, setGoodFb] = useState(0);
  const [neutralFb, setNeutralFb] = useState(0);
  const [badFb, setBadFb] = useState(0);
  const [allFb, setAllFb] = useState(0);

  const feedback = {
    good: goodFb,
    neutral: neutralFb,
    bad: badFb,
    all: allFb,
  };

  const handleFeedback = (value, setValue) => {
    setAllFb(allFb + 1);
    setValue(value + 1);
  };

  return (
    <div>
      <h1>Did you enjoy our food today?</h1>
      <div>
        <Button
          handleClick={() => handleFeedback(goodFb, setGoodFb)}
          text="&#x1F60D;"
        />
        <Button
          handleClick={() => handleFeedback(neutralFb, setNeutralFb)}
          text="&#x1F610;"
        />
        <Button
          handleClick={() => handleFeedback(badFb, setBadFb)}
          text="&#x1F641;"
        />
      </div>

      <h2>Statistics</h2>
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
