import React from 'react'

import dummyData from '../utils/dummyData';

import Loader from './Loader';

export const DisplayLuckyNumber = ({ isLoading, userTicket }) => {
    return (
        // isLoading
        //     ?
        //     (<div className="flex justify-center items-center"><Loader /></div>)
        //     :
        (
            userTicket?.length > 0
                ?
                <div className="md:w-[150px] rounded-lg w-full flex flex-col justify-center items-center">
                    {
                        // example dummy data
                        // dummyData.reverse().map((item, index) => (
                        //     <div key={`${index}`} className="flex justify-between items-center gap-4">
                        //         <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.number}</p>
                        //     </div>
                        // ))
                        userTicket.reverse().map((item, index) => (
                            <div key={item.luckyNumber} className='py-1'>
                                <div className="flex justify-center items-center text-center font-epilogue font-medium text-[20px] leading-[30px] w-36 h-12 rounded-[10px] bg-[#F5EA5A] text-black text-xl">
                                    {item.luckyNumber}
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                (
                    []
                )
        )
        // console.log('number', number); 
    );
}

export default DisplayLuckyNumber