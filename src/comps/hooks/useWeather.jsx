import { useState, useEffect } from "react";
import getBackgroundColor from "../getBackgroundColor";

export default function useWeather(apiKey, setCurrentTime, newLocation){
    // Data state
    const [data, setData] = useState(null);

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    // Current location state
    const [currentLocation, setCurrentLocation] = useState(null);

    // Previous location state
    const [prevLocation, setPrevLocation] = useState(null);

    // How it supposed to work:
    // 1 First it gets the current location of the user if it gets allowed and display it
    //     - If it doesnt get allowed, they will need to set it from the change location
    //     - Or just set random city as substitute
    // 2 Then it will fetch the data for every 10 minutes to maintain a correct information
    // 3 There will also be currentTime to set a correct time on the hourly forecast
    // 4 When location is changed, it will fetch the data of that location for every 10 minutes

    // Gets current location of the user
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const currentPosition = `${latitude},${longitude}`
            setCurrentLocation(currentPosition);
        }, error => {
            console.error(`Got error: ${error}`)
            console.log(`Setting New York as the fallback location...`)
            setCurrentLocation("New York");
        })
    }, [])

    // Function to fetch data from the API from the location
    const fetchWeather = async (location) => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=yes&alerts=yes`
            );

            // If the response failed, we fetch the data with the previous location
            if(!response.ok){
                fetchWeather(prevLocation);
                setCurrentLocation(prevLocation);
                return;
            }

            // Get data when response is successful and set previous location to the successful location
            const data = await response.json();
            setData(data);
            setPrevLocation(location)

            // Set a bit of timer before the loading turns false
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);

            getBackgroundColor(data.current.condition.text, data.current.condition.icon);
            
        } catch(error) {
            console.error('Error fetching data:', error)
        }
    };


    // Fetch data for every 10 minutes from the fetchWeather function
    useEffect(() => {
        // Checks whether current location is defined yet or not. If its not, instantly return
        if (!currentLocation) return;

        // Fetch the data for the first time
        fetchWeather(currentLocation);
        
        // Fetch the data periodically
        const getDataPerTime = setInterval(() => {
            fetchWeather(currentLocation);
        }, 600000);

        // Cleaning interval
        return () => clearInterval(getDataPerTime);
    }, [currentLocation])


    // Checks if the user changed the location or not, if so, set the current location to that new location
    useEffect(() => {
        if (newLocation){
            setCurrentLocation(newLocation);
        }
    }, [newLocation])


    // Maintain a correct hour on the hourly forecast
    useEffect(() => {
        if(data){
            setCurrentTime(data.current.last_updated.split(" ")[1].split(":")[0])
        }
    }, [data])
    
    return { data, isLoading }
}