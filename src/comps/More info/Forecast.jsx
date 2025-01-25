function Forecast({ hourly_forecast, currentTime, setCurrentTime, isFahrenheit }){
    
    console.log(hourly_forecast)
    return(
        <div className="flex gap-4 p-1 overflow-x-auto scrollbar-hide whitespace-nowrap">
            {hourly_forecast.map((item, index) => {
                return parseInt(currentTime) === index ?
                (
                    <div key={index} className="text-center forecast-card current-forecast flex flex-col items-center cursor-pointer">
                        <p className="forecast-time mb-2">{item.time.split(' ')[1]}</p>
                        <div className="forecast-img-wrapper">
                            <img src={item.condition.icon}
                            className="forecast-icon w-full h-auto"></img>
                        </div>
                        <p className="forecast-temp mt-2">{isFahrenheit ? `${item.temp_f}°F` : `${item.temp_c}°C`}</p>
                    </div>
                ) : (
                    <div key={index} className="text-center forecast-card flex flex-col items-center cursor-pointer"
                    onClick={() => setCurrentTime(index)}>
                        <p className="forecast-time mb-2">{item.time.split(' ')[1]}</p>
                        <div className="forecast-img-wrapper">
                            <img src={item.condition.icon}
                            className="forecast-icon w-full h-auto"></img>
                        </div>
                        <p className="forecast-temp mt-2">{isFahrenheit ? `${item.temp_f}°F` : `${item.temp_c}°C`}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Forecast