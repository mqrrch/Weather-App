import { useState, useEffect, useCallback, useRef } from "react";
import type { Root } from "../features/dataTypes";
import { useDispatch } from "react-redux";
import { setData } from "../features/dataSlice";

interface Props{
    apiKey: string
    setCurrentTime: React.Dispatch<React.SetStateAction<string>>
    newLocation: string
}

export default function useFetchData({ apiKey, setCurrentTime, newLocation }: Props){
    const [fullData, setFullData] = useState<Root | null>(null);
    const dispatch = useDispatch();

    // Loading state
    // const [isLoading, setIsLoading] = useState(true);

    const [currentLocation, setCurrentLocation] = useState<string>("");
    const [prevLocation, setPrevLocation] = useState<string>("");


    // Set ref for prev and current location
    const prevLocationRef = useRef(prevLocation);
    const currentLocationRef = useRef(currentLocation);

    useEffect(() => {
        prevLocationRef.current = prevLocation;
    }, [prevLocation]);

    useEffect(() => {
        currentLocationRef.current = currentLocation;
    }, [currentLocation]);


    // Gets current location of the user
    useEffect(() => {
        if (!newLocation){
            navigator.geolocation.getCurrentPosition(position => {
                const currentPosition = `${position.coords.latitude},${position.coords.longitude}`;
                setCurrentLocation(currentPosition);
            }, () => setCurrentLocation("New York"));
        }
    }, [newLocation])


    // Function to fetch data from the API from the location
    const fetchWeather = useCallback(async (location: string) => {
        const controller = new AbortController();
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=yes&alerts=yes`, {
                signal: controller.signal
            })

            // If the response failed, we fetch the data with the previous location
            if(!response.ok){
                if(prevLocationRef.current && prevLocationRef.current !== location){
                    fetchWeather(prevLocationRef.current);
                    setCurrentLocation(prevLocationRef.current);
                }
                return;
            }

            // Get data when response is successful and set previous location to the successful location
            const data = await response.json();
            setFullData(data);
            setPrevLocation(location)

            // Set a bit of timer before the loading turns false
            setTimeout(() => {
                // setIsLoading(false);
            }, 2000);

            // getBackgroundColor(data.current.condition.text, data.current.condition.icon);
            
        } catch(error) {
            if (!controller.signal.aborted){
                console.error('Error fetching data:', error)
            }
        }
        return () => controller.abort();
    }, [apiKey]);


    // Fetch data for every 10 minutes from the fetchWeather function
    useEffect(() => {
        // Checks whether current location is defined yet or not. If its not, instantly return
        if (!currentLocation) return;

        // Fetch the data for the first time
        fetchWeather(currentLocation);
        
        // Fetch the data periodically
        const getDataPerTime = setInterval(() => {
            fetchWeather(currentLocationRef.current);
            console.log("got fetched per 10 mins brow")
        }, 600000);

        // Cleaning interval
        return () => clearInterval(getDataPerTime);
    }, [currentLocation, fetchWeather])


    // Checks if the user changed the location or not, if so, set the current location to that new location
    useEffect(() => {
        if (newLocation){
            setCurrentLocation(newLocation);
        }
    }, [newLocation])


    // Maintain a correct hour on the hourly forecast
    useEffect(() => {
        if(fullData){
            setCurrentTime(fullData.current.last_updated.split(" ")[1].split(":")[0])
        }
    }, [fullData, setCurrentTime])
    

    // Set data every time data changes
    useEffect(() => {
        dispatch(setData(fullData));
    }, [dispatch, fullData]);
}