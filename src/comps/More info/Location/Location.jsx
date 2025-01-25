import { useState } from "react"
import ChangeLocation from "./ChangeLocation";

export default function Location({ location, newLocation, setNewLocation }){
    const [isChangeOpen, setIsChangeOpen] = useState(false);

    return(
        <div className="more-info-tile-border mt-5">
            <ChangeLocation isChangeOpen={isChangeOpen} setIsChangeOpen={setIsChangeOpen} newLocation={newLocation} setNewLocation={setNewLocation} />
            <div className="more-info-tile">
                <div className="flex justify-between items-center">
                    <div className="more-info-title">
                        <i className="fa-solid fa-location-dot"></i>
                        <p>Location</p>
                    </div>
                    <a className="text-xs text-dark-grey underline cursor-pointer"
                    onClick={() => setIsChangeOpen(true)}>
                        Change location
                    </a>
                </div>
                <div className="mt-2">
                    <p>Country: {location.country}</p>
                    <p>Region: {location.region}</p>
                    <p>City: {location.name}</p>
                    <p>Estimated Time: {location.localtime.split(" ")[1]}</p>
                </div>
            </div>
        </div>
    )
}