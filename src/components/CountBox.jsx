import React, { useState, useEffect, useRef } from 'react';
import { convertTimestampToDateString } from '../utils';

const CountBox = ({ time }) => {
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDateString(convertTimestampToDateString(time--))
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center w-full justify-center">
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 rounded-t-[10px] w-full h-full text-center">
        {dateString}
      </h4>
    </div>
  )
}

export default CountBox

