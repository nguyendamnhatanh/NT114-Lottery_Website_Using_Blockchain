import React, { useState, useEffect, useRef, ReactDOM } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountdownTimer, CustomButton, Loader, DisplayLuckyNumber, ModalStepperBox, PlayerBoard, Confetti } from '../components';
import { calculateBarPercentage, daysLeft, getMessageBasedOnBuyStatus } from '../utils';
import { thirdweb, pickluck, badgeCheck, statusFailed } from '../assets';

import dummyData from '../utils/dummyData';
import dummyEntry from '../utils/dummyEntry';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';


import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

import { useSmartContractAddress, useTimeRemaining, usePool, useEntry, useUserTicket, useBetLeft, useBaseUrl } from "../hook";
import { Padding, RoundedCorner, WidthFull } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import { shortenAddress } from '../utils/shortenAddress';

import { io } from 'socket.io-client';

// import classes from '../assets/styles/main.sass'

const LotteryRoom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { contract, address, smartAddress, sendTransaction, BuyTicket, isLoading, luckyNumber, status, ConnectWallet } = useStateContext();
  // const [status, setStatus] = useState(1);

  const [amount, setAmount] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [ticket, setTicket] = useState([]);

  const ticketPrice = (0.01).toString();
  const betLeft = useBetLeft();
  const pool = usePool();
  const timeRemaining = useTimeRemaining();
  const entry = useEntry();
  const img = 'https://www.minhngoc.net.vn/upload/images/veso/bth_20-04-2023.jpg';
  const transactionTime = 0;
  const shouldRun = useRef(0);
  const userTicket = useUserTicket();

  const base_url = useBaseUrl();

  const counterUseEffect = useRef(0);


  const [winner, setWinner] = useState(0);
  const [socket, setSocket] = useState(null);

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


  const handleBuyTicket = async () => {
    try {
      setModalIsOpen(true);
      await BuyTicket(ticketPrice, betLeft);
      setModalIsOpen(false);

    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  }


  useEffect(() => {
    if (address) setTicket(userTicket);
    else ConnectWallet();
  }, [address])

  useEffect(() => {
    const a = getMessageBasedOnBuyStatus(status, luckyNumber);
    setMessage(a);
  }, [status])

  useEffect(() => {
    if (shouldRun.current === 0) {
      // console.log('shouldRun.current ', shouldRun.current);
      shouldRun.current++;
      return;
    }
    else {
      //  console.log('shouldRun.current bigger than 0', shouldRun.current); 
      return;
    }

  }, []);


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [FSDOpen, setFSDOpen] = React.useState(false);

  const handleClickOpen = () => {
    setFSDOpen(true);
  };

  const handleClose = () => {
    setFSDOpen(false);
  };

  const handleGetWinner = () => {

  };


  const GetWinner = () => (
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

  const FullScreenDialog = () => (
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


  const LotteryRoomHeader = () =>
  (
    <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
      <div className="flex-1 flex-col ">
        <h4 className="flex justify-center font-epilogue font-semibold text-[30px] text-white uppercase">Lottery Room #001</h4>
        <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
          <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${90}%`, maxWidth: '100%' }}>
          </div>
        </div>
      </div>
    </div>
  );

  // const LotteryStatus = () =>
  // (
  //     isLoading &&
  //     (
  //         <div className="flex flex-col items-center">
  //             <div className="flex text-green-600 py-5">
  //                 {
  //                     status &&
  //                     (
  //                         <div className='flex flex-col items-center justify-center gap-10'>
  //                             <CircularProgress />
  //                             <p className="font-epilogue  text-[20px] text-center text-white uppercase">Processing...</p>
  //                             <p className="font-epilogue  text-[20px] text-center text-white">Status: {message}</p>
  //                         </div>
  //                     )
  //                 }
  //             </div>

  //         </div>
  //     )
  // )


  const ControlBox = () => (
    <div className="flex-1 flex flex-col bg-[#1c1c24] items-center justify-start rounded-[10px]">

      <div className="flex w-full">
        <div className="w-full bg-[#2E4F4F] rounded-t-[10px]">
          <h2 className="text-lg font-medium text-center">Your Balance</h2>
        </div>
      </div>

      <div className="flex flex-col w-[95%] h-[50%] gap-[30px] justify-center items-center p-[50px] bg-[#000000] rounded-[10px] my-[20px]">
        <div className='flex flex-col gap-[10px]'>
          <p className="font-epilogue font-medium text-[20px] text-center text-white uppercase">
            Time Remaining:
          </p>
          <div className="font-epilogue text-[50px] leading-[30px] text-center text-white uppercase">
            {
              timeRemaining ? <CountdownTimer targetDate={timeRemaining} /> : (<CircularProgress />)
            }

          </div>
        </div>

        <div className='flex flex-col gap-[10px]'>
          <div className="flex items-center justify-center font-epilogue fount-medium text-[24px] leading-[30px] text-center text-[#808191]">Lottery Pool: {pool ? pool : (<CircularProgress />)}
          </div>
          <div className="flex items-center justify-center font-epilogue fount-medium text-[24px] leading-[30px] text-center text-[#808191]">Entry: {entry ? entry.length : (<CircularProgress />)}
          </div>
        </div>
      </div>

      <div className="flex flex-row w-[95%] h-[50%] md:flex-row gap-[30px] mb-[20px] bg-[#000000] rounded-[10px]">
        <div className="flex-1 flex-row ">
          <div className="flex flex-col p-[50px] ">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-white uppercase">User Control</p>
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">Ticket Price: {ticketPrice}</p>
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">Bet Left: {betLeft}</p>
            <div className="mt-[30px]">
              <div className='flex justify-center items-center'>
                <Box>
                  <LoadingButton
                    loading={isLoading}
                    loadingIndicator="Loading…"
                    variant="contained"
                    onClick={handleBuyTicket}
                    color='inherit'
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
                    }
                  >
                    Buy Ticket
                  </LoadingButton>

                </Box>
                {/* <CustomButton
                                btnType="button"
                                // title="Buy Ticket"
                                custom={(
                                    <img src={pickluck} alt="image" className="w-[200px] h-[200px] object-contain" />
                                )}
                                styles="bg-transparent border-[1px] border-[#2C3333]"
                                handleClick={handleBuyTicket}
                            /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const PlayerTicketBox = () => (
    <div className="flex flex-col flex-[0.5] bg-[#1c1c24] rounded-[10px] ">
      <div className="bg-[#2E4F4F] rounded-t-[10px] w-full">
        <h2 className="text-lg font-medium text-center">Player Tickets</h2>
      </div>

      <div className="flex justify-center items-center overflow-y-auto w-full h-full">
        {
          // Display Lucky Number, data good -> display, bad -> display nothing
          <DisplayLuckyNumber userTicket={userTicket} />
        }
      </div>
    </div>
  )

  const WinnerBox = () => (
    <div className="flex-1 flex flex-col bg-[#1c1c24] rounded-[10px] ">
      <div className="flex w-full justify-center">
        <div className="w-full bg-[#2E4F4F] rounded-t-[10px]">
          <h2 className="text-lg font-medium text-center">Winner</h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center overflow-y-auto h-full gap-2 py-5 ">
        {
          winner ?
            (
              <>
                <DisplayLuckyNumber isWinner={true} userTicket={[{ luckyNumber: winner.number }]} />
                <h2 className="text-lg font-mono text-center text-white">{winner.address}</h2>
              </>
            )
            :
            (
              []
            )
        }
      </div>

    </div>
  )

  const LotteryRoom = () => (
    <div className='w-full'>
      {/* Lottery Room Status */}
      {/* <LotteryStatus /> */}
      {/* <HorizontalLinearStepper /> */}
      {/* Lottery Room Header */}
      {/* <LotteryRoomHeader /> */}
      {/* Display Component */}
      <FullScreenDialog />
      <GetWinner />
      <ModalStepperBox isLoading={isLoading} luckyNumber={luckyNumber} isOpen={modalIsOpen} status={status} />

      <div className="mt-[60px] flex flex-col lg:flex-row gap-5">
        {/* ControlBox */}
        <ControlBox />
        {/* PlayerTicketBox */}
        <PlayerTicketBox />
      </div>

      <div className="mt-[20px] flex flex-col lg:flex-row gap-5">
        {/* WinnerBox */}
        <WinnerBox />
        <PlayerBoard entry={entry} />
      </div>
    </div >
  )

  return (
    (!timeRemaining || !pool || !entry || !address) ?
      // true ?
      (
        <div className='flex justify-center items-center w-full h-full '>
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <div className='flex justify-between gap-6 flex-col lg:flex-row'>
              <Skeleton variant="rounded" width={300} height={250} />
              <Skeleton variant="rounded" width={300} height={250} />
            </div>
            <div className='flex justify-between gap-5 flex-col lg:flex-row'>
              <Skeleton variant="rounded" width={300} height={250} />
              <Skeleton variant="rounded" width={300} height={250} />
            </div>
          </Stack>
        </div>
      )
      :
      (
        <LotteryRoom />
      )

  )
}

export default LotteryRoom