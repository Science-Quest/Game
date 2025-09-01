import { SoundProvider } from "../../components/SoundProvider"
import App from "./App"

export default function root({params}) {
    return(
        <SoundProvider>
            <App level={params.level}/>
        </SoundProvider>
    )
}