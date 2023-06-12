
import { Box, Button } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import React, { useLayoutEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useStateContext } from '../../../context';
import { useBetLeft } from '../../../hook';


const ChooseNumberAction = ({ closeThis, setModalIsOpen, handleBuyTicket }) => {

    const ticketPrice = (0.05).toString();

    const { BuyTicket, isLoading, status, luckyNumber, betLeft } = useStateContext();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            LuckyNumber: ""
        }
    });

    const onSubmit = (data) => {
        handleBuyTicket(data?.LuckyNumber);
        // setModalIsOpen(true);

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
    };

    const validateChar = (value, index) => {
        return matchIsNumeric(value)
    };


    return (
        <div className='flex justify-center items-center h-full w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-center items-center flex-col w-full md:w-[500px] p-3'>
                    <h1 id="child-modal-title" className='text-white text-center'>Make your wish </h1>
                    <h1 id="child-modal-title" className='text-white text-center mb-2'> Enter your lucky number </h1>
                    <Controller
                        control={control}
                        rules={{ validate: (value) => value.length === 6 }}
                        render={({ field, fieldState }) => (
                            <Box>
                                <MuiOtpInput {...field} length={6} validateChar={validateChar} />
                                {fieldState.invalid ? (
                                    <h1 id="child-modal-title" className='text-yellow-400 text-center pt-5'> Invalid number </h1>
                                ) : null}
                            </Box>
                        )}
                        name="LuckyNumber"
                    />
                    <Box>
                        <Button type="submit"
                            variant="contained"
                            sx={{ mt: 2 }}
                            disabled={isLoading && betLeft ? true : false}
                        >
                            Buy Ticket
                        </Button>
                    </Box>
                </div>
            </form>
        </div>
    );
}

export default ChooseNumberAction