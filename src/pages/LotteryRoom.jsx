



import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader, DisplayLuckyNumber } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb, pickluck } from '../assets';

import { useSmartContractAddress, useTimeRemaining, usePool, useEntry } from "../hook";

const LotteryRoom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { donate, getDonations, contract, address, smartAddress, sendTransaction } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  // const [donators, setDonators] = useState([]);


  const ticketPrice = 0.01;
  const betLeft = 5;
  const pool = usePool();
  const timeRemaining = useTimeRemaining();
  const entry = useEntry();
  const img = 'https://www.minhngoc.net.vn/upload/images/veso/bth_20-04-2023.jpg';

  // const fetchDonators = async () => {
  //   const data = await getDonations(state.pId);
  //   setDonators(data);
  // }

  // useEffect(() => {
  //   // if (contract) fetchDonators();
  //   setTimeRemaining(convertTimestampToDateString(timeRemaining));
  // }, [timeRemaining])

  // const handleDonate = async () => {
  //   setIsLoading(true);
  //   await donate(state.pId, amount);
  //   navigate('/')
  //   setIsLoading(false);
  // }

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col ">

          <h4 className="flex justify-center font-epilogue font-semibold text-[30px] text-white uppercase">Lottery Room #001</h4>


          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${90}%`, maxWidth: '100%' }}>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[60px] flex flex-col lg:flex-row gap-5">
        <div className="flex-2">
          <div className="w-full flex md:flex-row flex-col gap-[30px]">
            <div className="flex-1 flex-row ">
              <div className="flex flex-col p-[50px] bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-white uppercase">User Control</p>
                <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">Ticket Price: {ticketPrice}</p>
                <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">Bet Left: {betLeft}</p>
                <div className="mt-[30px]">
                  <div className='flex justify-center items-center'>
                    <CustomButton
                      btnType="button"
                      // title="Buy Ticket"
                      custom={(
                        <img src={pickluck} alt="image" className="w-[200px] h-[200px] object-contain " />
                      )}
                      styles="bg-transparent border-[1px] border-[#2C3333]"
                      handleClick={async () => {
                        try {
                          console.log('click')
                          setIsLoading(true);
                          await sendTransaction('0.001')
                          setIsLoading(false);

                        } catch (error) {
                          console.log(error);
                          setIsLoading(false);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap md:w-[150px] w-full  justify-between ">
              <DisplayLuckyNumber number = {123}/>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full flex flex-col flex-1 gap-[30px] justify-center items-center  h-full p-[50px] bg-[#1c1c24] rounded-[10px]">
            <div className='flex flex-col gap-[10px]'>
              <p className="font-epilogue font-medium text-[24px] leading-[30px] text-center text-white uppercase">Time Remaining:</p>
              <div className="font-epilogue text-[50px] leading-[30px] text-center text-white uppercase">
                {
                  timeRemaining
                    ? <CountBox time={timeRemaining} />
                    : <Loader />
                }
              </div>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <div className="flex items-center justify-center font-epilogue fount-medium text-[24px] leading-[30px] text-center text-[#808191]">Lottery Pool: {pool ? pool : (<Loader />)}
              </div>
              <div className="flex items-center justify-center font-epilogue fount-medium text-[24px] leading-[30px] text-center text-[#808191]">Entry: {entry ? entry.length : (<Loader />)}
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

      <div className="flex-[2] flex flex-col gap-[40px]">
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


        <div className="mt-[60px] ">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Player</h4>

          <div className="mt-[20px] flex flex-col gap-4">
            {entry.length > 0 ? entry.map((item, index) => (
              <div key={`${item}-${index}`} className="flex justify-between items-center gap-4">
                <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item}</p>
                {/* <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p> */}
              </div>
            )) : (
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No player yet. Be the first one!</p>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default LotteryRoom