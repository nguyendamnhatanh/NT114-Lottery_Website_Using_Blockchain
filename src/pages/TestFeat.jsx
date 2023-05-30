
import React, { useEffect, useState } from 'react';

import { ethers } from 'ethers'

import { ConfettiDialog } from '../components';

import { useStateContext } from '../context';

import { useAxios } from '../hook';
import { Button } from '@mui/material';


// import { LotteryRoomNew } from '.';

// test txHash: 0x56c892e3a97b9a6644ec07fe8626d0fa8a59ee4403fefcdd4302a865005c86e0


const TestFeat = () => {
  
  const [FSDOpen, setFSDOpen] = useState(false);

  useEffect(() => {
    console.log(FSDOpen)
  }, [FSDOpen]);

  const handleOpen = () => {
    setFSDOpen(true);
  };

  const handleClose = () => {
    setFSDOpen(false);
  };

  return (
    <div className='flex flex-1 justify-center items-center '>
      <ConfettiDialog
        address={'0x86032ac4010E601828e56C57c2Fe9B79b1141B13'}
        luckyNumber={123}
        pool={0.0}
        transactionTime={0}
        isOpen={FSDOpen}
        handleClickOpen={handleOpen}
        handleCloseDialog={handleClose}
      />
    </div>
  )
}

export default TestFeat