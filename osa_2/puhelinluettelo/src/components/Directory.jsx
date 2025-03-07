import Person from "./Person"
import PersonService from '../services/persons'

const Directory = ({ showAll, persons, setPersons, search }) => {
    const filteredPersons = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

    const removePersonBy = (id) => {
        const removedPerson = persons.find(person => person.id === id)
        if (window.confirm("Are you sure you want to remove", removedPerson.name)) {
            console.log("Person removal initiated. Person id", id)

            PersonService
                .remove(id)
                .then(deletedPerson => {
                    console.log("Deleted person returned by PersonService", deletedPerson)

                    const arrayWithoutRemovedPerson = persons.filter(person => person.id !== id)

                    console.log("Array without the removed person")

                    setPersons(arrayWithoutRemovedPerson)
                })
        }
    }

    return (
        <div>
            <h2>Numbers</h2>
            <table>
                <tbody>
                    {filteredPersons.map(person =>
                        <Person
                            key={person.name}
                            person={person}
                            removePerson={() => removePersonBy(person.id)}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Directory