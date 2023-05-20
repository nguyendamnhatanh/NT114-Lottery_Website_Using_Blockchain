import React, { useState, useEffect, useRef, ReactDOM } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import {
  CountBox,
  CustomButton,
  Loader,
  DisplayLuckyNumber,
  Timer,
  MessageAlertBox,
} from '../components';
import {
  calculateBarPercentage,
  daysLeft,
  getMessageBasedOnBuyStatus,
} from '../utils';
import { thirdweb, badgeCheck, statusFailed, pickluck } from '../assets';

import dummyData from '../utils/dummyData';
import dummyEntry from '../utils/dummyEntry';

import {
  useSmartContractAddress,
  useTimeRemaining,
  usePool,
  useEntry,
  useUserTicket,
} from '../hook';
import { io } from 'socket.io-client';

const LotteryRoom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    contract,
    address,
    smartAddress,
    sendTransaction,
    BuyTicket,
    isLoading,
    luckyNumber,
    status,
    ConnectWallet,
  } = useStateContext();
  // const [status, setStatus] = useState(1);

  const [amount, setAmount] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [ticket, setTicket] = useState([]);
  const [testWinner, setTestWinner] = useState(0);

  const ticketPrice = (0.01).toString();
  const betLeft = 5;
  const pool = usePool();
  const timeRemaining = useTimeRemaining();
  const entry = useEntry();
  const img =
    'https://www.minhngoc.net.vn/upload/images/veso/bth_20-04-2023.jpg';
  const transactionTime = 0;
  const shouldRun = useRef(0);
  const userTicket = useUserTicket();

  const handleBuyTicket = async () => {
    try {
      await BuyTicket(ticketPrice);
      // setModalIsOpen(true);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) setTicket(userTicket);
    else ConnectWallet();
  }, [address]);

  useEffect(() => {
    const a = getMessageBasedOnBuyStatus(status, luckyNumber);
    setMessage(a);
  }, [status]);

  const messages = useMemo(() => getMessageBasedOnBuyStatus(status, luckyNumber), [status, luckyNumber]);

  let counter = 1;

  const socket = io('https://lottery.dacn.site');

  useEffect(() => {
    console.log(++counter)
    socket.on('pick winner', (data) => {
      console.log(data);
    });
  });

  const emitEvent = () => {
    socket.emit(
      'testEmit', 'hello from client'
    );
  }

  // const handleDonate = async () => {
  //   setIsLoading(true);
  //   await donate(state.pId, amount);
  //   navigate('/')
  //   setIsLoading(false);
  // }

  useEffect(() => {
    if (shouldRun.current === 0) {
      // console.log('shouldRun.current ', shouldRun.current);
      shouldRun.current++;
      return;
    } else {
      //  console.log('shouldRun.current bigger than 0', shouldRun.current);
      return;
    }
  }, []);

  useEffect(() => {
    socket.on('getTestNum', (data) => {
      setTestWinner(data)
    })
  })

  const getTestNumber = () => {
    socket.emit('testRandom', 'test')
  };

  return (
    <div>
      {isLoading && (
        <div className='flex flex-col items-center'>
          <div className='flex text-green-600 py-5'>
            {status && (
              <div>
                <Loader />
                <p className='font-epilogue  text-[20px] text-center text-white uppercase'>
                  Processing...
                </p>
                <p className='font-epilogue  text-[20px] text-center text-white'>
                  Status: {message}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col '>
          <h4 className='flex justify-center font-epilogue font-semibold text-[30px] text-white uppercase'>
            Lottery Room #001
          </h4>
          <div className='flex justify-center'>
            <button
              onClick={getTestNumber}
              className='text-white bg-[#4acd8d] p-3 rounded-lg hover:bg-[#348b61]'>
              Get Test Number
            </button>
          </div>
          {testWinner ? (
            <div className=' flex justify-center'>
              <p className='bg-[#4acd8d] text-white p-1 rounded-lg mt-5'>
                {testWinner}
              </p>
            </div>
          ) : ''}
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div
              className='absolute h-full bg-[#4acd8d]'
              style={{ width: `${90}%`, maxWidth: '100%' }}></div>
          </div>
        </div>
      </div>

      <div className='mt-[60px] flex flex-col lg:flex-row gap-5'>
        <div className='flex-2'>
          <div className='w-full flex md:flex-row flex-col gap-[30px]'>
            <div className='flex-1 flex-row '>
              <div className='flex flex-col p-[50px] bg-[#1c1c24] rounded-[10px]'>
                <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-white uppercase'>
                  User Control
                </p>
                <p className='font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]'>
                  Ticket Price: {ticketPrice}
                </p>
                <p className='font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]'>
                  Bet Left: {betLeft}
                </p>
                <div className='mt-[30px]'>
                  <div className='flex justify-center items-center'>
                    <CustomButton
                      btnType='button'
                      // title="Buy Ticket"
                      custom={
                        <img
                          alt='image'
                          className='w-[200px] h-[200px] object-contain '
                        />
                      }
                      styles='bg-transparent border-[1px] border-[#2C3333]'
                      handleClick={handleBuyTicket}
                    />
                  </div>
                </div>
              </div>
            </div>
            {
              // Display Lucky Number, data good -> display, bad -> display nothing
              <DisplayLuckyNumber
                isLoading={isLoading}
                userTicket={userTicket}
              />
            }
          </div>
        </div>

        <div className='flex-1'>
          <div className='w-full flex flex-col flex-1 gap-[30px] justify-center items-center  h-full p-[50px] bg-[#1c1c24] rounded-[10px]'>
            <div className='flex flex-col gap-[10px]'>
              <p className='font-epilogue font-medium text-[24px] leading-[30px] text-center text-white uppercase'>
                Time Remaining:
              </p>
              <div className='font-epilogue text-[50px] leading-[30px] text-center text-white uppercase'>
                {timeRemaining ? <CountBox time={timeRemaining} /> : <Loader />}
              </div>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <div className='flex items-center justify-center font-epilogue fount-medium text-[24px] leading-[30px] text-center text-[#808191]'>
                Lottery Pool: {pool ? pool : <Loader />}
              </div>
              <div className='flex items-center justify-center font-epilogue fount-medium text-[24px] leading-[30px] text-center text-[#808191]'>
                Entry: {entry ? entry.length : <Loader />}
              </div>
            </div>
          </div>

          {/* <div className="mt-[30px]">
            </div> */}

          {/* <div className="flex flex-wrap md:w-[150px] w-full  justify-between ">
              <CountBox value={remainingDays} title={'Purchase Date'} />
              <CountBox value={remainingDays} title={'Purchase Date'} />
              <CountBox value={remainingDays} title={'Purchase Date'} />
            </div> */}
        </div>
      </div>

      <div className='flex-[2] flex flex-col gap-[40px]'>
        {/* <div>
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

          <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
            <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
              <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{'state.owner'}</h4>
              <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
            </div>
          </div>
        </div> */}

        <div className='mt-[60px] '>
          <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
            Player
          </h4>

          <div className='mt-[20px] flex flex-col gap-4'>
            {
              // // example dummy data
              // dummyEntry.reverse().map((item, index) => (
              //   <div key={`${index.player}`} className="flex justify-between items-center gap-4">
              //     <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.player}</p>
              //   </div>
              // ))

              entry ? (
                entry.length > 0 ? (
                  entry.map((player, index) => (
                    <div
                      key={`${player}-${index}`}
                      className='flex justify-between items-center gap-4'>
                      <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll'>
                        {index + 1}. {player}
                      </p>
                      {/* <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p> */}
                    </div>
                  ))
                ) : (
                  <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>
                    No player yet. Be the first one!
                  </p>
                )
              ) : (
                <Loader />
              )
            }
          </div>
        </div>
      </div>
      <MessageAlertBox
        title='NOTIFY YOUR TRANSACTION STATUS'
        message={message}
        type={status === 4 ? 'success' : status < 0 ? 'error' : 'warning'}
        handleConfirm={() => {
          window.location.reload();
        }}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default LotteryRoom;
