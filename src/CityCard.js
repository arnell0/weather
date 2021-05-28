import React from 'react'

import './CityCard.css'

import mapPin from './icons/dark/map-pin.svg'
// import sun from './icons/light/sun.svg'
import sun from './icons/dark/sun.svg'
import wind from './icons/dark/wind.svg'
import droplet from './icons/dark/droplet.svg'
import cloud from './icons/dark/cloud.svg'
import moon from './icons/dark/moon.svg'

export default function CityCard(props) {
  const {meta, data} = props.data
  const today = {data: [...data][0], condition: getIcons([...data][0])}
  
  return (
    <div className="CityCard" style={{backgroundColor: today.condition.color}}>
      <div className="CityCard__header" onClick={props.onClose}>
        <img src={mapPin} alt="" srcset=""/> &nbsp; <span style={{textDecoration: "underline"}}>{meta.city}, {meta.country}</span>
      </div>
      <div className="CityCard__today">
        <img className="today__icon" src={today.condition.icon} alt="" srcset=""/>
        
        <div className="today__desc">{today.condition.desc}</div>

        <div className="today__temp">
          {today.data.airTemperature} °C
        </div>
        <div className="today__extra">
          <div className="today__extra--img">
            <img src={wind} alt="" srcset=""/>
            &nbsp;
            {today.data.windSpeed}ms  
          </div>
          <div className="today__extra--img">
            <img src={droplet} alt="" srcset=""/>
            &nbsp;
            {today.data.relativeHumidity}%
          </div>
        </div>
      </div>
      
      
      <div className="CityCard__forecast">
        <div className="forecast__item--header">
          {getDayName(today.data.date)}
        </div>
        <div className="CityCard__forecast--scroll">
        {getDays(today.data.date).map((item, index) => {
          const condition = getIcons(item)

          return (
            <div className="forecast__item" key={index}>
            <div className="forecast__item--card">
              <div className="forecast__item--time" >{item.date.split('T')[1].split(':00Z')[0]}</div>
              <img className="forecast__item--icon" src={condition.icon} alt="" srcset=""/>
              <div className="forecast__item--temp">
                {item.airTemperature} °C
              </div>
            </div>
          </div>
          )
        })}
        </div>
      </div>

    </div>
  )

  function getDayName(date) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const _date = new Date(date)
    let day = days[_date.getDay()]
    return day
  }

  function getDays(date) {
    const _date = date.split('T')[0]
    var days = []
    data.filter(item => item.date.split('T')[0] === _date)
    .forEach(item => { days.push(item) });
    return days
  }

  function getIcons(item) {
    const {airTemperature, totalCloudCover, date} = item

    const _time = parseInt(date.split('T')[1].split(':00:00Z')[0])
    const night = _time > 21 || _time < 4  

    let condition = {
      icon: "",
      color: "",
      desc: ""
    }

    if (totalCloudCover < 50) {
      condition.icon = sun
      condition.desc = "Sunny"
    }
    else if (totalCloudCover > 50) {
      condition.icon = cloud
      condition.desc = "Cloudy"
    }
    if (airTemperature > 15) condition.color = "#f3b07c"
    else if (airTemperature < 15) condition.color = "#4BE2E3"

    if (night) {
      condition.icon = moon
      condition.color = '#282c34'
      condition.desc = 'Night'
    }

    return condition
  }
}

