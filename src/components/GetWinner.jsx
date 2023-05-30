import { Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'

import { io } from 'socket.io-client';
import { useBaseUrl } from '../hook';
import { useStateContext } from '../context';

import useWinner from '../hook/useWinner';

const GetWinner = () => {
    // const base_url = useBaseUrl();

    // const [socket, setSocket] = useState(null);
    // const counterUseEffect = useRef(0);

    // useEffect(() => {
    //     if (counterUseEffect.current === 0) {
    //         const socket = io(base_url);
    //         console.log("🚀", socket)
    //         setSocket(socket);
    //         socket.on('luckyTime', (data) => {
    //             setWinner(data);
    //         });
    //         counterUseEffect.current++;
    //     }
    // }, []);


    // const getWinner = () => {
    //     console.log("🚀 emit")
    //     socket.emit('luckyTime', 'getWinner');
    // };

    // const magic = useWinner();

    const {  winner } = useStateContext();

    return (
        <div className='flex justify-center items-center p-10'>
            <Button variant="filled" onClick={winner.getWinner}
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