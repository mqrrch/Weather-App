export default function ChanceOfRain({ chanceOfRain }){
    return(
        <div className="more-info-tile-border mt-5">
            <div className="more-info-tile">
                <div className="more-info-title">
                    <i className="fa-solid fa-cloud-rain"></i>
                    <p>Chance of rain</p>
                </div>
                <div className="mt-2">
                    <p>{chanceOfRain}%</p>
                </div>
            </div>
        </div>
    )
}