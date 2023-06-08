import { createContext, useCallback } from "react";

import { useMetamask } from '@thirdweb-dev/react';

import { useSmartContractAddress } from "../hook";

import Web3 from "web3";

const StateContext = createContext();

const Connector = () => {

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
                    throw new Error("Under processing.3");
                }
            }
        };
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                // getBalance(accounts[0]);
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            } else {
                throw new Error("Browser does not support Ethereum");
            }
            handleConnect();
        } catch (e) {
            if (e.code === -32002) {
                throw new Error("Under processing.2");
            }
            else {
                throw new Error(e.message);
            }
        }
    }, []);

    const checkAccountConnected = async () => {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length === 0) {
            console.log("Please connect to MetaMask.");
        } else {
            // getBalance(accounts[0]);
            console.log("Connected:", accounts[0]);
        }
    };

    return { ConnectWallet, connect }

}

export default Connector