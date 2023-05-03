import React, { useContext, createContext, useState, useEffect, useCallback } from "react";

import { useAddress, useContract, useMetamask, useContractWrite, useWallet } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { useAxios, useSmartContractAddress, useTimeRemaining, useUserTicket } from "../hook";
import { parseAmount } from "../utils/parseAmount";
import { convertTimestampToDateString } from '../utils';

import Web3 from "web3";

const StateContext = createContext();

// const contractAddress = '0x3412d73497Ea52F2293a15e2d9159f54BE0b0a33';

// const contractAddress = useAddress();




export const StateContextProvider = ({ children }) => {

    const [txHash, setTxHash] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTxSuccess, setIsTxSuccess] = useState(0);
    const [luckNumber, setLuckNumber] = useState(0);
    const [amount, setAmount] = useState(0);
    const [smartAddress, setSmartAddress] = useState('');
    const [ticket, setTicket] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(1682579131);

    const playerAddress = useAddress();
    const connect = useMetamask();
    const contractAddress = useSmartContractAddress();
    const userTicket = useUserTicket(playerAddress, setIsLoading);



    useEffect(() => {
        if (!playerAddress) {
            // console.log('Wallet not connected, trying connecting');
            ConnectWallet();
        }
        else {
            // console.log(playerAddress); 
        }
        if (txHash) getTransactionStatus(txHash); else return;
        if (isTxSuccess === 1) getLuckyNumber(txHash, amount);
    }, [isTxSuccess, txHash, playerAddress])

    useEffect(() => {
        if (playerAddress) setTicket(userTicket);
    }, [playerAddress])

    const BuyTicket = async (amount) => {
        try {
            setIsLoading(true);
            await sendTransaction(amount);
            setIsLoading(false);
        } catch (error) {
            // console.log('BuyTicket error', error);
            setIsLoading(false);
        }
    }
    // const ConnectWallet = async () => {
    //     try {
    //         await connect();
    //     } catch (error) {
    //         console.log('ConnectWallet error', error);
    //     }
    // }
    const ConnectWallet = useCallback(async () => {
        const handleConnect = () => {
            // setConnected(true);

            if (window.ethereum) {
                window.ethereum.on("accountsChanged", checkAccountConnected);
            }
        };

        const handleError = () => {
            // setConnected(false);
        };

        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            } else {
                throw new Error("Browser does not support Ethereum");
            }
            handleConnect();
        } catch (e) {
            handleError();
        }
    }, []);

    /// 0: failed, 1: success, 2: pending, random: processing
    // const getTransactionStatus = async (txHash) => {
    //     try {
    //         await new Promise((resolve) => setTimeout(resolve, 1000));
    //         const receipt = await web3.eth.getTransactionReceipt(txHash);
    //         if (receipt.status) {
    //             console.log('Transaction Success');
    //             setIsTxSuccess(1);
    //         } else {
    //             console.log('Transaction Failed');
    //             setIsTxSuccess(0);
    //         }
    //     } catch (error) {
    //         console.log('Transaction Pending', error);
    //         // random number            
    //         const randomNumber = Math.floor(Math.random() * 100);
    //         setIsTxSuccess(randomNumber);
    //     }
    // };

    const getLuckyNumber = async (txHash, amount) => {
        try {
            const response = await useAxios('POST', 'https://test.fkmdev.site/api/getTicket', '', { txHash: txHash, ticketPrice: amount, playerAddress: playerAddress })
            // console.log('txHash', txHash)
            // .then((res) => {
            //     console.log(res.data)
            //     setLuckNumber(res.data.luckyNumber);
            //     setIsLoading(false);
            // });
            return response.data.lottery;
        } catch (error) {
            // console.log('BE processing:', error);
            const randomNumber = Math.floor(Math.random() * 100);
            setIsTxSuccess(randomNumber);
        }
    };

    const sendTransaction = async (amount) => {
        try {
            if (playerAddress) {
                // console.log('Wallet Connected ✓ ', playerAddress);
            }
            else await connect();
            // getTransactionStatus('0xe143f860db1c2dd3a78b8c147fe2d96495b6e1ecd88802a37c4f3529164dfdc4');
            const ticketPrice = (amount);
            setAmount(ticketPrice);
            // console.log('contractAddress', contractAddress)

            const txHash = await web3.eth.sendTransaction({
                from: playerAddress, // The user's active address.
                to: contractAddress, // Required except during contract publications.
                value: parseAmount(amount), // Only required to send ether to the recipient from the initiating external account.         
            })
            // console.log(txHash);
            // setTxHash(txHash.transactionHash);
            const lottery = await getLuckyNumber(txHash.transactionHash, ticketPrice);
            // console.log('lottery', lottery);


        } catch (error) {
            console.log(error);
            throw new Error("No ethereum wallet found");
        }
    }



    return (
        <StateContext.Provider value={{
            address: playerAddress,
            connect,
            // wallet,
            // ,contract
            sendTransaction,
            txHash,
            isLoading,
            setIsLoading,
            smartAddress,
            setSmartAddress,
            timeRemaining,
            userTicket,
            BuyTicket
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);