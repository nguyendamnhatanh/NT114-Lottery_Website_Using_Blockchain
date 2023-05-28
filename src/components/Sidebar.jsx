import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { logo, sun, money } from '../assets'
import { navlinks } from '../constants'
import TestDialog from './TestDialog'

const Icon = ({ styles, imgUrl, name, isActive, disabled, handleClick }) => (

  <div className={`w-[48px] h-[48px] rounded-[10px]
                  ${isActive && isActive === name && 'bg-[#2c2f32]'} 
                  flex justify-center items-center
                  ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt={name} className="w-1/2 h-1/2 " />
    ) : (
      <img src={imgUrl} alt={name} className={`w-1/2 h-1/2  ${isActive !== name && 'grayscale'} `} />
    )}
  </div>
)

const Sidebar = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState('dashboard')

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className='flex flex-col justify-between items-center  sticky top-5 h-[93vh]'>
      <TestDialog isOpen={open} handleSet={handleClose} />
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2E4F4F]" imgUrl={logo} alt='React Dapp' />
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#2E4F4F] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name)
                  navigate(link.path)
                }
              }}></Icon>
          ))}
        </div>
        <div className='flex flex-col gap-5'>
          <Icon styles="bg-[#1c1c24] shadow-secondary " imgUrl={sun} alt='Dark/Light' />
          <Icon styles="bg-[#1c1c24] shadow-secondary " imgUrl={money} alt='Dark/Light' handleClick={() => {
            setOpen(true);
          }} />
        </div>

      </div>
    </div>
  )
}

export default Sidebar