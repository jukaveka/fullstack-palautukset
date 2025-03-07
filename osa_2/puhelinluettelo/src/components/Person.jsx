import Button from './Button'

const Person = ({ person, removePerson}) => {
    return (
        <tr>
            <td> {person.name} </td>
            <td> {person.number} </td>
            <td> <Button onClick={removePerson} text="Remove" /> </td>
        </tr>
    )
}

export default Person