import { useState, useEffect } from "react";

export default function useGlobalWeather(apiKey, newLocation, data, setData, setIsLoading, setCurrentTime){
    // Fetch data from the API
    const fetchWeather = async (location) => {
        try {
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=yes&alerts=yes`
            );
            const data = await response.json();
            setData(data);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } catch(error) {
            console.error('Error fetching data:', error)
        }
    };

    // Fetch data at the start or when theres new location set and for every 10 minutes
    useEffect(() => {
        fetchWeather(newLocation)
        
        const getDataPerTime = setInterval(() => {
            fetchWeather(newLocation)
        }, 600000);

        return () => clearInterval(getDataPerTime);
    }, [apiKey, newLocation])

    // Change current time each time data changes
    useEffect(() => {
        if(data){
            setCurrentTime(data.current.last_updated.split(" ")[1].split(":")[0])
        }
    }, [data])
}