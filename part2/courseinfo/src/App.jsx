const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return(
  <div>
    {props.parts.map(part => {return <Part key={part.id} part={part}/>})}
  </div>)
}


const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const exercisesOnly = props.parts.map(part => part.exercises);
  const total = exercisesOnly.reduce((accumulator, currentValue) => {console.log(accumulator,currentValue) ;return accumulator + currentValue}, 0)
  console.log(total);
  
   return <p>Number of exercises {total}</p>}

const Course = (props) => (
  <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
)


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

 return courses.map(course => {return <Course key={course.id} course={course}/>})

}

export default App