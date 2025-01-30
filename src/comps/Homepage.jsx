import getBackgroundColor from "./getBackgroundColor"

function Homepage({ setIsSettings, city, temp_c, temp_f, condition, icon, isFahrenheit }){
    const { weather, timeOfDay } = getBackgroundColor(condition, icon)
    const isNight = timeOfDay === 'night'

    return (
        <div className="homepage-container">
            <i className={`settings-btn fa-solid fa-bars absolute top-4 left-4 text-lg cursor-pointer z-10 ${isNight ? `text-white` : `text-black`}`}
            onClick={() => setIsSettings(true)}></i>
            <div className="text-center p-6 py-32 flex flex-col items-center">
                <p className={`hp-city py-1 text-2xl ${isNight ? `hp-gradient-night` : `hp-gradient-day`}`}>{city}</p>
                <p className={`hp-temp text-5xl ${isNight ? `hp-gradient-night` : `hp-gradient-day`}`}>{isFahrenheit ? `${temp_f}°F` : `${temp_c}°C`}</p>
                <p className={`hp-weather ${isNight ? `hp-gradient-night` : `hp-gradient-day`}`}>{condition}</p>
            </div>
        </div>
    )
}

export default Homepage