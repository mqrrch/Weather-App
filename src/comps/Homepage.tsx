import { useReduxSelector } from "../hooks/useReduxSelector"

export default function Homepage(){
    const data = useReduxSelector(state => state.data.data)

    return(
        <section id="homepage" className="flex flex-col gap-2 justify-center items-center mt-[5rem]">
            <h2 className="text-2xl">{data?.location.name}</h2>
            <h1 className="text-5xl">{data?.current.temp_c}°C</h1>
            <h4 className="text-xl">{data?.current.condition.text}</h4>
        </section>
    )
}