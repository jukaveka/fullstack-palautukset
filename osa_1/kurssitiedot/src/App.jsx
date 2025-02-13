const Header = (props) => {
  console.log(props)
  
  return (
    <h1> {props.course.name} </h1>
  )
}

const Content = (props) => {
  console.log(props)

  const [part1, part2, part3] = props.course.parts

  console.log(part1, part2, part3)
  
  return (
    <>
      <Part name={part1.name} exercises={part1.exercises} />
      <Part name={part2.name} exercises={part2.exercises} />
      <Part name={part3.name} exercises={part3.exercises} />
    </>
  )
}

const Total = (props) => {
  console.log(props)

  const [part1, part2, part3] = props.course.parts

  console.log(part1, part2, part3)
  
  return (
    <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises} </p>
  )
}

const Part = (props) => {
  console.log(props)
  
  return (
      <p> {props.name} {props.exercises} </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { 
        name: 'Fundamentals of React', 
        exercises: 10 
      },
      { 
        name: 'Using props to pass data', 
        exercises: 7 
      },
      { 
        name: 'State of a component', 
        exercises: 14 
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App