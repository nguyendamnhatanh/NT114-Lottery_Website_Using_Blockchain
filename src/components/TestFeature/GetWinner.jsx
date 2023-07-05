import { Button } from '@mui/material';
import React from 'react';
import { useStateContext } from '../../context';

const GetWinner = () => {

    const { winner } = useStateContext();

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