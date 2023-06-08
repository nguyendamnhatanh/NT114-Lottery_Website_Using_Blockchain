import React, { useEffect, useRef, useState, } from 'react'
import { io } from 'socket.io-client';
import useBaseUrl from './useBaseUrl';

const useWinner = () => {
    const base_url = useBaseUrl();
    const [winner, setWinner] = useState(false);
    const [socket, setSocket] = useState(null);
    const counterUseEffect = useRef(0);
    useEffect(() => {
        if (counterUseEffect.current === 0) {
            const socket = io(base_url);
            console.log("🚀 Socket on", socket)
            setSocket(socket);
            socket.on('luckyTime', (data) => {
                if (!winner && data) setWinner(data);
            });
            counterUseEffect.current++;
        }
    }, []);

    const getWinner = () => {
        if (socket) {
            console.log("🚀 emit", socket)
            socket?.emit('luckyTime', 'getWinner');
        }
    };

    return { data: winner, getWinner };
}

export default useWinner