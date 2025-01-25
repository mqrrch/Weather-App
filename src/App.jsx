import { useEffect, useState } from 'react';
import './App.css'
import Homepage from './comps/Homepage'
import MoreInfo from './comps/More info/MoreInfo'
import useWeather from './comps/hooks/useWeather';
import Settings from './comps/Settings';

function App() {
  const apiKey = '08b41c182a27487e90d150516252101';
  const [newLocation, setNewLocation] = useState("")
  const [currentTime, setCurrentTime] = useState("00");
  const { data, isLoading } = useWeather(apiKey, setCurrentTime, newLocation);

  console.log(newLocation)

  // Settings states
  const [isSettings, setIsSettings] = useState(false);
  const [isKph, setIsKph] = useState(false);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  
  if(isLoading){
    return <p>loading...</p>
  }

  // Get the forecast info
  const forecast = data.forecast.forecastday[0]
  const hourly_forecast = [...forecast.hour]
  const conditionText = hourly_forecast[parseInt(currentTime)].condition.text
  const wind = {
    wind_mph: hourly_forecast[parseInt(currentTime)].wind_mph,
    wind_kph: hourly_forecast[parseInt(currentTime)].wind_kph,
    wind_dir: hourly_forecast[parseInt(currentTime)].wind_dir,
  }
  const uv = hourly_forecast[parseInt(currentTime)].uv
  const humidity = hourly_forecast[parseInt(currentTime)].humidity
  const chanceOfRain = hourly_forecast[parseInt(currentTime)].chance_of_rain
  const astrology = {
    sunrise: forecast.astro.sunrise,
    sunset: forecast.astro.sunset,
    moonrise: forecast.astro.moonrise,
    moonset: forecast.astro.moonset,
    moon_phase: forecast.astro.moon_phase,
  }

  console.log(data)

  return(
    <div className=''>
      <Settings isSettings={isSettings}
      setIsSettings={setIsSettings}
      isKph={isKph}
      setIsKph={setIsKph}
      isFahrenheit={isFahrenheit}
      setIsFahrenheit={setIsFahrenheit} />

      <i className='fa-solid fa-bars absolute top-4 left-4 cursor-pointer' onClick={() => setIsSettings(true)}></i>

      <div className='p-6 pt-10'>
        <Homepage city={data.location.name}
        temp_c={data.current.temp_c}
        temp_f={data.current.temp_f}
        condition={data.current.condition.text}
        isFahrenheit={isFahrenheit} />
      </div>

      <MoreInfo hourly_forecast={hourly_forecast}
      location={data.location}
      newLocation={newLocation}
      setNewLocation={setNewLocation}
      conditionText={conditionText}
      wind={wind}
      uv={uv}
      humidity={humidity}
      chanceOfRain={chanceOfRain}
      astrology={astrology}
      currentTime={currentTime}
      setCurrentTime={setCurrentTime}
      isFahrenheit={isFahrenheit}
      isKph={isKph} />
    </div>
  )
}

export default App
