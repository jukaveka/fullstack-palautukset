import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const cellStyle = {
    width: "50px",
    heigth: "10px",
    padding: "5px",
    textAlign: "center"
  }

  const buttonStyle = {
    width: "50px",
    margin: "5px",
    textAlign: "center"
  }

  return (
    <div>
      <h2>Unicafe review statistics</h2>
      <table>
        <thead>
          <tr>
            <th style={cellStyle}>Good </th>
            <th style={cellStyle}>Ok </th>
            <th style={cellStyle}>Bad </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}> {store.getState().good} </td>
            <td style={cellStyle}> {store.getState().ok} </td>
            <td style={cellStyle}> {store.getState().bad} </td>
          </tr>
          <tr>
            <td style={cellStyle}><button style={buttonStyle} onClick={good}>good</button></td>
            <td style={cellStyle}><button style={buttonStyle} onClick={ok}>ok</button></td>
            <td style={cellStyle}><button style={buttonStyle} onClick={bad}>bad</button></td>
          </tr>
          <tr>
            <td colSpan="3" style={{textAlign: "center"}}><button onClick={reset}>Reset statistics</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
