const Directory = ({ showAll, persons, search}) => {
    const filteredPersons = showAll
    ? persons
    : persons.filter(person => person.name.includes(search))

    return (
    <div>
        <h2>Numbers</h2>
        {filteredPersons.map(person => 
          <p key={person.name}> {person.name} {person.number} </p>)}
    </div>
    )
}

export default Directory