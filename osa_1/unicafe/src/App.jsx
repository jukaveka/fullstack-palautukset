import { useState } from 'react'

const Button = ({onClick, text}) => {
  console.log("Called event handler", onClick)
  console.log("Button text", text)

  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({positive, neutral, negative}) => {
  console.log("Rendering reactions")
  console.log("Positive reactions", positive)
  console.log("Neutral reactions", neutral)
  console.log("Negative reactions", negative)

  return (
    <div>
      <h1> Statistics </h1>
      <p> Good {positive} </p>
      <p> Neutral {neutral} </p>
      <p> Bad {negative} </p>
    </div>
  )
}

const App = () => {
  const [positive, setPositive] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [negative, setNegative] = useState(0)

  const addPositive = () => {
    console.log("Increasing count of positive reactions, original count", positive, ", new count", positive + 1)
    setPositive(positive + 1)
  }

  const addNeutral = () => {
    console.log("Increasing count of neutral reactions, original count", neutral, ", new count", neutral + 1)
    setNeutral(neutral + 1)
  }

  const addNegative = () => {
    console.log("Increasing count of negative reactions, original count", negative, ", new count", negative + 1)
    setNegative(negative + 1)
  }

  return (
    <div>
      <h1> Give feedback </h1> 
      <Button onClick={addPositive} text="Good" />
      <Button onClick={addNeutral} text="Neutral" />
      <Button onClick={addNegative} text="Negative" />
      <Statistics positive={positive} neutral={neutral} negative={negative} />
    </div>
  )
}

export default App
