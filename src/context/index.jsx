import React, { createContext, useContext, useEffect, useState } from "react";


import { useBetLeft, useEntry, useMyAddress, usePool, useSmartContractAddress, useUserTicket, useWinner } from "../hook";

import Connector from "./Connector";
import GetBalance from "./GetBalance";
import PurchaseTicket from "./PurchaseTicket";

const StateContext = createContext("");

export const StateContextProvider = ({ children }) => {
    // useState Area
    const [isLoading, setIsLoading] = useState(false);
    const [smartAddress, setSmartAddress] = useState('');
    const [myBalance, setMyBalance] = useState(0);
    const [status, setStatus] = useState(-1);
    const [remainingBets, setRemainingBets] = useState('');
    const [myAddress, setMyAddress] = useState('');
    const [entry, setEntry] = useState([]);
    const [userTicket, setUserTicket] = useState([]);
    const [pool, setPool] = useState('');


    // Hook Area
    const winner = useWinner();
    const contractAddress = useSmartContractAddress();

    const playerAddress = useMyAddress();
    const getBetLeft = useBetLeft({ myAddress, isLoading, status });
    const getEntry = useEntry({ myAddress, isLoading, status });
    const getUserTicket = useUserTicket({ myAddress, isLoading, status });
    const getPool = usePool({ myAddress, isLoading, status });

    useEffect(() => {
        // console.log("🚀 ~ file: index.jsx:48 ~ StateContextProvider ~ getPool:", getPool)
        // console.log("🚀 ~ file: index.jsx:48 ~ StateContextProvider ~ getUserTicket:", getUserTicket)
        // console.log("🚀 ~ file: index.jsx:48 ~ StateContextProvider ~ getEntry:", getEntry?.length)
        // console.log("🚀 ~ file: index.jsx:48 ~ StateContextProvider ~ playerAddress:", playerAddress)
        // console.log("🚀 ~ file: index.jsx:48 ~ StateContextProvider ~ getBetLeft:", getBetLeft)
        if (playerAddress)
            setMyAddress(playerAddress);
        if (getBetLeft)
            setRemainingBets(getBetLeft);
        if (getEntry)
            setEntry(getEntry);
        if (getUserTicket)
            setUserTicket(getUserTicket);
        if (getPool)
            setPool(getPool);
    }, [getBetLeft, playerAddress, getEntry, getUserTicket, getPool])



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
            connect,
            sendTransaction: purchase,
            setIsLoading,
            setSmartAddress,
            BuyTicket,
            ConnectWallet,
            setStatus,
            smartAddress,
            address: myAddress,
            isLoading,
            status,
            luckyNumber,
            winner,
            myBalance,
            remainingBets,
            entry,
            userTicket,
            pool
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);