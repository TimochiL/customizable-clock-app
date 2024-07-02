import Navbar from "./components/Navbar"
import Clock from "./components/Clock"
import { useState } from 'react'

function App() {
    const [data, setData] = useState({
        clockPosition: 'center',
        timeFormatSettings: {
            timeFormat: '',
            showSeconds: false,
            showMeridiem: false,
        },
    })

    const settingsUpdateToApp = (navData) => {
        setData(navData)
    }

    return (
        <>
            <Navbar
                settingsUpdateToApp={settingsUpdateToApp}
                data={data}
            />
            <Clock
                clockPosition={data.clockPosition}
                timeFormatSettings={data.timeFormatSettings}
            />  
        </>
    )
}

export default App
