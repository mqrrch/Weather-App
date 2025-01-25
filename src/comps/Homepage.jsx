function Homepage({ city, temp_c, temp_f, condition, isFahrenheit }){
    return (
        <div className="">
            <div className="text-center">
                <p className="text-2xl">{city}</p>
                <p className="text-5xl">{isFahrenheit ? `${temp_f}°F` : `${temp_c}°C`}</p>
                <p className="">{condition}</p>
            </div>
        </div>
    )
}

export default Homepage