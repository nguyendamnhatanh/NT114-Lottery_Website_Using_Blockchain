import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { ModalBuyTicket } from '../..';
import CountdownTimer from '../CountdownTimer';

const Control = ({ balance, timeRemaining, betLeft, isLoading, pool, handleBuyTicket }) => {
    return (

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
            </div>


            <div className="flex flex-row gap-5 w-[95%] h-[95%] ">

                <div className="flex flex-row  w-1/2  md:flex-row gap-[30px] mb-[20px] bg-[#000000] rounded-[10px]">
                    <div className="flex flex-row justify-center items-center w-full ">

                        <div className="flex flex-col p-[50px] justify-center items-center  ">
                            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">Remaining bets: {betLeft}</p>

                            <div className='flex justify-center items-center mt-[30px]'>
                                <Box>
                                    {/* <LoadingButton
                                        loading={isLoading}
                                        loadingIndicator="Loading…"
                                        variant="contained"
                                        color='inherit'
                                        sx={btnStyle}
                                        onClick={handleBuyTicket}
                                    >
                                        Buy Ticket
                                    </LoadingButton> */}
                                    <ModalBuyTicket
                                        isLoading={isLoading}                                       
                                        status={status}
                                        handleBuyTicket={handleBuyTicket} />
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
}

export default Control