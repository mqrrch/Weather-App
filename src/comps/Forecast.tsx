import { useState } from "react";
import { useReduxSelector } from "../hooks/useReduxSelector"
import type { Hour } from "../features/dataTypes";

interface Props{
    currentTime: string
}

export default function Forecast({ currentTime }: Props){
    const page = useReduxSelector(state => state.page.page);
    const data = useReduxSelector(state => state.data.data);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    function chunkArray(array: Hour[] | undefined, chunkSize: number){
        const chunks = [];
        if (!array) return;
        for (let i = 0; i < array.length; i += chunkSize){
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const hourlyChunks = chunkArray(data?.forecast.forecastday[0].hour, 4);

    return(
        <>
            {page === "forecast" && (
                <section id="forecast-page" className="absolute top-0 left-0 w-full p-4 py-13 z-[5] bg-[#5f9599]">
                    <div className="flex gap-1 pb-1.5">
                        <button
                            className="place-content-center cursor-pointer bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.8)] disabled:opacity-50 disabled:hover:bg-[rgba(0,0,0,0.3)] transition-colors duration-200 rounded-l-lg p-1"
                            onClick={() => setCurrentSlide(prev => prev - 1)}
                            disabled={currentSlide === 0}
                        >
                            <div className="arrow arrow-left ml-1"></div>
                        </button>

                        <div className="flex-1 overflow-hidden">
                            <div 
                                className="flex transition-transform duration-300"
                                style={{ transform: `translateX(-${currentSlide * 100}%)`}}
                            >
                                {hourlyChunks?.map((hourChunk, index) => (
                                    <div key={index} className="min-w-full flex gap-2">
                                        {hourChunk.map((hour, index) => (
                                            <div 
                                                key={index} 
                                                className={`border-2 border-white rounded flex flex-col items-center ${hour.time.split(" ")[1].split(":")[0] === currentTime && "bg-[rgba(92,113,246,0.4)]"}`}
                                            >
                                                <p>{hour.time.split(" ")[1]}</p>
                                                <img src={hour.condition.icon} className="w-full h-auto"></img>
                                                <p className="text-sm">{hour.temp_c}°C</p>
                                            </div>
                                        ))}
                                    </div>  
                                ))}
                            </div>
                        </div>

                        <button
                            className="place-content-center cursor-pointer bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.8)] disabled:opacity-50 disabled:hover:bg-[rgba(0,0,0,0.3)] transition-colors duration-200 rounded-r-lg p-1"
                            onClick={() => setCurrentSlide(prev => prev + 1)}
                            disabled={currentSlide + 1 === hourlyChunks?.length}
                        >
                            <div className="arrow arrow-right mr-1"></div>
                        </button>
                    </div>

                    <div className="text-sm p-2 border-2 border-[#acd5b1] rounded mt-2">
                        <p className="text-base font-semibold">Location</p>
                        <p>Country : {data?.location.country}</p>
                        <p>Region : {data?.location.region}</p>
                        <p>City : {data?.location.name}</p>
                        <p>Local Time : {data?.location.localtime.split(" ")[1   ]}</p>
                    </div>

                    <div>
                        <p>Weather Condition</p>
                        <p>{data?.current.condition.text}</p>
                    </div>
                    <div>
                        <p>Chance of rain</p>
                        <p>{data?.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                    </div>
                </section>
            )}
        </>
    )
}