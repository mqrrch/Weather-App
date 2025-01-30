import { useTransition, animated } from "@react-spring/web"
import { useState } from "react"

export default function ChangeLocation({ isChangeOpen, setIsChangeOpen, setNewLocation }){
    // State for the change location input
    const [locationName, setLocationName] = useState("")

    // Transition for overlay and the popup
    const overlayTransition = useTransition(isChangeOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const changeLocationTransition = useTransition(isChangeOpen, {
        from: { transform: "translateY(150%)" },
        enter: { transform: "translateY(0%)" },
        leave: { transform: "translateY(150%)" },
    })

    // Handles the use your location button
    const handleLocalLocation = () => {
        // Gets latitude and longitude then set the new location with it, it will then go straight to the useWeather hook
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const currentPosition = `${latitude},${longitude}`
            setNewLocation(currentPosition);
        }, error => {
            // If user denies the location permission, then it go to New York
            console.error(`Got error: ${error}`)
            console.log(`Setting New York as the fallback location...`)
            setNewLocation("New York");
        })
    }

    // Handles submitting the new location
    const handleSubmit = (e) => {
        e.preventDefault();
        setNewLocation(locationName);
        setLocationName("")
    }

    return(
        overlayTransition(
            (styles, item) => 
                item && (
                    <animated.div style={{...styles, backgroundColor: 'rgba(0, 0, 0, .5)'}} onClick={() => setIsChangeOpen(false)}
                    className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
                        {changeLocationTransition(
                            (styles, item) =>
                                item && (
                                    <animated.form style={styles} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}
                                    className="relative bg-blue-500 rounded-xl flex flex-col gap-2 p-4 pt-8">
                                        <div>
                                            <i className="fa-solid fa-xmark absolute top-2 right-3" onClick={() => setIsChangeOpen(false)}></i>
                                        </div>
                                        <label htmlFor="new-location">Pass a city name or an IP address</label>
                                        <input id="new-location"
                                        name="new-location"
                                        value={locationName}
                                        onChange={e => setLocationName(e.target.value)}
                                        autoComplete="off"
                                        className="change-location-input"></input>
                                        <button type="submit" className="change-location-btn">Change location</button>
                                        <button type="button" className="local-location-btn" onClick={handleLocalLocation}>Use your location</button>
                                    </animated.form>
                                )
                        )}
                    </animated.div>
                )
        )
    )
}