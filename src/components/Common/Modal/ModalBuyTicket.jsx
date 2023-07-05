import { Box, Button, Fab, Modal } from '@mui/material';
import { green } from '@mui/material/colors';
import { gsap } from 'gsap';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { randomIcon } from '../../../assets';
import ChooseNumberAction from './ChooseNumberAction';
import { LoadingButton } from '@mui/lab';

// import HorizontalLinearStepper from './HorizontalLinearStepper'

const ModalBuyTicket = ({ isLoading, luckyNumber, status, handleBuyTicket }) => {

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
        border: '2px solid #000',
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        bgcolor: '#2C3333',

    };

    const btnStyle = {
        color: '#fff',
        backgroundColor: '#1B6B93',
        '&:hover': {
            backgroundColor: '#1B6B93',
            opacity: [0.9, 0.8, 0.7],
        },
        '&:loading': {
            backgroundColor: '#1B6B93',
            opacity: [0.9, 0.8, 0.7],
        },
        '&:disabled': {
            backgroundColor: '#1B6B93',
            opacity: [0.9, 0.8, 0.7],
        },
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const ChildModalEnterNumber = () => {
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        return (
            <React.Fragment>
                <Button sx={btnStyle} className='p-5' onClick={handleOpen}>Enter Number</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...styleModal }}>
                        <ChooseNumberAction
                            closeThis={handleClose}
                            setModalIsOpen={setModalIsOpen}
                            handleBuyTicket={handleBuyTicket}
                        />

                    </Box>
                </Modal>
            </React.Fragment>
        );
    }

    const generateRandomNumber = () => {
        const min = 100000;
        const max = 999999;
        const rand = min + Math.random() * (max - min);
        return rand.toFixed(0);
    }

    const RandomBox = () => {

        const [loading, setLoading] = React.useState(false);
        const [success, setSuccess] = React.useState(false);
        const [disabled, setDisabled] = React.useState(false)

        const RandomIcon = () => (<img src={randomIcon} alt="" className='flex ' />)

        const display = useRef();

        const [random, setRandom] = useState(generateRandomNumber());

        const handleRandom = () => {
            setRandom(generateRandomNumber());
        }

        useLayoutEffect(() => {
            gsap.to(display, {
                duration: 0.5,
                random: random || 0,
                onUpdate: () => {
                    display.current.innerHTML = Number(display.random).toFixed(0);
                }
            })
        }, [random])

        const styleCircularProgress = {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        }

        const buttonSx = {
            ...(success && {
                bgcolor: green[500],
                '&:hover': {
                    bgcolor: green[700],
                },
            }),
        };




        return (
            <div className='flex flex-col justify-center items-center gap-5' >
                <h1 id="child-modal-title" className='text-white text-center mb-2 uppercase'> Random your lucky number </h1>
                <div ref={display} id="child-modal-title" className=' text-white text-center mb-2 text-[30px] tracking-[20px] border pl-[20px]'> {random} </div>
                <div className="flex flex-col gap-[10px]">
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Fab
                            aria-label="claim"
                            color="primary"
                            sx={buttonSx}
                            onClick={handleRandom}
                            disabled={disabled || loading}
                        >
                            {success ? <CheckIcon /> : <RandomIcon />}
                        </Fab>
                        {loading && (
                            <CircularProgress
                                size={68}
                                sx={styleCircularProgress}
                            />
                        )}
                    </Box>
                    <Button sx={btnStyle} onClick={() => handleBuyTicket(random)}>Buy</Button>

                </div>
            </div>

        );
    };


    const ChildModalRandomNumber = () => {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        const random = generateRandomNumber();

        return (
            <React.Fragment>
                <div className="flex flex-row justify-between items-center">
                    <Button sx={btnStyle} className='p-5' onClick={handleOpen}>Random</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...styleModal }}>
                        <RandomBox />
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }



    return (
        <div>
            <LoadingButton
                onClick={handleOpen}
                loading={isLoading}
                loadingIndicator="Loading…"
                variant="contained"
                color='inherit'
                sx={btnStyle}
            >Buy</LoadingButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...styleModal }}>
                    <h2 id="parent-modal-title" className='text-white text-[30px]'>Choose method </h2>
                    <h2 id="parent-modal-title" className='text-white text-[30px] w-fit h-[50%]'>
                        <div className="arrow-animation">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </h2>

                    <div className='child-modal flex flex-col gap-5 justify-center items-center'>
                        <ChildModalEnterNumber />
                        <ChildModalRandomNumber />
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default ModalBuyTicket