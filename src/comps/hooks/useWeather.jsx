import { useState } from "react";
import useLocalWeather from "./useLocalWeather";
import useGlobalWeather from "./useGlobalWeather";

export default function useWeather(apiKey, setCurrentTime, newLocation){
    // Data state
    const [data, setData] = useState(null);

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    if(!newLocation){
        useLocalWeather(apiKey, newLocation, data, setData, setIsLoading, setCurrentTime)
    } else{
        useGlobalWeather(apiKey, newLocation, data, setData, setIsLoading, setCurrentTime)
    }

    return { data, isLoading }
}