export default function Astrology({ astrology }){
    return(
        <div className="more-info-tile-border mt-5">
            <div className="more-info-tile">
                <div className="more-info-title">
                    <i className="fa-solid fa-globe"></i>
                    <p>Astrology</p>
                </div>
                <div className="mt-2 more-info-desc">
                    <p>Sunrise: {astrology.sunrise}</p>
                    <p>Sunset: {astrology.sunset}</p>
                    <p>Moonrise: {astrology.moonrise}</p>
                    <p>Moonset: {astrology.moonset}</p>
                    <p>Moon Phase: {astrology.moon_phase}</p>
                </div>
            </div>
        </div>
    )
}