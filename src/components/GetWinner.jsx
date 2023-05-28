import { Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'

import { io } from 'socket.io-client';
import { useBaseUrl } from '../hook';
import { useStateContext } from '../context';

const GetWinner = () => {
    const { setWinner, winner } = useStateContext();
    const base_url = useBaseUrl();

    const [socket, setSocket] = useState(null);
    const counterUseEffect = useRef(0);

    useEffect(() => {
        if (counterUseEffect.current === 0) {
            const socket = io(base_url);
            setSocket(socket);
            socket.on('luckyTime', (data) => {
                setWinner(data);
                console.log("🚀 ~ file: LotteryRoomNew.jsx:71 ~ socket.on ~ data:", data)
            });
            counterUseEffect.current++;
        }
    }, []);


    const getWinner = () => {
        socket.emit('luckyTime', 'getWinner');
    };

    return (
        <div className='flex justify-center items-center p-10'>
            <Button variant="filled" onClick={getWinner}
                sx={
                    {
                        color: '#fff',
                        backgroundColor: '#4acd8d',
                        '&:hover': {
                            backgroundColor: '#4acd8d',
                            opacity: [0.9, 0.8, 0.7],
                        },
                        '&:loading': {
                            backgroundColor: '#4acd8d',
                            opacity: [0.9, 0.8, 0.7],
                        },
                        '&:disabled': {
                            backgroundColor: '#4acd8d',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }
                }>
                Get Winner
            </Button>
        </div >
    )
}

export default GetWinner