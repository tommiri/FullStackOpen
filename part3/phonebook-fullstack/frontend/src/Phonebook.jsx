import { useState, useEffect } from 'react';

import People from './components/People';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

import peopleService from './services/people';

const Phonebook = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState();

  const hook = () => {
    peopleService.getAll().then((initalPeople) => {
      setPeople(initalPeople);
    });
  };

  useEffect(hook, []);

  const showAll = filterValue === '';
  const peopleToShow = showAll
    ? people
    : people.filter(({ name }) =>
        name.toLowerCase().includes(filterValue.toLowerCase())
      );

  const handleRemovedPerson = (person) => {
    setError(true);
    setMessage(
      `Information of ${person.name} has already been deleted from the server`
    );
    setTimeout(() => {
      setMessage(null);
      setError(false);
    }, 5000);

    peopleService.getAll().then((initialPeople) => {
      setPeople(initialPeople);
      setNewName('');
      setNewNumber('');
    });
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!validatePerson()) {
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
    };

    peopleService
      .create(person)
      .then((returnedPerson) => {
        setPeople(people.concat(returnedPerson));
        setNewName('');
        setNewNumber('');

        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        console.error(errorMsg);
        setError(true);
        setMessage(errorMsg);
        setTimeout(() => {
          setMessage(null);
          setError(false);
        }, 5000);
      });
  };

  const validatePerson = () => {
    const foundName = people.find(
      (person) => person.name === newName
    );
    const foundNumber = people.find(
      (person) => person.number === newNumber
    );

    // Guard clause
    if (foundName && !foundNumber) {
      const confirmation = window.confirm(
        `${foundName.name} is already added to the phonebook, replace the old number with a new one?`
      );

      if (!confirmation) return false;

      updatePerson(foundName);
      return false;
    }

    if (foundNumber) {
      setError(true);
      setMessage(
        `${foundNumber.number} is already in the phonebook!`
      );
      setTimeout(() => {
        setMessage(null);
        setError(false);
      }, 5000);
      return false;
    }

    return true;
  };

  const updatePerson = (person) => {
    const changedPerson = { ...person, number: newNumber };

    peopleService
      .update(changedPerson.id, changedPerson)
      .then((updatedPerson) => {
        setPeople(
          people.map((p) => (p.id !== person.id ? p : updatedPerson))
        );
        setNewName('');
        setNewNumber('');

        setMessage(
          `${updatedPerson.name}'s number was successfully updated`
        );
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        console.log(error);
        console.error(errorMsg);
        handleRemovedPerson(changedPerson);
      });
  };

  const deletePerson = (id) => {
    const person = people.find((p) => id === p.id);
    const confirm = window.confirm(`Delete ${person.name}?`);

    if (!confirm) return;

    peopleService
      .remove(id)
      .then(() => {
        setMessage(`${person.name} was successfully removed`);
        setTimeout(() => setMessage(null), 3000);
        peopleService.getAll().then((initialPeople) => {
          setPeople(initialPeople);
        });
      })
      .catch(() => handleRemovedPerson(person));
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) =>
    setNewNumber(event.target.value);
  const handleFilterChange = (event) =>
    setFilterValue(event.target.value);

  const formHandlers = {
    addPerson: addPerson,
    handleNameChange: handleNameChange,
    handleNumberChange: handleNumberChange,
  };

  const newValues = {
    newName: newName,
    newNumber: newNumber,
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} error={error} />
      <Filter filter={handleFilterChange} />

      <h2>Add new person</h2>
      <PersonForm formHandlers={formHandlers} newValues={newValues} />

      <h2>People</h2>
      <People people={peopleToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default Phonebook;
