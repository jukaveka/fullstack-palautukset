const Total = ({ parts }) => {
    console.log("Course parts", parts)
  
    const exercisesList = parts.map(part => part.exercises)
  
    console.log("Exercises list", exercisesList)
  
    const totalExerciseCount = exercisesList.reduce(
      (totalCount, partCount) => totalCount + partCount, 
      0
    )
  
    console.log("Total exercises", totalExerciseCount)
    
    return (
      <p><b>Total of {totalExerciseCount} exercises</b></p>
    )
}

export default Total