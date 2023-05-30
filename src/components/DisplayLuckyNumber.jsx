import React from 'react'

import dummyData from '../utils/dummyData';

import Loader from './Loader';

import { winnerTrophy } from '../assets';

import { Fullscreen, WidthFull } from '@mui/icons-material';

export const DisplayLuckyNumber = ({ userTicket, isWinner }) => {

    const style = {}

    return (
        userTicket?.length > 0
            ?
            !isWinner
                ?
                <div className={`rounded-lg justify-center items-center h-[300px] gap-4 py-5 lg:grid grid-rows-${userTicket?.length > 5 ? 3 : 0} grid-cols-${userTicket?.length >= 5 ? 5 : userTicket?.length}`}>
                    {
                        userTicket.reverse().map((item, index) => (
                            (
                                <div key={item.luckyNumber} className='py-1'>
                                    <div className="flex justify-center items-center text-center font-epilogue font-medium text-[20px] leading-[30px] w-36 h-12 rounded-[10px] bg-[#F5EA5A] text-black text-xl">
                                        {item.luckyNumber}
                                    </div>
                                </div>
                            )
                        ))
                    }
                </div>
                :
                <div className=" rounded-lg flex-col justify-center items-center ">
                    {
                        userTicket.reverse().map((item, index) => (
                            (
                                <div key={item.luckyNumber} >
                                    <div className='relative w-full h-full'>
                                        <img src={winnerTrophy} className='w-full h-full max-w-[150px]' />
                                        <div className='absolute bottom-[1.8%] left-[0%] right-0 text-black font-mono text-center'>
                                            <p className='text-xl font-medium'>{item.luckyNumber}</p>
                                        </div>
                                    </div>
                                </div>


                            )
                        ))
                    }
                </div>
            :
            (
                <div className="flex flex-col justify-center items-center h-[100px]">
                    <p className='text-xl text-white font-medium'>...</p>
                </div>
            )
    );
}

export default DisplayLuckyNumber
