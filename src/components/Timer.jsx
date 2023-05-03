import React, { useState, useEffect } from 'react';


const Timer = ({ time }) => {
    const [Counter, setCounter] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(time++);
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    return (
        Counter
    )
}

export default Timer

