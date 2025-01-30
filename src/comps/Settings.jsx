import { animated, useTransition } from "@react-spring/web"

export default function Settings({ isSettings, setIsSettings, isKph, setIsKph, isFahrenheit, setIsFahrenheit }){
    // Overlay and popup transition
    const overlayTransition = useTransition(isSettings, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const settingsTransition = useTransition(isSettings, {
        from: { transform: "translateY(150%)" },
        enter: { transform: "translateY(0%)" },
        leave: { transform: "translateY(150%)" },
    })

    return(
        overlayTransition(
            (styles, item) => 
                item && (
                    <animated.div style={{...styles, backgroundColor: 'rgba(0, 0, 0, .5)'}} onClick={() => setIsSettings(false)}
                    className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
                        {settingsTransition(
                            (styles, item) =>
                                item && (
                                    <animated.form style={styles} onClick={e => e.stopPropagation()}
                                    className="relative bg-blue-500 rounded-xl flex flex-col gap-2 p-4 pt-8">
                                        <div>
                                            <i className="fa-solid fa-xmark absolute top-2 right-3" onClick={() => setIsSettings(false)}></i>
                                        </div>
                                        <div className="flex justify-between gap-10">
                                            <p>Use kph</p>
                                            <input type="checkbox" checked={isKph} onChange={() => setIsKph(prev => !prev)}
                                            name="is-kph" id="is-kph"></input>
                                        </div>
                                        <div className="flex justify-between gap-10">
                                            <p>Use fahrenheit</p>
                                            <input type="checkbox" 
                                            checked={isFahrenheit} onChange={() => setIsFahrenheit(prev => !prev)} 
                                            name="is-fahrenheit" id="is-fahrenheit"></input>
                                        </div>
                                    </animated.form>
                                )
                        )}
                    </animated.div>
                )
        )
        
    )
}