import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../../assets';

import { CustomButton, FormField } from '..';
import { useStateContext } from '../../context';
// import { checkIfImage } from '../utils';


const LotteryLobby = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nickname: '',
    roomName: '',
    description: '',
    fee: '',
    deadline: '',
    image: '',
  });
  const { address, connect } = useStateContext();
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await connect();
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  return (
    <div className='bg-[#2E4F4F] flex justify-center items-center flex-col rounded-[10px] sm:p-10 '>
      {isLoading && 'Loader...'}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#492532] rounded-[10px]">
        <div>
          <h1 className='font-epilogue  font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a 'Đổi đời game'</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px] '>
        <div className='w-full flex justify-start items-center p-3 bg-[#8c6dfd]'>
          <img src={money} alt="money" className='w-[40px] h-[40px] object-contain' />
          <h4 className='font-bold text-white ml-[20px] text-[25px]'>
          Bạn có muốn làm giàu ? Hãy đến với chúng tôi!


          </h4>
        </div>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName='Your Nickname *'
            placeholder='John Cena'
            inputType='text'
            value={form.nickname}
            handleChange={(e) => handleFormFieldChange('nickname', e)}
          />
          <FormField
            labelName='Lottery Name *'
            placeholder='Game Nhan Pham '
            inputType='text'
            value={form.roomName}
            handleChange={(e) => handleFormFieldChange('roomName', e)}
          />
          <FormField
            labelName='Description'
            placeholder='Game Description'
            isTextArea={true}
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />
          <FormField
            labelName='Fee *'
            placeholder='0.1'
            inputType='number'
            value={form.fee}
            handleChange={(e) => handleFormFieldChange('fee', e)}
          />
          <FormField
            labelName='End-Date *'
            placeholder=''
            inputType='date'
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
          <FormField
            labelName='Image'
            placeholder='Place your image here'
            inputType='url'
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />
        </div>
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType='submit'
            title='Create'
            styles='bg-[#1dc071]'
          ></CustomButton>
        </div>
      </form>
    </div>
  );
};

export default LotteryLobby;