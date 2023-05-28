import { Button, Dialog } from '@mui/material'
import React, { useState } from 'react'
import { badgeCheck } from '../assets'
import Confetti from './Confetti'
import { shortenAddress } from '../utils/shortenAddress'
import { useBaseUrl } from '../hook'
import { useStateContext } from '../context'

const ConfettiDialog = () => {

    const { address, luckyNumber, pool, transactionTime } = useStateContext();

    const [FSDOpen, setFSDOpen] = useState(false);

    const handleClickOpen = () => {
        setFSDOpen(true);
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const handleClose = () => {
        setFSDOpen(false);
    };
    return (
        <div className='flex justify-center items-center'>

            <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>

            <Dialog
                fullScreen
                open={FSDOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <div className='absolute w-full h-full overflow-hidden'>
                    <Confetti />
                </div>

                <div className='flex w-full h-full justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={badgeCheck} alt="image" className="w-[200px] h-[200px] object-contain" />
                        <p className="font-epilogue font-sans text-[25px] text-center text-black uppercase">Congratulations!  {shortenAddress(address)}</p>
                        <p className="font-epilogue font-sans text-[25px] text-center text-black uppercase">You won the lottery!</p>
                        <p className="font-epilogue font-sans text-[25px] text-center text-black uppercase">Your winning lucky number is: {luckyNumber}</p>
                        <p className="font-epilogue font-sans text-[25px] text-center text-black uppercase">You won: {pool} ETH</p>
                        <p className="font-epilogue font-sans text-[25px] text-center text-black uppercase">Transaction time: {transactionTime} seconds</p>
                    </div>
                </div>
            </Dialog >
        </div >
    )
}

export default ConfettiDialog