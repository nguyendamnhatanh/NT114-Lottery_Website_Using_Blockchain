import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CustomButton } from './'
import { logo, menu, search, thirdweb } from '../assets'
import { navlinks } from '../constants'
// import { connect } from 'react-redux'
import { useStateContext } from '../context'
import { Box, Modal } from '@mui/material'

const Navbar = () => {

  const navigate = useNavigate();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState('dashboard')
  const { address, ConnectWallet } = useStateContext();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    p: 4,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const NotifyError = () => (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <p className="font-sans text-[20px] text-center text-black uppercase">Please Open Metamask or Refresh Page</p>
      </Box>
    </Modal>
  )

  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className="lg:flex-1 flex flex-row max-w-[456px] py-2 pl-4 pr-2 h-[52px] bg-[#2E4F4F] rounded-[100px]">
        <input type="text" placeholder='Search' className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#ffffff] text-white bg-transparent outline-none' />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className='w-[15px] h-[15px] object-contain' />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <NotifyError />
        <CustomButton
          btnType="button"
          title={address ? address : 'Connect'}
          styles={address ? 'bg-[#8c6dfd]' : 'bg-[#1dc071]'}
          handleClick={
            async () => {
              try {
                if (address) {

                }
                else {
                  await ConnectWallet();
                }
              }
              catch (e) {
                setOpen(true);
                // console.log('error');
              }
            }
          }
        />
        <Link to='/profile'>
          <div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
            <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
          </div>
        </Link>
      </div>
      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className='w-[40px] h-[40px] rounded-[]10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
          <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
        </div>

        <img
          src={menu}
          alt="menu"
          className='w-[34px] h-[34px] object-contain  cursor-pointer'
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary pt-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} duration-700 transition-all`}>
          <ul className='mb-4'>
            {navlinks.map((link) => (
              <li key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.path);
                }}
              >
                <img
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  src={link.imgUrl}
                  alt={link.name} />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'} `}>{link.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  )
}

export default Navbar