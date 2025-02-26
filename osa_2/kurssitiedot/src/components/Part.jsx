const Part = ({ name, exercises}) => {
    console.log("Course name", name, ", course exercises", exercises)
    
    return (
        <p> {name} {exercises} </p>
    )
}

export default Part