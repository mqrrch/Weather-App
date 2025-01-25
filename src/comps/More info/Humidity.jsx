export default function Humidity({ humidity }){
    const getMessage = (humidity) => {
        if (humidity <= 70){
            return "Comfortable"
        } else if (humidity <= 80){
            return "Uncomfortable"
        } else if (humidity <= 85){
            return "Very uncomfortable"
        } else if (humidity > 85){
            return "Risk of heat stress"
        }
    }

    return(
        <div className="more-info-tile-border mt-5">
            <div className="more-info-tile">
                <div className="more-info-title">
                    <i className="fa-solid fa-droplet"></i>
                    <p>Humidity</p>
                </div>
                <div className="mt-2">
                    <p>{humidity}%</p>
                    {/* <p>{getMessage(humidity)}</p> */}
                </div>
            </div>
        </div>
    )
}