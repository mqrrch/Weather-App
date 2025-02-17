import getBackgroundColor from "./getBackgroundColor"

function Homepage({ setIsSettings, city, temp_c, temp_f, condition, icon, isFahrenheit }){
    const { weather, timeOfDay } = getBackgroundColor(condition, icon)
    const isNight = timeOfDay === 'night'

    return (
        <div className="homepage-container md:w-1/2">
            <i className={`settings-btn fa-solid fa-bars absolute top-4 left-4 text-lg cursor-pointer z-10 ${isNight ? `text-white` : `text-black`}`}
            onClick={() => setIsSettings(true)}></i>
            <div className={`text-center p-6 py-32 flex flex-col items-center ${isNight ? `hp-gradient-night` : `hp-gradient-day`}`}>
                <p id="hp-city" className="">{city}</p>
                <p id="hp-temp" className="">{isFahrenheit ? `${temp_f}°F` : `${temp_c}°C`}</p>
                <p id="hp-condition" className="max-w-[360px]">{condition}</p>
            </div>
        </div>
    )
}

export default Homepage