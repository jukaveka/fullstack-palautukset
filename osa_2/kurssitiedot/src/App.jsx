const Header = ({ name }) => {
  console.log("Course name" , name)
  
  return (
    <h3> {name} </h3>
  )
}

const Content = ({ parts }) => {
  console.log("Content parts", parts)

  return (
    <>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
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
    <p><b>Total of {totalExerciseCount} exercises</b></p>
  )
}

const Part = ({ name, exercises}) => {
  console.log("Course name", name, ", course exercises", exercises)
  
  return (
      <p> {name} {exercises} </p>
  )
}

const Course = ({ courses }) => {
  console.log("Courses object", courses)

  return (
    <div>
      <h1> Web development curriculum </h1>
      {courses.map(course =>
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

export default App