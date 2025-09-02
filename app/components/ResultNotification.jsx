export default function ResultNotification({isCorrect}) {
    return (
        <div style={{top: window.scrollY}} className="absolute w-[100vw] h-full z-20 flex justify-center items-center">
            <div className="z-20 flex flex-col items-center bg-background rounded-md w-[175px] h-[225px] p-4 gap-y-4">
                {isCorrect ?
                <> 
                    <img src="/images/success-quest.png" alt="" />
                    <p className="font-bold text-xl">BENAR</p> 
                </>
                :
                <>
                    <img src="/images/fail-quest.png" alt="" />
                    <p className="font-bold text-xl">SALAH</p> 
                </>}
            </div>
            <div id="overlay" className="z-10 absolute bg-black opacity-30 w-full h-full"></div>
        </div>
    )
}



