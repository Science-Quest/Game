import { SoundProvider } from "../components/SoundProvider"

import { Outlet } from "react-router"

export default function root() {
    return(
        <SoundProvider>
            <Outlet />
        </SoundProvider>
    )
}