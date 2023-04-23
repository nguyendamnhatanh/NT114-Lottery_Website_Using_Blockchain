import React from 'react'

export const DisplayLuckyNumber = ({ number }) => {
    return (
        <div className="flex font-epilogue font-medium text-[20px] leading-[30px] justify-center items-center w-36 h-12 rounded-[10px] bg-[#F5EA5A] text-black text-xl">
            {number}
        </div>
    );
}

export default DisplayLuckyNumber
