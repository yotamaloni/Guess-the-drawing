import { useEffect, useState } from "react"
import { eventBusService } from "../services/event-bus.service"


export const UserMsg = () => {
    const [msg, setMsg] = useState(null)
    let timeoutId = null
    useEffect(() => {
        const setUserMsg = eventBusService.on('user-msg', (msg) => {
            clearTimeout(timeoutId)
            setMsg(msg)
            setTimeout(() => {
                setMsg(null)
            }, 3000)
        })
        return () => {
            setUserMsg()
        }
    }, [])


    if (!msg) return <div></div>
    return (
        <section className={`user-msg ${msg.class}`}>
            {msg.txt}
            <div className='btn-container'>
                <button
                    onClick={() => {
                        setMsg(null)
                    }}
                >
                    x
                </button>
            </div>
        </section>
    )
}