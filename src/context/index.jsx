import React, { useContext, createContext, useState, useEffect } from "react";

import { useAddress, useContract, useMetamask, useContractWrite, useWallet } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { useAxios, useSmartContractAddress } from "../hook";
import { parseAmount } from "../utils/parseAmount";
import Web3 from "web3";

const StateContext = createContext();

// const contractAddress = '0x3412d73497Ea52F2293a15e2d9159f54BE0b0a33';

// const contractAddress = useAddress();


const { ethereum } = window;
const web3 = new Web3(ethereum);

export const StateContextProvider = ({ children }) => {
    const address = useAddress();
    const connect = useMetamask();
    const [txHash, setTxHash] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTxSuccess, setIsTxSuccess] = useState(0);
    const [amount, setAmount] = useState(0);
    // const [smartAddress, setSmartAddress] = useState('');
    const [contract, setContract] = useState();
    const [luckNumber, setLuckNumber] = useState(0);

    const contract = await useSmartContractAddress();
    console.log(contract)

    // const wallet = useWallet();

    useEffect(() => {
        if (txHash) getTransactionStatus(txHash);
        else return;
        console.log('isTxSuccess', isTxSuccess);
        if (isTxSuccess === 1) getLuckyNumber(txHash, amount);

    }, [isTxSuccess, txHash])

    /// 0: failed, 1: success, 2: pending, random: processing
    const getTransactionStatus = async (txHash) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            if (receipt.status) {
                console.log('Transaction Success');
                setIsTxSuccess(1);
            } else {
                console.log('Transaction Failed');
                setIsTxSuccess(0);
            }
        } catch (error) {
            console.log('Transaction Pending', error);
            // random number            
            const randomNumber = Math.floor(Math.random() * 100);
            setIsTxSuccess(randomNumber);
        }
    };

    const getLuckyNumber = async (txHash, amount) => {
        try {
            await useAxios('POST', 'http://test.fkmdev.site/api/getTicket', '', { txHash: txHash, ticketPrice: amount })
                .then((res) => {
                    console.log(res.data)
                    setLuckNumber(res.data.luckyNumber);
                    setIsLoading(false);
                });
        } catch (error) {
            console.log('BE processing:', error);
            const randomNumber = Math.floor(Math.random() * 100);
            setIsTxSuccess(randomNumber);
        }
    };

    const sendTransaction = async (amount) => {
        try {
            if (address) console.log('Wallet Connected ✓ ', address);
            else await connect();
            // getTransactionStatus('0xe143f860db1c2dd3a78b8c147fe2d96495b6e1ecd88802a37c4f3529164dfdc4');
            const ticketPrice = (amount - (1 / 1000) * amount);
            setAmount(ticketPrice);
            await ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: address, // The user's active address.
                            to: contractAddress, // Required except during contract publications.
                            value: parseAmount(amount), // Only required to send ether to the recipient from the initiating external account.                           
                        },
                    ],
                })
                .then((txHash) => {
                    setTxHash(txHash);
                    console.log('Send Transaction Success ✓', txHash);
                })
                .catch((error) => { console.error(error) })
                .finally(() => setIsLoading(false));

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum wallet found");
        }
    }



    return (
        <StateContext.Provider value={{
            address,
            connect,
            // wallet,
            // ,contract
            sendTransaction,
            txHash,
            isLoading,
            setIsLoading,
            smartAddress,
            setSmartAddress
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);