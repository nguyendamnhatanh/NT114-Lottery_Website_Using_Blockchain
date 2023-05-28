import React, { useState, useEffect, useRef, ReactDOM } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountdownTimer, CustomButton, Loader, DisplayLuckyNumber, ModalStepperBox, PlayerBoard, Confetti } from '../components';
import { calculateBarPercentage, daysLeft, getMessageBasedOnBuyStatus } from '../utils';
import { thirdweb, pickluck, badgeCheck, statusFailed } from '../assets';

import dummyData from '../utils/dummyData';
import dummyEntry from '../utils/dummyEntry';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';


import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

import { useSmartContractAddress, useTimeRemaining, usePool, useEntry, useUserTicket, useBetLeft, useBaseUrl } from "../hook";
import { Padding, RoundedCorner, WidthFull } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import { shortenAddress } from '../utils/shortenAddress';

import { io } from 'socket.io-client';

// import classes from '../assets/styles/main.sass'

const LotteryRoom = () => {

    return (
        <div>
            <DisplayLuckyNumber isWinner={true} userTicket={[{ address: '0xSADsadasdsadsadsad', luckyNumber: 1234 }]} />
        </div>
    )
}

export default LotteryRoom