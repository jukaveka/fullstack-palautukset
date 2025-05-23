import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

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

export default Course