import { Alert, Box, CircularProgress, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getMessageBasedOnBuyStatus } from '../../../utils'
// import HorizontalLinearStepper from './HorizontalLinearStepper'


const ModalTransaction = ({ isLoading, luckyNumber, isOpen, status }) => {
    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])
        

    const [message, setMessage] = useState('');
    const [SeverityStatus, setSeverityStatus] = useState('warning');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);    

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
            <div className="flex flex-col items-center bg">
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

    const style = {
        p: 4,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75%',
        height: '50%',
        bgcolor: '#2C3333',
        border: '2px solid #000',
        boxShadow: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '10px'

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
                    <LotteryStatus />                  
                </Box>
            </Modal>
        </div>
    )
}

export default ModalTransaction