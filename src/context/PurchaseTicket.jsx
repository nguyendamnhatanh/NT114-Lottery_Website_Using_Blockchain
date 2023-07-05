
import { useEffect, useRef, useState } from 'react';
import { parseAmount } from "../utils/parseAmount";

import Web3 from 'web3';
import { useAxios, useBaseUrl } from '../hook';

const PurchaseTicket = ({ status, setStatus, setIsLoading, playerAddress, contractAddress }) => {

    const currentStatus = useRef(-1);

    const currentTxHash = useRef('');

    const [luckyNumber, setLuckyNumber] = useState(0);

    const [amount, setAmount] = useState(0);

    const [txHash, setTxHash] = useState('');



    const base_url = useBaseUrl();

    useEffect(() => {
        currentTxHash.current = txHash;
    }, [txHash]);

    useEffect(() => {
        currentStatus.current = status;
    }, [status]);

    const BuyTicket = async (amount, betLeft, data, userTicket) => {
        console.log("🚀 ~ file: PurchaseTicket.jsx:33 ~ BuyTicket ~ userTicket:", userTicket)
        if (betLeft) {
            if (!userTicket.find(element => element.luckyNumber === data)) {
                try {
                    console.log("🚀 ~  Buy 01:", amount)
                    setIsLoading(true);
                    setStatus(2);
                    await purchase(amount);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    await getLuckyNumber(currentTxHash.current, amount, data);
                    setIsLoading(false);
                } catch (error) {
                    console.log("🚀 ~ file: PurchaseTicket.jsx:45 ~ BuyTicket ~ error:", error)
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
            }
            else {
                setIsLoading(true);
                setStatus(-8);
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false);
            }
        }
        else {
            setIsLoading(true);
            setStatus(-7);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
        }

    };

    const purchase = async (amount) => {
        try {
            const ticketPrice = (amount);
            setAmount(ticketPrice);
            const params = {
                from: playerAddress, // The user's active address.
                to: contractAddress, // Required except during contract publications.
                value: parseAmount(amount), // Only required to send ether to the recipient from the initiating external account.   
            };

            const web3 = new Web3(window.ethereum);
            const txHash = await web3.eth.sendTransaction(params);
            // console.log("🚀 ~ file: PurchaseTicket.jsx:44 ~ purchase ~ txHash:", txHash)

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


    const getLuckyNumber = async (txHash, amount, data) => {
        if (typeof (amount) !== 'number') amount = Number(amount);
        console.log('status gettingLuckNumber', currentStatus.current)
        if (currentStatus.current === 4 && txHash) {
            setStatus(5);
            if (await getTicket(txHash, amount, data)) {
                setStatus(6);
                await new Promise(resolve => setTimeout(resolve, 2000));
                setLuckyNumber(data);
                console.log('Congratulation, Buy Ticket Success', data)
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

    const getTicket = async (txHash, amount, data) => {
        try {
            console.log("🚀 ~ file: PurchaseTicket.jsx:139 ~ getTicket ~ data:", data)
            console.log("🚀 ~ file: PurchaseTicket.jsx:139 ~ getTicket ~ playerAddress:", playerAddress)
            console.log("🚀 ~ file: PurchaseTicket.jsx:139 ~ getTicket ~ txHash:", txHash)
            // const response = await useAxios('POST', base_url + '/api/getTicket', '', { txHash: txHash, ticketPrice: amount, playerAddress: playerAddress })
            const response = await
                useAxios('POST', base_url + '/api/buyDesireTicket', '',
                    {
                        txHash: txHash,
                        playerAddress: playerAddress,
                        ticket: data
                    })
            console.log("🚀 ~ file: PurchaseTicket.jsx:142 ~ getTicket ~ response:", response)

            return response?.data?.message === 'success' ? true : false;
        } catch (error) {
            console.log("🚀 ~ file: PurchaseTicket.jsx:137 ~ getTicket ~ error:", error)
            // if (error.response) {
            //     // The request was made and the server responded with a status code
            //     // that falls out of the range of 2xx
            //    if(error.response.status != 201){
            //    }


            //   } 
        }
    };


    return { BuyTicket, purchase, getTicket, getLuckyNumber, luckyNumber }

}

export default PurchaseTicket