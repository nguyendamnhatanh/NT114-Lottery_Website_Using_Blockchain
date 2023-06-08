import React from 'react'

import { Loader } from '..';

import { useStateContext } from '../../context';

const CustomButton = ({ btnType, title, handleClick, styles, custom }) => {
  const { isLoading } = useStateContext();

  return (
    (
      <button
        type={btnType}
        className={`font-epilogue font-bold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
        onClick={handleClick}
      >
        {(title)}
        {custom && custom}
      </button>
    ) 
  )
}

export default CustomButton