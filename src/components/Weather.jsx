import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromWaterPump, faCloud, faThermometer, faThermometer1, faThermometer2, faThermometerHalf, faWind } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './Loader'

const Weather = () => {

    const [weather, setWeather] = useState({})
    const [obj, setObj] = useState({})
    const [isBoolean, setisBoolean] = useState(false)
    const changeDegrees = () => setisBoolean(!isBoolean)
    const [loading, setLoading] = useState(true)
    

    let date = new Date().toDateString();

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
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${API_key}&units=metric`)
            .then(res => {
                setWeather(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
        }
    }, [obj])

    console.log(weather)

    const degreesF = () => {
        if(weather !== `https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${API_key}&units=metric`){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${API_key}&units=imperial`)
            .then(res => setWeather(res.data))
            .catch(error => console.log(error))
        }
    }

    const degreesC = () => {
        if(weather !== `https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${API_key}&units=imperial`){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${API_key}&units=metric`)
            .then(res => setWeather(res.data))
            .catch(error => console.log(error))
        }
    }

  return (
    <div>
        {
        loading ? <Loader/> :
    <div className='globaldiv'>
        <div className='leftdiv'>
        <h3>{weather.name}, {weather.sys?.country}</h3>
            <div className='bg-leftdiv'>
                <p className='description'>{date}</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`} alt="" />
                <p className='description'>{weather.weather?.[0].description}</p>
                <p className='temperature'><FontAwesomeIcon icon={faThermometerHalf}/> {weather.main?.temp} {isBoolean ? '??F' : '??C'}</p>
            </div>
            <div className='bg-button'>
                <button className='btn btn-primary' onClick={() => { degreesF(); changeDegrees(); }} disabled={isBoolean? true : false} >Imperial ??F, mph</button>
                <button className='btn btn-primary' onClick={() => { degreesC(); changeDegrees(); }} disabled={isBoolean? false : true}>Metric ??C, m/s</button>
            </div>
        </div>
        <div className='rigthleft'>
            <p><FontAwesomeIcon icon={faThermometer}/> <b>Feels like:</b> {weather.main?.feels_like} {isBoolean ? '??F' : '??C'}</p>
            <p><FontAwesomeIcon icon={faThermometer2}/> <b>Temperature MAX:</b> {weather.main?.temp_max} {isBoolean ? '??F' : '??C'}</p>
            <p><FontAwesomeIcon icon={faThermometer1}/> <b>Temperature MIN:</b> {weather.main?.temp_min} {isBoolean ? '??F' : '??C'}</p>
            <p><FontAwesomeIcon icon={faWind}/> <b>Wind speed:</b> {weather.wind?.speed} {isBoolean ? 'miles/hour' : 'meter/sec'}</p>
            <p><FontAwesomeIcon icon={faCloud}/> <b>Clouds:</b> {weather.clouds?.all} %</p>
            <p><FontAwesomeIcon icon={faArrowUpFromWaterPump}/> <b>Humidity:</b> {weather.main?.humidity} %</p>
            <p><FontAwesomeIcon icon={faThermometer1}/> <b>Pressure:</b> {weather.main?.pressure} hPa</p>
        </div>
    </div>
    }
    </div>
  )
}

export default Weather