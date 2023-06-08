
import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from '.';
import { parseAmount } from "../utils/parseAmount";

import Web3 from 'web3';
import { useAxios, useBaseUrl } from '../hook';

const PurchaseTicket = ({ status, setStatus, setIsLoading, playerAddress, contractAddress }) => {

    const currentStatus = useRef(-1);

    const currentTxHash = useRef('');

    const [luckyNumber, setLuckyNumber] = useState(0);

    const [amount, setAmount] = useState(0);

    const [txHash, setTxHash] = useState('');

    const [isTxSent, setIsTxSent] = useState(0);

    const base_url = useBaseUrl();

    useEffect(() => {
        currentTxHash.current = txHash;
    }, [txHash]);

    useEffect(() => {
        currentStatus.current = status;
    }, [status]);

    const purchase = async (amount) => {
        try {
            const ticketPrice = (amount);
            setAmount(ticketPrice);
            setIsLoading(true);

            const params = {
                from: playerAddress, // The user's active address.
                to: contractAddress, // Required except during contract publications.
                value: parseAmount(amount), // Only required to send ether to the recipient from the initiating external account.   
            };

            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable()

            const txHash = await window.web3.eth.sendTransaction(params);
            console.log("🚀 ~ file: PurchaseTicket.jsx:44 ~ purchase ~ txHash:", txHash)

            if (txHash) {
                setTxHash(txHash.transactionHash);
                setStatus(4);
                // console.log('status transaction success', currentStatus.current)
                // setStatus(3);
            }
            else {
                throw new Error('Send transaction error. Please try again later');
                setIsLoading(false);
            }
        } catch (error) {
            console.log("🚀 ~ file: PurchaseTicket.jsx:130 ~ purchase ~ error:", error)
            if (error.code === 4001) {
                throw new Error('User denied transaction signature');
                setIsLoading(false);
            }
            if (error.code === -32002) {
                throw new Error('Under processing.1');
                setIsLoading(false);

            }
        }
    };


    const BuyTicket = async (amount, betLeft) => {
        if (betLeft)
            try {
                setStatus(2);
                await purchase(amount);
                await new Promise(resolve => setTimeout(resolve, 3000));
                await getLuckyNumber(currentTxHash.current, amount);
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

    };

    const getLuckyNumber = async (txHash, amount) => {
        if (typeof (amount) !== 'number') amount = Number(amount);
        console.log('status gettingLuckNumber', currentStatus.current)
        if (currentStatus.current === 4 && txHash) {
            setStatus(5);
            const LuckyNumber = await getTicket(txHash, amount);
            console.log("🚀 ~ file: PurchaseTicket.jsx:113 ~ getLuckyNumber ~ LuckyNumber:", LuckyNumber)
            if (LuckyNumber) {
                setStatus(6);
                await new Promise(resolve => setTimeout(resolve, 2000));
                setLuckyNumber(LuckyNumber);
                console.log('Congratulation, Buy Ticket Success', LuckyNumber)
                setStatus(1);
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
                throw new Error('Get Lucky Number error. Maybe the transaction is still pending. Please try again later');
            }
        }
    };

    const getTicket = async (txHash, amount) => {
        try {
            const response = await useAxios('POST', base_url + '/api/getTicket', '', { txHash: txHash, ticketPrice: amount, playerAddress: playerAddress })
            setLuckyNumber(response.data.luckyNumber);
            return response.data.lottery;
        } catch (error) {
            console.log("🚀 ~ file: PurchaseTicket.jsx:137 ~ getTicket ~ error:", error)
            const randomNumber = Math.floor(Math.random() * 100);
            setIsTxSent(randomNumber);
            throw new Error('Get Lucky Number error. Maybe the transaction is still pending. Please try again later');
            return false;
        }
    };


    return { BuyTicket, purchase, getTicket, getLuckyNumber, luckyNumber }

}

export default PurchaseTicket