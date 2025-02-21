import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({positive, neutral, negative, total}) => {
  console.log("Rendering reactions")
  console.log("Positive reactions", positive)
  console.log("Neutral reactions", neutral)
  console.log("Negative reactions", negative)
  console.log("Total reactions", total)

  const calculateAverage = () => {
    if (total === 0) {
      return 0
    }

    const reactionValue = (positive * 1) + (negative * -1)

    return reactionValue / total
  }

  const calculatePositiveShare = () => {
    if (positive === 0) {
      return 0
    }

    const positiveShare = (positive / total) * 100

    return positiveShare + " %"
  }

  if (total === 0) {
    return (
      <div>
        <h1> Statistics </h1>
        <p> No feedback given </p>
      </div>
    )
  }

  return (
    <div>
      <h1> Statistics </h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={positive} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={negative} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={calculateAverage()} />
          <StatisticLine text="Positive" value={calculatePositiveShare()} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  console.log("Statistics", text, ", value", value)

  return (
    <>
      <tr>
        <td width={65}> {text} </td>
        <td> {value} </td>
      </tr>
    </>
  )
}

const App = () => {
  const [positive, setPositive] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [negative, setNegative] = useState(0)
  const [total, setTotal] = useState(0)

  const addPositive = () => {
    console.log("Increasing count of positive reactions, original count", positive, ", new count", positive + 1)
    setPositive(positive + 1)

    const newPositive = positive + 1

    console.log("Increasing total reactions, original value", total, ", new total", (newPositive + neutral + negative))
    setTotal(newPositive + neutral + negative)
  }

  const addNeutral = () => {
    console.log("Increasing count of neutral reactions, original count", neutral, ", new count", neutral + 1)
    setNeutral(neutral + 1)

    const newNeutral = neutral + 1

    console.log("Increasing total reactions, original value", total, ", new total", (positive + newNeutral + negative))
    setTotal(positive + newNeutral + negative)
  }

  const addNegative = () => {
    console.log("Increasing count of negative reactions, original count", negative, ", new count", negative + 1)
    setNegative(negative + 1)

    const newNegative = negative + 1

    console.log("Increasing total reactions, original value", total, ", new total", (positive + neutral + newNegative))
    setTotal(positive + neutral + newNegative)
  }

  return (
    <div>
      <h1> Give feedback </h1> 
      <Button onClick={addPositive} text="Good" />
      <Button onClick={addNeutral} text="Neutral" />
      <Button onClick={addNegative} text="Negative" />
      <Statistics 
        positive={positive} 
        neutral={neutral} 
        negative={negative}
        total={total} 
      />
    </div>
  )
}

export default App
