import React, {useState} from 'react'
import './App.css'
import {exampleData} from './getData'
import {API_KEY} from './secrets'

export default function App() {
  const [data, setData] = useState(exampleData)

  return (
    <div className="App-wrapper flex-center">
      <div className="App-header flex-center" onClick={() => getData()}>
        Get &nbsp; <div className="App-color">weather</div>
      </div>

      <div className="App-data">
        <p>Weather in {data.name}</p>
        <p>{data.weather[0].main}</p>
        <p>{data.weather[0].description}</p>
        <br/>
        <p>Temperature: {data.main.temp}°C</p>
        <p>Feels like: {data.main.feels_like}°C</p>
        <p>Max: {data.main.temp_max}°C</p>
        <p>Min: {data.main.temp_min}°C</p>
        <br/>
        <p>Preassure: {data.main.pressure}hpa</p>
        <p>Humidity: {data.main.humidity}%</p>
        <br/>
        <p>Wind speed: {data.wind.speed}m/s</p>
        <p>Direction: {data.wind.deg}°</p>

        {/* <>{JSON.stringify(data.main)}</>
        <>{JSON.stringify(data.wind)}</> */}

      </div>      
    </div>
  )

  function getData () {
    // changeUnits(data)
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=Uppsala%2Cse&lang=en&units=%22metric%22", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        changeUnits(response)
    })
    .catch(err => {
      console.error(err)
    })
  }

  function changeUnits (response) {
    const newData = {... response}

    // Temperatur Kelvin to Celsius (K - 273.15)
    const kOffset = 273.15

    newData.main.temp = Math.round(newData.main.temp - kOffset)
    newData.main.feels_like = Math.round(newData.main.feels_like - kOffset)
    newData.main.temp_min = Math.round(newData.main.temp_min - kOffset)
    newData.main.temp_max = Math.round(newData.main.temp_max - kOffset)


    
    setData(newData)
  }
}
