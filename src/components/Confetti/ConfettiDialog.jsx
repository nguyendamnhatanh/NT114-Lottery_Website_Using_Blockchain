import React, { useState } from 'react'

import { Button, Dialog, Slide } from '@mui/material'
import { badgeCheck, winnerTrophy } from '../../assets'
import Confetti from './Confetti'
import { shortenAddress } from '../../utils/shortenAddress'
import { useBaseUrl } from '../../hook'
import { useStateContext } from '../../context'
import ClaimAward from '../LotteryRoom/ClaimAward'

const ConfettiDialog = ({ pool, transactionTime, handleClickOpen, handleCloseDialog, isOpen, winner }) => {
    return (
        <div className='flex justify-center items-center'>

            {/* <Button variant="outlined" onClick={() => handleClickOpen()}>
                Open full-screen dialog
            </Button> */}

            <Dialog
                fullScreen
                open={isOpen}
                onClose={() => handleCloseDialog()}
            >
                <div className='absolute w-full h-full overflow-hidden'>
                    <Confetti />
                </div>
                <div className='flex w-full h-full justify-center items-center'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div>
                            <div className='relative w-full h-full'>
                                <img src={winnerTrophy} className='w-full h-full max-w-[300px] ' />
                                <div className='absolute bottom-[4%] left-[0%] right-0 text-black font-mono text-center'>
                                    <p className='font-epilogue font-mono text-[25px] text-center text-black uppercase'>{winner?.number}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-epilogue font-mono text-[25px] text-center text-black uppercase">Congratulations!  {shortenAddress(winner ? winner?.address : '')}</p>
                            <p className="font-epilogue font-mono text-[25px] text-center text-black uppercase">You won the lottery!</p>
                            <p className="font-epilogue font-mono text-[25px] text-center text-black uppercase">Your winning lucky number is: {winner?.number}</p>
                            <p className="font-epilogue font-mono text-[25px] text-center text-black uppercase">You won: {pool} ETH</p>
                        </div>
                        {/* <p className="font-epilogue font-sans text-[25px] text-center text-black uppercase">Transaction time: {transactionTime} seconds</p> */}
                        <ClaimAward winner={winner} handleCloseThis={handleCloseDialog} />
                    </div>
                </div>
            </Dialog >
        </div >
    )
}

export default ConfettiDialog