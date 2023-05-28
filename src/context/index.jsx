import React, { useContext, createContext, useState, useEffect, useCallback, useRef } from "react";

import { useAddress, useContract, useMetamask, useContractWrite, useWallet } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { useAxios, useBaseUrl, useBetLeft, useSmartContractAddress, useTimeRemaining } from "../hook";
import { parseAmount } from "../utils/parseAmount";
import { convertTimestampToDateString } from '../utils';

import Web3 from "web3";

const StateContext = createContext();

// const contractAddress = '0x3412d73497Ea52F2293a15e2d9159f54BE0b0a33';

// const contractAddress = useAddress();


export const StateContextProvider = ({ children }) => {

    const base_url = useBaseUrl();

    const [txHash, setTxHash] = useState('');

    const currentTxHash = useRef('');
    useEffect(() => {
        currentTxHash.current = txHash;
    }, [txHash])

    const [isLoading, setIsLoading] = useState(false);

    const [luckyNumber, setLuckyNumber] = useState(0);

    const [amount, setAmount] = useState(0);

    const [smartAddress, setSmartAddress] = useState('');

    const [winner, setWinner] = useState(0);


    // const [timeRemaining, setTimeRemaining] = useState();
    // 0: denied by user
    // 1: success, 2: buying ticket, 3: sending transaction, 4: sent transaction success, 5: getting lucky number, 6: get lucky number success
    //-1: failed, -2: no transaction, -3: ..........., , -4: send transaction failed, -5: ...................., -6: get lucky number failed
    // 7: Getting userData

    const [status, setStatus] = useState(-1);

    const currentStatus = useRef(-1);

    useEffect(() => {
        currentStatus.current = status;
    }, [status])

    /// 0: failed, 1: success, 2: pending, random: processing
    const [isTxSent, setIsTxSent] = useState(0);

    const playerAddress = useAddress();
    const connect = useMetamask();
    const contractAddress = useSmartContractAddress();


    const ConnectWallet = useCallback(async () => {
        const handleConnect = () => {
            try {
                if (window.ethereum) {
                    connect();
                    window.ethereum.on("accountsChanged", checkAccountConnected);
                }
            } catch (error) {
                if (error.code === -32002) {
                    throw new Error("Under processing.");
                }
            }
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
            if (e.code === -32002) {
                throw new Error("Under processing.");
            }
        }

    }, []);

    const checkAccountConnected = async () => {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length === 0) {
            console.log("Please connect to MetaMask.");
        } else {
            console.log("Connected:", accounts[0]);
        }
    };

    const BuyTicket = async (amount, betLeft) => {
        if (betLeft)
            try {
                setStatus(2);
                await sendTransaction(amount);

                await new Promise(resolve => setTimeout(resolve, 500));
                // cannot write barely code here <- txHash and status not update from initial state
                // solution 0: split code to async function X
                // solution 1: use useRef to store status and txHash
                await gettingLuckNumber(currentTxHash.current, amount);
                setIsLoading(false);
            } catch (error) {
                if (error.message === 'User denied transaction signature') {
                    setStatus(0);
                }
                else if (error.message === 'Get Lucky Number error. Maybe the transaction is still pending. Please try again later') {
                    setStatus(-6);
                }
                else if (error.message === 'Send transaction error. Please try again later') {
                    setStatus(-4);
                }
                else {
                    console.log('Un-processing error:', error)
                }
            }
            finally {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false);
            }
        else {
            setIsLoading(true);
            setStatus(-7);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
        }

    }

    const gettingLuckNumber = async (txHash, amount) => {
        // console.log("🚀 ~ file: index.jsx:137 ~ gettingLuckNumber ~ txHash:", txHash)
        // console.log("🚀 ~ file: index.jsx:137 ~ gettingLuckNumber ~ amount:", amount)
        if (typeof (amount) !== 'number') amount = Number(amount);
        console.log('status gettingLuckNumber', currentStatus.current)
        if (currentStatus.current === 4 && txHash) {
            setStatus(5);
            const gettingLKN = await getLuckyNumber(txHash, amount);
            if (gettingLKN) {
                setStatus(6);
                await new Promise(resolve => setTimeout(resolve, 2000));
                setLuckyNumber(gettingLKN);
                console.log('Congratulation, Buy Ticket Success', gettingLKN)
                setStatus(1);
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
                throw new Error('Get Lucky Number error. Maybe the transaction is still pending. Please try again later');

            }
        }
    }

    const sendTransaction = async (amount) => {
        try {
            const ticketPrice = (amount);
            setAmount(ticketPrice);
            setStatus(3);
            setIsLoading(true);
            const txHash = await web3.eth.sendTransaction({
                from: playerAddress, // The user's active address.
                to: contractAddress, // Required except during contract publications.
                value: parseAmount(amount), // Only required to send ether to the recipient from the initiating external account.         
            });

            if (txHash) {
                setTxHash(txHash.transactionHash);
                setStatus(4);
                console.log('status transaction success', currentStatus.current)
            }
            else {
                throw new Error('Send transaction error. Please try again later');
                setIsLoading(false);

            }

        } catch (error) {
            if (error.code === 4001) {
                throw new Error('User denied transaction signature');
                setIsLoading(false);

            }
            if (error.code === -32002) {
                throw new Error('Under processing.');
                setIsLoading(false);

            }
        }
    }

    const getLuckyNumber = async (txHash, amount) => {
        try {
            const response = await useAxios('POST', base_url + '/api/getTicket', '', { txHash: txHash, ticketPrice: amount, playerAddress: playerAddress })
            setLuckyNumber(response.data.luckyNumber);
            return response.data.lottery;
        } catch (error) {
            // console.log('BE processing:', error);
            const randomNumber = Math.floor(Math.random() * 100);
            setIsTxSent(randomNumber);
            throw new Error('Get Lucky Number error. Maybe the transaction is still pending. Please try again later');
            return false;
        }
    };

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
            // timeRemaining,
            // userTicket,
            BuyTicket,
            status,
            luckyNumber,
            ConnectWallet,
            setStatus,
            winner,
            setWinner
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);