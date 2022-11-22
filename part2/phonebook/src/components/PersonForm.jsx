const PersonForm = ({ formHandlers, newValues }) => {
  return (
    <div>
      <form onSubmit={formHandlers.addPerson}>
        <table className="inputs">
          <tbody>
            <tr>
              <td>Name: </td>
              <td>
                <input
                  value={newValues.newName}
                  onChange={formHandlers.handleNameChange}
                />
              </td>
            </tr>
            <tr>
              <td>Number: </td>
              <td>
                <input
                  value={newValues.newNumber}
                  onChange={formHandlers.handleNumberChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default PersonForm;
