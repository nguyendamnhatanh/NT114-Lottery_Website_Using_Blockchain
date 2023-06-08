import React, { createContext, useContext, useState } from "react";

import { useAddress } from '@thirdweb-dev/react';

import { useBaseUrl, useSmartContractAddress, useWinner } from "../hook";

import Connector from "./Connector";
import GetBalance from "./GetBalance";
import PurchaseTicket from "./PurchaseTicket";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    // Hook Area
    const winner = useWinner();
    const playerAddress = useAddress();
    const contractAddress = useSmartContractAddress();

    // useState Area
    const [isLoading, setIsLoading] = useState(false);
    const [smartAddress, setSmartAddress] = useState('');
    const [myBalance, setMyBalance] = useState(0);
    const [status, setStatus] = useState(-1);

    // Context Area    
    const { getBalance } = GetBalance();
    const {
        BuyTicket,
        purchase,
        getTicket,
        getLuckyNumber,
        luckyNumber
    } = PurchaseTicket({
        status,
        setStatus,
        setIsLoading,
        playerAddress,
        contractAddress
    });
    const { ConnectWallet, connect } = Connector();

    return (
        <StateContext.Provider value={{
            address: playerAddress,
            connect,
            sendTransaction: purchase,
            isLoading,
            setIsLoading,
            smartAddress,
            setSmartAddress,
            BuyTicket,
            status,
            luckyNumber,
            ConnectWallet,
            setStatus,
            winner,
            myBalance,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);