import Person from './Person';

const People = ({ people, deletePerson }) => {
  return (
    <div>
      <table>
        <tbody>
          {people.map((person) => {
            return (
              <Person
                person={person}
                deletePerson={deletePerson}
                key={person.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default People;
