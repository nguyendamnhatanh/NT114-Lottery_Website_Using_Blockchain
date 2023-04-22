import React, { useState, useEffect, useRef } from 'react';
import { convertTimestampToDateString } from '../utils';


const CountBox = ({ time }) => {
  const [timeStamp, setTimeStamp] = useState(time);
  const unTwice = useRef(true);
  useEffect(() => {
    // if (unTwice.current) {
    unTwice.current = false;
    const timer = setInterval(() => {
      setTimeStamp((prevSeconds) => prevSeconds - 1);
    }, 1000);
    console.log(timeStamp);
    return () => clearInterval(timer);
    // }
  }, [timeStamp]);

  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center">{convertTimestampToDateString(timeStamp)}</h4>
      {/* <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-b-[10px] text-center">{title}</p> */}
    </div>
  )
}

export default CountBox
