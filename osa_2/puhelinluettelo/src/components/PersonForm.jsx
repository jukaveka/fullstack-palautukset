const PersonForm = ({ onSubmit, newName, onNameInputChange, newNumber, onNumberInputChange }) => {

    return (
    <div>
        <h2> Add new person to phonebook </h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name"> Name </label>
            <p>
              <input id="name" name="name" value={newName} onChange={onNameInputChange} />
            </p>
            <label htmlFor="number"> Phone number </label>
            <p>
              <input id="number" name="number" value={newNumber} onChange={onNumberInputChange} />
            </p>
            <p>
              <button type="submit"> Add </button>
            </p> 
        </form>
    </div>
    )
}

export default PersonForm