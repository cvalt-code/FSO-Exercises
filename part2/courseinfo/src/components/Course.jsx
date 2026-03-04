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


export default Course