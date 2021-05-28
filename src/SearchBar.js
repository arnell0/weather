import React, { useState } from 'react'
import './SearchBar.css'
import search from './icons/light/search.svg'


export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermOrg, setSearchTermOrg] = useState('')
  const [autoComplete, setAutoComplete] = useState([])

  const [autoFocus, setAutoFocus] = useState(-1)

  return (
    <div className={`SearchBar`}>
      <form className="SearchBar__form" onSubmit={handleSubmit}>
        <input autoFocus className="SearchBar__input" type="text" placeholder="Type a city ..." 
        value={searchTerm} onChange={handleAutoComplete} 
        onKeyDown={handleKeyPress} />
      </form>

      <div className="autoComplete">
        {autoComplete && autoComplete.map((a, i) => (
          <div key={i} className={`autoComplete__item ${autoFocus === i ? "autoComplete__item--active" : ""}`}>
            {a}
          </div>
        ))}
      </div>
      <img src={search} className="SearchIcon" alt="" srcset=""/>
    </div>
  )

  async function getSearchList(value) {
    let { data: CitiesWorld, error } = await props.supabase.from('CitiesWorld').select('name').ilike('name', `${value}%`)
    if (error) console.log(error)
    return CitiesWorld.map(item => item.name)
  }

  function handleSubmit(e){
    e.preventDefault()

    setSearchTerm('')
    setSearchTermOrg('')
    setAutoComplete([])
    setAutoFocus(-1)
    
    props.onSubmit(searchTerm)
  }

  async function handleAutoComplete(e) {
    let value = e.target.value
    setSearchTerm(value)
    e.target.setSelectionRange(value.length, value.length);

    if(value) {
      // var autoList = []
      // props.searchList.filter(item => item.includes(value.toLowerCase()))
      // .forEach(item => { autoList.push(item) });
      var autoList = await getSearchList(value)
      setAutoComplete(autoList.slice(0, 5))
    } else setAutoComplete([])
  }

  function handleKeyPress(e){
    const key = e.key
    if (key === 'ArrowDown' && autoFocus < autoComplete.length - 1) {
      setAutoFocus(autoFocus+1)
      setSearchTerm(autoComplete[autoFocus+1])
      
      if(autoFocus === -1) setSearchTermOrg(e.target.value)
    }
    else if (key === 'ArrowUp' && autoFocus > 0) {
      setAutoFocus(autoFocus-1)
      setSearchTerm(autoComplete[autoFocus-1])
    }
    else if (key === 'ArrowUp' && autoFocus > -1) {
      setAutoFocus(autoFocus-1)
      setSearchTerm(searchTermOrg)
    }
    if (key === 'ArrowUp') e.preventDefault()
  }
}
