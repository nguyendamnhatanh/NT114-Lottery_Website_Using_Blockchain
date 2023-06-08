import React, { useEffect, useState } from 'react'

import { Button, Dialog } from '@mui/material';

import GetWinner from './GetWinner';

const TestDialog = ({ isOpen, handleCloseDialog }) => {

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
        handleCloseDialog();
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={open} >
                <GetWinner />
            </Dialog>
        </div>
    );
}

export default TestDialog