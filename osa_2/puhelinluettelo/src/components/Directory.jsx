import Person from "./Person"

const Directory = ({ showAll, persons, search}) => {
    const filteredPersons = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <h2>Numbers</h2>
            {filteredPersons.map(person =>
                <Person key={person.name} person={person} />)}
        </div>
    )
}

export default Directory