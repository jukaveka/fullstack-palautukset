import Person from "./Person"
import PersonService from '../services/persons'

const Directory = ({ showAll, persons, setPersons, search, setSuccessMessage, setErrorMessage }) => {
    const filteredPersons = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

    const removePersonBy = (id) => {
        console.log(`Button clicked to remove person with id ${id} from phonebook.`)

        console.log(`Identifying person to remove by id`)

        const personToRemove = persons.find(person => person.id === id)

        console.log(`Person to remove from phonebook ${personToRemove.name}`)

        console.log(`Requesting user to confirm that they want to remove ${personToRemove.name} from phonebook`)

        if (window.confirm(`Are you sure you want to remove ${personToRemove.name}`)) {
            console.log(`User confirmed removal of ${personToRemove.name}`)

            console.log(`Calling PersonService to remove ${personToRemove.name}. ID ${personToRemove.id}`)

            PersonService
                .remove(id)
                .then(deletedPerson => {
                    console.log("Entry removed successfully. Removed person returned by PersonService", deletedPerson)

                    const arrayWithoutpersonToRemove = persons.filter(person => person.id !== id)

                    console.log("Updating state variable persons with array without removed person", arrayWithoutpersonToRemove)

                    setPersons(arrayWithoutpersonToRemove)

                    console.log("Setting message nofitying successful removal of entry")
                    
                    setSuccessMessage(`${deletedPerson.name} removed from phone book`)

                    console.log("Setting timeout to clear success notification")
                    
                    setTimeout(() => {
                        console.log("Clearing success notification")

                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    console.log("Entry removal failed. Error message", error)

                    console.log("Setting message notifying of error in removal of entry")

                    setErrorMessage(`Removal of ${personToRemove.name} failed. Error message ${error.message}`)

                    console.log("Setting timeout to clear error nofitication")

                    setTimeout(() => {
                        console.log("Clearing error message")

                        setErrorMessage(null)
                    }, 5000)
                })
        } else {
            console.log(`User rejected removal of ${personToRemove.name} from phonebook`)
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