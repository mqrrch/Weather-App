import { useDispatch } from "react-redux"
import { setPage } from "../features/pageSlice"

export default function Navbar(){
    const links = [
        { name: "Home", logo: "fa-house" },
        {  name: "Forecast", logo: "fa-cloud" },
        {  name: "Astrology", logo: "fa-moon" },
        {  name: "Search", logo: "fa-magnifying-glass" },
    ]

    const dispatch = useDispatch();

    return (
        <nav className="sticky top-0 left-0 z-10 p-3 px-8 backdrop-blur-[2px] w-full flex justify-between text-xl">
            {links.map((link, index) => (
                <div key={index} className="relative">
                    <i 
                        className={`fa-solid ${link.logo} cursor-pointer peer`}
                        onClick={() => dispatch(setPage(link.name.toLowerCase()))}
                    ></i>
                    <div className="absolute top-9 -translate-x-1/2 left-1/2 px-2 py-1 bg-[#080808] border-2 border-[#1c1c1c] rounded invisible peer-hover:visible">
                        <p className="text-[#f8f8f8] text-sm">{link.name}</p>
                    </div>
                </div>
            ))}
        </nav>
    )
}