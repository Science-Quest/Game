import { SoundProvider } from "../components/SoundProvider"
import { usePreloadImages } from "../utilities/usePreloadImages";
import { Outlet } from "react-router"

export default function root() {

    usePreloadImages([
        "/images/success-quest.png",
        "/images/fail-quest.png",
        "/images/trophy.png"
    ]);

    return(
        <SoundProvider>
            <Outlet />
        </SoundProvider>
    )
}