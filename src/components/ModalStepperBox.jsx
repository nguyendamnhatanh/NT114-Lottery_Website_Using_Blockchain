import React from 'react'
import { Button, Box, Modal, CircularProgress } from '@mui/material'
import HorizontalLinearStepper from './HorizontalLinearStepper'

const ModalStepperBox = () => {
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
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CircularProgress className='mb-10' />
                    <HorizontalLinearStepper />
                </Box>
            </Modal>
        </div>
    )
}

export default ModalStepperBox