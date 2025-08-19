import { useState } from 'react'

const Title = ({ title }) => <h1>{title}</h1>
const StatisticLine = (props) => {
  const { text, value } = props
  let space = ' '
  {/* <p>{text} {value}</p> */ }
  if (text == 'positive ') space = '%'
  console.log(space)
  return (
    <tr >
      <td>{text}</td>
      <td>{value}</td>
      <td>{space}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const { good, neutral, bad } = props
  if (good == 0 && neutral == 0 && bad == 0) return <p>No feedback given</p>
  return (
    <div>
      <table >
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='average ' value={(good - bad) / (good + bad + neutral)} />
          <StatisticLine text='positive ' value={100 * good / (good + bad + neutral)} />

        </tbody>
      </table>
    </div>
  )
}
const Button = (prop) => {
  const { func, text } = prop
  return (
    <button onClick={func}>{text}</button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = (newValue) => setGood(newValue)
  const setNeutralValue = (newValue) => setNeutral(newValue)
  const setBadValue = (newValue) => setBad(newValue)
  return (
    <div>
      <Title title='give feedback' />
      <Button func={() => setGoodValue(good + 1)} text='good' />
      <Button func={() => setNeutralValue(neutral + 1)} text='neutral' />
      <Button func={() => setBadValue(bad + 1)} text='bad' />
      <Title title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
//
// export default App
