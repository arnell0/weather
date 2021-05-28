import React, {useState} from 'react'
import {_data} from './data'
import SearchBar from './SearchBar'
import CityCard from './CityCard'
import './App.css'
import { createClient } from '@supabase/supabase-js'


export default function App() {
  const [active, setActive] = useState(false)
  const [data, setData] = useState()
  const supabase = createClient('https://wfapkikzcykkjzxihggu.supabase.co', process.env.REACT_APP_SUPABASE_KEY)

  return (
    <div className="App">
      <div className={`App__search ${active ? "App__search--active" : ""}`}>
        <SearchBar supabase={supabase} onSubmit={handleSearch} active={active} />      
      </div>      
      <div className={`App__cities ${active ? "App__cities--active" : ""}`}>
        {data && <CityCard onClose={() => setActive(false)} data={data} />}
      </div>

    </div>
  )

  function handleSearch(searchTerm) {
    setActive(true)
    getData(searchTerm)
    // setData(_data)
  }

  function getData(searchTerm) {
    let url = `https://api.therainery.com/forecast/weather?city=${searchTerm}`
    let key = "fzsdZcfoX960LtVFNBkc26qdpohxk4kh3VZvV8T8"
    fetch(url, {
      "method": "GET",
      "headers": {
        "x-api-key": key,
      }
    })
    .then(response => response.json())
    .then(response => {
        setData(response)
        console.log(response.meta.requestsRemaining)

    })
    .catch(err => {
      console.error(err)
    })
  }
}
