import React, { useEffect, useState } from 'react'
import { Button, Box, Modal, CircularProgress, Alert } from '@mui/material'
import { getMessageBasedOnBuyStatus } from '../../utils'
// import HorizontalLinearStepper from './HorizontalLinearStepper'


const ModalStepperBox = ({ isLoading, luckyNumber, isOpen, status }) => {
    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])

    const [message, setMessage] = useState('');

    const [SeverityStatus, setSeverityStatus] = useState('warning');

    useEffect(() => {
        const a = getMessageBasedOnBuyStatus(status, luckyNumber);
        const b = severityStatus();
        setSeverityStatus(b);
        setMessage(a);
    }, [status])


    const severityStatus = () => {
        if (status === 1 || status === 4 || status === 6) return 'success';
        if (status <= -2 || status == 0) return 'error';
        if (status === 2) return 'info';
        return 'warning';
    }


    const LotteryStatus = () =>
    (
        isLoading &&
        // true &&
        (
            <div className="flex flex-col items-center">
                <div className="flex text-black py-5">
                    {
                        <div className='flex flex-col items-center justify-center gap-10'>
                            <CircularProgress />
                            <Alert variant="filled" severity={SeverityStatus} >
                                Status: {message}
                            </Alert>

                        </div>
                    }
                </div>

            </div >
        )
    )

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

    return (
        <div className='flex justify-center items-center'>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <CircularProgress className='mb-10' />
                    <HorizontalLinearStepper /> */}
                    <LotteryStatus />
                    {/* Console.log('{status}') */}
                </Box>
            </Modal>
        </div>
    )
}

export default ModalStepperBox