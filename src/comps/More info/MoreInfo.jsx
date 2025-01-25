import Location from "./Location/Location"
import Wind from "./Wind"
import Forecast from "./Forecast"
import Ultraviolet from "./Ultraviolet"
import Humidity from "./Humidity"
import Astrology from "./Astrology"
import ChanceOfRain from "./ChanceOfRain"
import Condition from "./Condition"

function MoreInfo({ 
    hourly_forecast,
    location,
    newLocation,
    setNewLocation,
    conditionText,
    wind,
    uv,
    humidity,
    chanceOfRain,
    astrology,
    currentTime,
    setCurrentTime,
    isKph,
    isFahrenheit
}){

    return(
        <div className="more-info-container mt-44 px-4 py-8">
            <Forecast hourly_forecast={hourly_forecast}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            isFahrenheit={isFahrenheit} />
            
            <Location location={location} newLocation={newLocation} setNewLocation={setNewLocation} />

            <Condition conditionText={conditionText} />

            <ChanceOfRain chanceOfRain={chanceOfRain} />

            <Wind wind={wind}
            isKph={isKph} />

            <div className="flex gap-5">
                <Ultraviolet uv={uv} />
                <Humidity humidity={humidity} />
            </div>

            <Astrology astrology={astrology} />

            <p className="text-center mt-8">
                Powered by <a href="https://www.weatherapi.com/" title="Weather API" target="_blank" className="text-blue-500">WeatherAPI.com</a>
            </p>
        </div>
    )
}

export default MoreInfo