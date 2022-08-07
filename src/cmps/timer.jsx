import { useEffect, useState } from "react"


export const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.secondsAmount);
    const [timerClass, setTimerClass] = useState('')
    var intervalId = null;

    useEffect(() => {
        intervalId = setInterval(() => {
            setSeconds(seconds => {
                if (seconds - 1 <= 0) {
                    onTimesUp()
                    clearInterval(intervalId)
                }
                else if (seconds < 5) {
                    setTimerClass('danger')
                } else if (seconds < 12) {
                    setTimerClass('warning')
                }
                return seconds - 1
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);


    const onTimesUp = () => {
        props.timesUp()
    }


    return (
        <div className={`timer ${timerClass}`}>
            {seconds !== 0 ? seconds + ' s' : 'Time\'s up'}
        </div>
    );
};
