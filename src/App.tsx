import { useState } from 'react';
import './App.css'
import Forecast from './comps/Forecast'
import Homepage from './comps/Homepage'
import Navbar from './comps/Navbar'
import useFetchData from './hooks/useFetchData';

export default function App() {
  // API from WeatherAPI (https://www.weatherapi.com/)
  const apiKey = '08b41c182a27487e90d150516252101';

  // New location and current time states
  const [newLocation, setNewLocation] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<string>("00");

  useFetchData({ apiKey, setCurrentTime, newLocation });

  return (
    <>
      <div className='fixed top-0 left-0 w-full h-screen z-[-5]'>
        <img src='https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png?resize=400x300&vertical=center' className='w-full h-full bg-center bg-no-repeat bg-cover object-cover'></img>
      </div>
      <Navbar />
      <Homepage />
      <Forecast currentTime={currentTime} />
    </>
  )
}