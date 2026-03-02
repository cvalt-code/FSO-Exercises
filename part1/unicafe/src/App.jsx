import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const DisplayStatistics = (props) => (
  <div>
    {props.text} {props.value}
  </div>
)



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <h1>Statistics</h1>
      <DisplayStatistics text="Good" value={good}/>
      <DisplayStatistics text="Neutral" value={neutral}/>
      <DisplayStatistics text="Bad" value={bad}/>

    </div>
  )
}

export default App