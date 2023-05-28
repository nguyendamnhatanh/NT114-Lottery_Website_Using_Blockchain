import { Button, Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ConfettiDialog from './ConfettiDialog';
import GetWinner from './GetWinner';

const TestDialog = ({ isOpen, handleSet }) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])

    const handleListItemClick = (value) => {
        onClose(value);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        handleSet();
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={open} >
                <ConfettiDialog />
                <GetWinner />
            </Dialog>
        </div>
    );
}

export default TestDialog