import React, { useEffect, useState } from 'react'

import { Button, Dialog } from '@mui/material';

const NotifyBox = ({ isOpen, handleCloseDialog, Title, handleUserAction }) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        handleCloseDialog();
        handleCloseDialog();
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={open} >
                <p className='p-10 text-xl font-mono text-center text-black'>{Title}</p>
            </Dialog>
        </div>
    );
}

export default NotifyBox