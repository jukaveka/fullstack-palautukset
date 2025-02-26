const Header = ({ name }) => {
  console.log("Course name" , name)
  
  return (
    <h1> {name} </h1>
  )
}

const Content = ({ parts }) => {
  console.log("Content parts", parts)

  return (
    <>
      {parts.map(part =>
        <Part name={part.name} exercises={part.exercises} />
      )}
    </>
  )
}

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
    <p>Number of exercises {totalExerciseCount} </p>
  )
}

const Part = ({ name, exercises}) => {
  console.log("Course name", name, ", course exercises", exercises)
  
  return (
      <p> {name} {exercises} </p>
  )
}

const Course = ({ course }) => {
  console.log("Course object", course)

  const {name, parts} = course
  
  console.log("Course name", name, ", course parts", parts)

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { 
        name: 'Fundamentals of React', 
        exercises: 10,
        id: 1
      },
      { 
        name: 'Using props to pass data', 
        exercises: 7,
        id: 2
      },
      { 
        name: 'State of a component', 
        exercises: 14,
        id: 3
      },
      {
        name: 'Utilizing lists in JS',
        exercises: 5,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App