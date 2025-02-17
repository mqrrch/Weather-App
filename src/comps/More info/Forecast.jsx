import { useEffect, useRef, useState } from "react"

function Forecast({ hourly_forecast, currentTime, setCurrentTime, isFahrenheit }){
    // Ref and states for horizontal scrolling by dragging
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    }

    const handleMouseLeave = () => {
        setIsDragging(false);
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX);
        containerRef.current.scrollLeft = scrollLeft - walk;
    }

    // Disabling vertical scroll and change it to horizontal scroll when mouse are in the forecast container
    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener("wheel", function(e){
                if (Math.abs(e.deltaY) > 0){
                    e.preventDefault();
                    containerRef.current.scrollLeft += e.deltaY;
                }
            }, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener("wheel", function(e){
                    if (Math.abs(e.deltaY) > 0){
                        e.preventDefault();
                        containerRef.current.scrollLeft += e.deltaY;
                    }
                }, { passive: false });
            }
        }
    }, [])

    return(
        <div className="flex gap-4 p-1 overflow-x-auto scrollbar-hide whitespace-nowrap"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}>
            {hourly_forecast.map((item, index) => {
                return parseInt(currentTime) === index ?
                (
                    <div key={index} className="text-center forecast-card current-forecast flex flex-col items-center justify-between cursor-pointer hover:bg-[rgba(0,0,0,0.4)] transition-colors">
                        <p className="forecast-time mb-2">{item.time.split(' ')[1]}</p>
                        <div className="forecast-img-wrapper">
                            <img src={item.condition.icon}
                            className="forecast-icon w-full h-auto select-none min-w-[40px]" draggable="false"></img>
                        </div>
                        <p className="forecast-temp mt-2">{isFahrenheit ? `${item.temp_f}°F` : `${item.temp_c}°C`}</p>
                    </div>
                ) : (
                    <div key={index} className="text-center forecast-card flex flex-col items-center justify-between cursor-pointer hover:bg-[rgba(255,255,255,0.2)] transition-colors"
                    onClick={() => setCurrentTime(index)}>
                        <p className="forecast-time mb-2">{item.time.split(' ')[1]}</p>
                        <div className="forecast-img-wrapper">
                            <img src={item.condition.icon}
                            className="forecast-icon w-full h-auto select-none min-w-[40px]" draggable="false"></img>
                        </div>
                        <p className="forecast-temp mt-2">{isFahrenheit ? `${item.temp_f}°F` : `${item.temp_c}°C`}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Forecast