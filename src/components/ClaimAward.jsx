import { Box, Button, CircularProgress, Fab } from '@mui/material'
import React from 'react'
import { useAxios, useBaseUrl } from '../hook';
import { Cancel } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import { money } from '../assets';
import { useStateContext } from '../context';

const ClaimAward = ({ winner, handleCloseThis }) => {

    const base_url = useBaseUrl();


    const MoneyIcon = () => (<img src={money} alt="" className='flex w-1/2 h-1/2' />)

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false)

    const timer = React.useRef();

    React.useEffect(() => {
        temporaryDisable()
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const temporaryDisable = async () => {
        setDisabled(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setDisabled(false);
    }


    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const handleClaimAward = () => {
        try {
            console.log("🚀 Award!!");
            // console.log("🚀 ~ file: ClaimAward.jsx:19 ~ handleClaimAward ~ winner:", winner)
            const response = useAxios('POST', base_url + '/api/claim', '', {
                winner: '0x86032ac4010E601828e56C57c2Fe9B79b1141B13'
                // winner: winner?.address
            })
            return response;
        } catch (error) {
            console.log("🚀 ~ file: ClaimAward.jsx:17 ~ handleClaimAward ~ error:", error)
            throw new Error('Claiming reward failed. Please try again')
        }
    }

    const handleButtonClick = async () => {
        try {
            if (!loading) {
                setLoading(true);
                setSuccess(false);
                const res = await handleClaimAward();
                console.log("🚀 ~ res:", res)
                if (res?.data?.message === 'success') {
                    setSuccess(true);
                    setLoading(false);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    console.log("🚀 ~  success")
                    handleCloseThis();
                    setStatus(1);
                }
                else throw new Error('Failed')
                setLoading(false);
            }
        } catch (error) {
            timer.current = window.setTimeout(() => {
                setSuccess(false);
                setLoading(false);
            }, 2000);
        }
    };


    return (

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleButtonClick}
                    disabled={disabled}
                >
                    {success ? <CheckIcon /> : <MoneyIcon />}
                </Fab>
                {loading && (
                    <CircularProgress
                        size={68}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>

            <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleButtonClick}
                    disabled={disabled}
                >
                    {success ? 'Reward Claimed' : 'Claim Reward'}
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}

export default ClaimAward