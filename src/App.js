import React, {useState} from 'react'
import './App.css'
import {exampleData} from './getData'

export default function App() {
  const [data, setData] = useState(exampleData)

  return (
    <div className="App" onClick={() => getData()}>
      get &nbsp; <div className="App-color">weather</div>
      <>{JSON.stringify(data)}</>
    </div>
  )

  function getData () {
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=Uppsala%2Cse&lang=en&units=%22metric%22", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "5a380c6890msh9dc760c861baa4ap12673djsnb7a8195b3c4d",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(response => {
        setData(response)
    })
    .catch(err => {
      console.error(err)
    })
  }
}
