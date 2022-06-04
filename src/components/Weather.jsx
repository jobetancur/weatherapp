import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = () => {

    const [weather, setWeather] = useState({})
    const [obj, setObj] = useState({})
    const [isBoolean, setisBoolean] = useState(false)
    const changeDegrees = () => setisBoolean(!isBoolean)

    let lon, lat

    useEffect(() => {
        const success = pos => {
            lon = pos.coords.longitude
            lat = pos.coords.latitude
            setObj({lon, lat})
        }
        navigator.geolocation.getCurrentPosition(success)
    }, [])

    const API_key = '9f181a0dab4b2c0f1f48613312413112'
    
    useEffect(() => {
        if(obj !== undefined){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=metric`)
            .then(res => setWeather(res.data))
            .catch(error => console.log(error))
        }
    }, [obj])

    console.log(weather)

    const degreesF = () => {
        if(weather !== `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=metric`){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=imperial`)
            .then(res => setWeather(res.data))
            .catch(error => console.log(error))
        }
    }

    const degreesC = () => {
        if(weather !== `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=imperial`){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=metric`)
            .then(res => setWeather(res.data))
            .catch(error => console.log(error))
        }
    }

  return (
    <div className='globaldiv'>
        <div className='leftdiv'>
        <h3>{weather.name}, {weather.sys?.country}</h3>
            <div className='bg-leftdiv'>
                <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                <p><b>Weather conditions:</b> {weather.weather?.[0].description}</p>
                <p><b>Temperature:</b> {weather.main?.temp} {isBoolean ? '°F' : '°C'}</p>
            </div>
            <div className='bg-button'>
                <button className='button' onClick={() => { degreesF(); changeDegrees(); }} disabled={isBoolean? true : false} >Imperial °F, mph</button>
                <button className='button' onClick={() => { degreesC(); changeDegrees(); }} disabled={isBoolean? false : true}>Metric °C, m/s</button>
        </div>
        </div>
        <div className='rigthleft'>
            <h2>Weather App</h2>
            <p><b>Feels like:</b> {weather.main?.feels_like} {isBoolean ? '°F' : '°C'}</p>
            <p><b>Temperature MAX:</b> {weather.main?.temp_max} {isBoolean ? '°F' : '°C'}</p>
            <p><b>Temperature MIN:</b> {weather.main?.temp_min} {isBoolean ? '°F' : '°C'}</p>
            <p><b>Wind speed:</b> {weather.wind?.speed} {isBoolean ? 'miles/hour' : 'meter/sec'}</p>
            <p><b>Clouds:</b> {weather.clouds?.all} %</p>
            <p><b>Pressure:</b> {weather.main?.pressure} hPa</p>
        </div>
        
    </div>
  )
}

export default Weather