
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Controller, useForm } from "react-hook-form";
import { Box, Button, FormHelperText } from '@mui/material';
import styled from 'styled-components';

const TestFeat = () => {

  const getTicket = async (txHash, amount, data) => {
    let success = false;
    while (!success) {
        try {           

            const response = await useAxios('POST', base_url + '/api/buyDesireTicket', '', {
                txHash: txHash,
                playerAddress: playerAddress,
                ticket: data
            });
            console.log("🚀 ~ file: PurchaseTicket.jsx:142 ~ getTicket ~ response:", response);

            if (response?.data?.message === 'success') {
                success = true;
            }
        } catch (error) {
            console.log("🚀 ~ file: PurchaseTicket.jsx:137 ~ getTicket ~ error:", error);
        }
    }
    return success;
};

  return (
    <div className='flex justify-center items-center h-full'>
      
    </div>
  );
}

export default TestFeat