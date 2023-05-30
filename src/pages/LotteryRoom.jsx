import React, { useState, useEffect, useRef, ReactDOM, useMemo, memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountdownTimer, CustomButton, Loader, DisplayLuckyNumber, ModalStepperBox, PlayerBoard, Confetti, TestDialog, ConfettiDialog, ClaimAward } from '../components';
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
import { blue, orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, Typography } from '@mui/material';

import { useSmartContractAddress, useTimeRemaining, usePool, useEntry, useUserTicket, useBetLeft, useBaseUrl, useMyBalance } from "../hook";
import { Padding, RoundedCorner, WidthFull } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import { shortenAddress } from '../utils/shortenAddress';
import useWinner from '../hook/useWinner';




// import classes from '../assets/styles/main.sass'

const LotteryRoom = () => {

  // use Context Area
  const { winner, address, smartAddress, sendTransaction, BuyTicket, isLoading, luckyNumber, status, ConnectWallet, myBalance } = useStateContext();

  // UseState Area

  const [amount, setAmount] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [ticket, setTicket] = useState([]);

  // Hooks Area

  // const winner = useWinner();
  const ticketPrice = (0.01).toString();
  const timeRemaining = useTimeRemaining();
  const img = 'https://www.minhngoc.net.vn/upload/images/veso/bth_20-04-2023.jpg';
  const transactionTime = 0;

  const shouldRun = useRef(0);
  const entry = useEntry();
  const userTicket = useUserTicket();
  const betLeft = useBetLeft();
  const pool = usePool();
  const balance = useMyBalance();

  // useEffect Area

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

  // handle Area

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

  const handleGetWinner = () => {

  };

  // Component Area

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

  const ControlBox = () => (
    <div className="flex-1 flex flex-col bg-[#1c1c24] items-center justify-start rounded-[10px]">

      <div className="flex w-full">
        <div className="w-full bg-[#2E4F4F] rounded-t-[10px]">
          <h2 className="text-lg font-medium text-center">Your Balance: {!balance ? 'Loading...' : Number(balance).toFixed(4)}</h2>
        </div>
      </div>

      <div className="flex flex-col w-[95%] gap-[30px] justify-center items-center p-[50px] bg-[#000000] rounded-[10px] my-[20px]">
        <div className='flex flex-col '>
          <p className="font-epilogue font-medium text-[20px] text-center text-white uppercase">
            Time Remaining:
          </p>
          <div className="font-epilogue text-[50px] leading-[30px] text-center text-white uppercase">
            {
              timeRemaining ? <CountdownTimer targetDate={timeRemaining} /> : (<CircularProgress />)
            }
          </div>
        </div>

        {/* <div className='flex flex-col gap-[10px]'>

        </div> */}
      </div>

      {/* <div className="flex items-center justify-center font-epilogue fount-medium text-[24px] leading-[30px] text-center text-[#808191]">Entry: {entry ? entry.length : (<CircularProgress />)}</div> */}
      {/* <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-white uppercase">User Control</p>
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">Ticket Price: {ticketPrice}</p> */}
      <div className="flex flex-row gap-5 w-[95%] h-[95%] ">

        <div className="flex flex-row  w-1/2  md:flex-row gap-[30px] mb-[20px] bg-[#000000] rounded-[10px]">
          <div className="flex flex-row justify-center items-center w-full ">

            <div className="flex flex-col p-[50px] justify-center items-center  ">
              <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">Remaining bets: {betLeft}</p>

              <div className='flex justify-center items-center mt-[30px]'>
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
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-row  w-1/2  md:flex-row gap-[30px] mb-[20px] bg-[#000000] rounded-[10px] items-center justify-center">
          <div className="flex-1 flex-row ">
            <div className="flex flex-col p-[50px] ">
              <div className="font-epilogue fount-medium text-[24px] leading-[30px] text-center text-[#808191]">Jackpot: {pool ? pool : (<CircularProgress />)}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )

  const PlayerTicketBox = () => (
    <div className="flex flex-col bg-[#1c1c24] rounded-[10px] w-full max-w-[900px]">
      <div className="bg-[#2E4F4F] rounded-t-[10px] w-full">
        <h2 className="text-lg font-medium text-center">Player Tickets</h2>
      </div>
      <div className="flex justify-center items-center overflow-y-auto w-full h-full ">
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
          winner?.data ?
            (
              winner?.data?.address === address ?
                <>
                  <DisplayLuckyNumber isWinner={true} userTicket={[{ luckyNumber: winner?.data?.number }]} />
                  <h2 className="text-lg font-mono text-center text-white"> {shortenAddress(winner?.data?.address)}</h2>
                  {/* <ClaimAward winner={winner} /> */}
                </>
                :
                <>
                  <h2 className="text-lg font-mono text-center text-white"> Lucky Next Time </h2>
                  <h2 className="text-md font-mono text-center text-white"> You are not the chosen one </h2>
                  <h2 className="text-md font-mono text-center text-white"> {shortenAddress(winner?.data?.address)} </h2>
                </>
            )
            :
            (
              <>
                <h2 className="text-lg font-mono text-center text-white"> Winner haven't assigned yet </h2>
              </>
            )
        }
      </div>
    </div>
  )

  const [userOpen, setUserOpen] = useState(true);
  const [FSDOpen, setFSDOpen] = useState(false);

  useEffect(() => {
    if (winner?.data?.address === address) {
      console.log("🚀 ~ winner", winner?.data)
      setFSDOpen(userOpen)
    }
  }, [winner]);
  
  const CongratulateWinner = memo(() => {

    const handleOpen = () => {
      setFSDOpen(true);
      console.log("🚀 ~  setFSDOpen:")
    };

    const handleClose = () => {
      setFSDOpen(false);
      setUserOpen(false);
      console.log("🚀 ~ setFSDClose:")
    };

    return (
      <ConfettiDialog
        address={address}
        luckyNumber={winner?.data?.number}
        pool={pool}
        isOpen={winner?.data?.address === address && FSDOpen && userOpen}
        handleClickOpen={handleOpen}
        handleCloseDialog={handleClose}
        winner={winner?.data}
      />
    )
  })

  const LotteryRoom = () => (
    <div className='flex flex-col w-full gap-5'>
      {/* Lottery Room Status */}
      {/* <LotteryStatus /> */}
      {/* <HorizontalLinearStepper /> */}
      {/* Lottery Room Header */}
      {/* <LotteryRoomHeader /> */}
      {/* Display Component */}

      {/* <TestDialog /> */}
      <div>
        <CongratulateWinner />
        <ModalStepperBox isLoading={isLoading} luckyNumber={luckyNumber} isOpen={modalIsOpen} status={status} />
      </div>

      <div className="flex flex-col  lg:flex-row gap-5">
        {/* ControlBox */}
        <ControlBox />

        <div className=" flex md:flex-row lg:flex-col sm:flex-col gap-5">
          {/* WinnerBox */}
          <WinnerBox />
          {/* PlayerBoard */}
          <PlayerBoard entry={entry} />
        </div>

      </div>
      {/* PlayerTicketBox */}
      <div className='flex  justify-center items-center'>
        <PlayerTicketBox />

      </div>
    </div >
  )

  return (
    (!timeRemaining || !pool || !entry || !address) ?
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