import { Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'

import { io } from 'socket.io-client';

import { useStateContext } from '../../context';
import { useBaseUrl, useWinner } from '../../hook';

const GetWinner = () => {    

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