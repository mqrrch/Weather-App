export default function Condition({ conditionText }){
    return(
        <div className="more-info-tile-border mt-5">
            <div className="more-info-tile">
                <div className="more-info-title">
                    <i className="fa-solid fa-cloud"></i>
                    <p>Weather Condition</p>
                </div>
                <div className="mt-2">
                    <p>{conditionText}</p>
                </div>
            </div>
        </div>
    )
}