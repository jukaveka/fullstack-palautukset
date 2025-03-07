import Person from "./Person"
import PersonService from '../services/persons'

const Directory = ({ showAll, persons, setPersons, search }) => {
    const filteredPersons = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    
    const removePersonBy = (id) => {
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