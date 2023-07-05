import React, { memo, useEffect, useRef, useState } from 'react';

import { ModalConfetti, Control, DisplayLuckyNumber, ModalBuyTicket, ModalTransaction, PlayerBoard, Winner } from '../components';
import { useStateContext } from '../context';
import { getMessageBasedOnBuyStatus } from '../utils';

import Skeleton from '@mui/material/Skeleton';

import Stack from '@mui/material/Stack';
import { useBetLeft, useEntry, useMyBalance, usePool, useTimeRemaining, useUserTicket } from "../hook";

const LotteryRoom = memo(

  () => {

    // use Context Area
    const {
      winner,
      address,
      smartAddress,
      sendTransaction,
      BuyTicket, isLoading,
      luckyNumber,
      status,
      ConnectWallet,
      myBalance,
      remainingBets,
      entry,
      userTicket,
      pool
    }
      =
      useStateContext();

    // UseState Area

    const [amount, setAmount] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [ticket, setTicket] = useState([]);

    // Hooks Area
    const ticketPrice = (0.01).toString();
    const timeRemaining = useTimeRemaining();
    const img = 'https://www.minhngoc.net.vn/upload/images/veso/bth_20-04-2023.jpg';
    const transactionTime = 0;

    const shouldRun = useRef(0);
    // const entry = useEntry();
    // const userTicket = useUserTicket();

    // const pool = usePool();

    const balance = useMyBalance();

    // useEffect Area

    // useEffect(() => {
    //   if (address) setTicket(userTicket);
    //   else ConnectWallet();
    // }, [address])

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

    const handleBuyTicket = async (data) => {
      try {
        console.log("🚀 ~ file: LotteryRoom.jsx:96 ~ handleBuyTicket ~ userTicket:", userTicket)
        setModalIsOpen(true);
        await BuyTicket(ticketPrice, remainingBets, data, userTicket);
        setModalIsOpen(false);
      } catch (error) {
        console.log(error);
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
        <ModalConfetti
          address={address}
          luckyNumber={winner?.data?.number}
          pool={pool}
          isOpen={winner?.data?.isClaim == false && winner?.data?.address === address && FSDOpen && userOpen}
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
          <ModalTransaction
            isLoading={isLoading}
            luckyNumber={luckyNumber}
            isOpen={modalIsOpen}
            status={status}
          />

        </div>

        <div className="flex flex-col  lg:flex-row gap-5">
          {/* ControlBox */}
          <Control
            balance={balance}
            timeRemaining={timeRemaining}
            betLeft={remainingBets}
            isLoading={isLoading}
            pool={pool}
            handleBuyTicket={handleBuyTicket}
          />

          <div className=" flex md:flex-row lg:flex-col sm:flex-col gap-5">
            {/* WinnerBox */}
            <Winner winner={winner} />
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

    // console.log("🚀 ~ file: LotteryRoom.jsx:246 ~ LotteryRoom ~ remainingBets:", remainingBets)
    // console.log("🚀 ~ file: LotteryRoom.jsx:246 ~ LotteryRoom ~ address:", address)
    // console.log("🚀 ~ file: LotteryRoom.jsx:246 ~ LotteryRoom ~ entry:", entry)
    // console.log("🚀 ~ file: LotteryRoom.jsx:246 ~ LotteryRoom ~ pool:", pool)
    // console.log("🚀 ~ file: LotteryRoom.jsx:246 ~ LotteryRoom ~ timeRemaining:", timeRemaining)

    return (
      !(timeRemaining && pool && entry && address && remainingBets) ?
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
)



export default LotteryRoom