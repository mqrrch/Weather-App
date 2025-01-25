function Wind({ wind, isKph }){
    const getDirectionName = (direction) => {
        const directionMap = {
            "N": "North",
            "E": "East",
            "S": "South",
            "W": "West",
            "NE": "Northeast",
            "SE": "Southeast",
            "SW": "Southwest",
            "NW": "Northwest",
            "WNW": "West-Northwest",
            "NNW": "North-Northwest",
            "NNE": "North-Northeast",
            "ENE": "East-Northeast",
            "ESE": "East-Southeast",
            "SSE": "South-Southeast",
            "SSW": "South-Southwest",
            "WSW": "West-Southwest"
        }

        return directionMap[direction]
    }

    return(
        <div className="more-info-tile-border mt-5">
            <div className="more-info-tile">
                <div className="more-info-title">
                    <i className="fa-solid fa-wind"></i>
                    <p>Wind</p>
                </div>
                <div className="mt-2">
                    <p>Speed: {isKph ? `${wind.wind_kph} kph` : `${wind.wind_mph} mph`}</p>
                    <p>Direction: {getDirectionName(wind.wind_dir)}</p>
                </div>
            </div>
        </div>
    )
}

export default Wind