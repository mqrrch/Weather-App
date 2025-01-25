export default function Ultraviolet({ uv }){
    const getMessage = (uv) => {
        if (uv <= 2){
            return "Minimal risk"
        } else if (uv <= 5){
            return "Moderate risk"
        } else if (uv <= 7){
            return "High risk"
        } else if (uv <= 10){
            return "Very high risk"
        } else if (uv > 10){
            return "Extreme risk"
        }
    }

    return(
        <div className="more-info-tile-border mt-5">
            <div className="more-info-tile">
                <div className="more-info-title">
                    <i className="fa-solid fa-sun"></i>
                    <p>UV</p>
                </div>
                <div className="mt-2">
                    <p>{uv}</p>
                    {/* <p>{getMessage(uv)}</p> */}
                </div>
            </div>
        </div>
    )
}