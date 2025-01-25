import { useState, useEffect } from "react";

export default function useLocalWeather(apiKey, newLocation, data, setData, setIsLoading, setCurrentTime){
    // Fetch data from the API
    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=yes`
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

    // Get location and then do the data fetching
    useEffect(() => {
        const getData = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(latitude, longitude);
                },
                (error) => {
                console.error(`Error getting position: ${error.message}`)
                }
            );
        };

        getData();

        const getDataPerTime = setInterval(() => {
            getData();
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