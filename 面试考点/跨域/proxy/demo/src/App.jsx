import React from 'react'

export default function App() {
  const getData = () => {
      fetch('/api').then(res => res.json()).then(data => {
            console.log(data);
      })
  }

  return (
      <div>
            <h1>Hello React</h1>
            <button onClick={getData}>Click me</button>
      </div>
  )
}