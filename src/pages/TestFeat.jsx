
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Controller, useForm } from "react-hook-form";
import { Box, Button, FormHelperText } from '@mui/material';
import styled from 'styled-components';

const TestFeat = () => {

  const { control, handleSubmit } = useForm({
    defaultValues: {
      LuckyNumber: ""
    }
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const matchIsNumeric = (text) => {
    // is delete key
    if (text === '') {
      return true
    }
    // is space key
    if (text === ' ') {
      return false
    }

    const isNumber = typeof text === 'number'
    const isString = typeof text === 'string'
    return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
  }

  const validateChar = (value, index) => {
    return matchIsNumeric(value)
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-center items-center flex-col w-[500px]'>
          <Controller
            control={control}
            rules={{ validate: (value) => value.length === 6 }}
            render={({ field, fieldState }) => (
              <Box>
                <MuiOtpInput sx={{ gap: 3 }} {...field} length={6} validateChar={validateChar} />
                {fieldState.invalid ? (
                  <FormHelperText error>OTP invalid</FormHelperText>
                ) : null}
              </Box>
            )}
            name="LuckyNumber"
          />
          <Box>
            <Button  type="submit" variant="contained" sx={{ mt: 5 } }>
              Buy Ticket
            </Button>
          </Box>
        </div>

      </form>
    </div>
  );
}

export default TestFeat