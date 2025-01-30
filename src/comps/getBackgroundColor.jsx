// Function to get the weather and time of day by categorizing it and then set the background color

export default function getBackgroundColor(weatherData, timeOfDayData){
    let weather;
    if (weatherData.toLowerCase().includes('sunny')){
        weather = "sunny"
    }
    if (weatherData.toLowerCase().includes('clear')){
        weather = "clear"
    }
    if (
        weatherData.toLowerCase().includes('cloud') || 
        weatherData.toLowerCase().includes('overcast') ||
        weatherData.toLowerCase().includes('mist') ||
        weatherData.toLowerCase().includes('fog')
    ){
        weather = "cloudy"
    }
    if (
        weatherData.toLowerCase().includes('rain') || 
        weatherData.toLowerCase().includes('drizzle') ||
        weatherData.toLowerCase().includes('shower') ||
        weatherData.toLowerCase().includes('sleet') ||
        weatherData.toLowerCase().includes('thunder')
    ){
        weather = "rainy"
    }
    if (
        weatherData.toLowerCase().includes('snow') ||
        weatherData.toLowerCase().includes('freezing') ||
        weatherData.toLowerCase().includes('blizzard') ||
        weatherData.toLowerCase().includes('ice')
    ){
        weather = "snowy"
    }
    
    const timeOfDay = String(timeOfDayData.split('/')[5])

    const colors = {
        sunny: { 
            day: "linear-gradient(to bottom, #6FCFEC, #8CD9F5)", 
            night: "" 
        },
        cloudy: { 
            day: "linear-gradient(to bottom, #D3D3D3, #A9A9A9)", 
            night: "linear-gradient(to bottom, #002746, #003A63)" 
        },
        rainy: { 
            day: "linear-gradient(to bottom, #6CA6CD, #4682B4)", 
            night: "linear-gradient(to bottom, #2E3B4E, #1C1C1C)" 
        },
        clear: {
            day: "linear-gradient(to bottom, #6FCFEC, #8CD9F5)", 
            night: "linear-gradient(to bottom, #01162E, #01426D)" 
        },
        snowy: {
            day: "linear-gradient(to bottom, #F0FFFF, #ADD8E6)", 
            night: "linear-gradient(to bottom, #003A63, #5F9EA0)" 
        },
    }

    document.body.style.background = colors[weather][timeOfDay]

    return { weather, timeOfDay }
}