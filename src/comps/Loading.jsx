export default function Loading({ isLoading }){
    return (
        isLoading ? (
            <div className="loader-wrapper fixed flex justify-center items-center top-0 left-0 w-full h-screen z-30">
                <div className="loader"></div>
            </div>
        ) : (
            <div className="loader-wrapper loader-out fixed flex justify-center items-center top-0 left-0 w-full h-screen z-30">
                <div className="loader"></div>
            </div>
        )
    )
}