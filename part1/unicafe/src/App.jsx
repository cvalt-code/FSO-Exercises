import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => (
  
   <tr> 
    <td>{props.text}</td> 
    <td>{props.value}</td> 
   </tr>
 
)

const Statistics = (props) => {
  let good = props.good 
  let bad = props.bad 
  let neutral = props.neutral
  let all = good + neutral + bad
  let avg = ((good * 1) + (neutral * 0) + (bad * -1)) / all || 0
  let pos = (good * 100) / all || 0
  if (!(good === 0 && neutral === 0 && bad === 0)) {return (
    <div>
    <h1>Statistics</h1>
    <table>
    <tbody>
    <StatisticsLine text="Good" value={good}/>
    <StatisticsLine text="Neutral" value={neutral}/>
    <StatisticsLine text="Bad" value={bad}/>
    <StatisticsLine text="All" value={all}/>
    <StatisticsLine text="Average" value={avg}/>
    <StatisticsLine text="Positive" value={`${pos}%`}/>
    </tbody>
    </table>
    </div>
  )}
  else {
    return (
      <div>
      <h1>Statistics</h1>
      No feedback given
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let avg = ((good * 1) + (neutral * 0) + (bad * -1)) / all || 0
  let pos = (good * 100) / all || 0

  const setToGood = value => {
    setGood(value)
    }
  
  const setToNeutral= value => {
    setNeutral(value)
    }

  const setToBad= value => {
    setBad(value)
    }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setToGood(good + 1)} text="Good" /> <Button onClick={() => setToNeutral(neutral + 1)} text="Neutral" /> <Button onClick={() => setToBad(bad + 1)} text="Bad" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App