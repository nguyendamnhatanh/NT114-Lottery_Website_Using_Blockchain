
import { useEffect, useState, useRef } from "react";

import { useAxios } from "./useAxios";

import { extractTicketData } from '../utils';

import { Loader } from "../components";

import { useStateContext } from "../context";

export const useUserTicket = () => {

    const { address, setIsLoading, status, setStatus } = useStateContext();

    const [Result, setResult] = useState();

    // const [fetchAttempts, setFetchAttempts] = useState(0);

    // const [CurrentState, setCurrentState] = useState([]);

    // const CurrentState = useRef([]);

    // const PrevState = useRef([]);

    // const keepUpdate = useRef(0);

    const fetchAttempts = useRef(0);


    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        setStatus(7);
        fetchTicketData();
        setStatus(-1);
    }, [address]);

    // useEffect(() => {
    //     // make sure that BuyTicket workflow is success
    //     console.log("🚀 ~ file: useUserTicket.jsx:35 ~ useEffect ~ status:", status)
    //     if (status === 1) {
    //         PrevState.current = CurrentState.current;           
    //         console.log('PrevState', PrevState.current)
    //         if (CurrentState.current.length == PrevState.current.length) {
    //             console.log('sending update');
    //             fetchTicketData();
    //             console.log('sent update');
    //             Waiter(3000);
    //             keepUpdate.current++;
    //             console.log('keepUpdate state', keepUpdate.current)
    //         }
    //         else {
    //             setStatus(-1);
    //             keepUpdate.current = 0;
    //         }
    //     }
    // }, [status, keepUpdate.current]);

    // useEffect(() => {
    //     async function Updater() {
    //         try {
    //             setStatus(7);
    //             fetchTicketData();
    //             setStatus(-1);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     Updater();
    // }, [refreshKey]);

    // useEffect(() => {
    //     if (status === 1) {
    //         setRefreshKey(oldKey => oldKey + 1);
    //     }
    //     console.log("🚀 ~ file: useUserTicket.jsx:64 ~ useEffect ~ RefreshKey:", refreshKey)
    // }, [status]);

    useEffect(() => {
        let isMounted = true;
        let timerId;

        const fetchData = async () => {
            setIsLoading(true);
            const response = await useAxios('GET', 'https://test.fkmdev.site/api/getUserTickets?player=' + address);
            const newData = extractTicketData(response?.data?.tickets)           
            if (isMounted && newData.length !== Result.length) {
                setResult(newData);
                fetchAttempts.current = 0;
                setStatus(-1);
                setIsLoading(false);
                clearInterval(timerId);
            }
            else {
                fetchAttempts.current = fetchAttempts.current + 1;
            }
        };

        if (status === 1) {
            fetchData();
            if (fetchAttempts.current === 0) {
                timerId = setInterval(() => {
                    console.log("🚀 ~ file: useUserTicket.jsx:96 ~ useEffect ~ status:", status)
                    fetchData();
                }, 1000);
            }
        }
        else {
            console.log("🚀 ~ file: useUserTicket.jsx:114 ~ useEffect ~  fetchAttempts.current:", fetchAttempts.current)
            clearInterval(timerId);
            isMounted = false;
        }

        // return () => {
        //     console.log("🚀 ~ file: useUserTicket.jsx:102 ~ return ~ clearInterval:", 'clearInterval')
        //     clearInterval(timerId);
        //     isMounted = false;
        // };

    }, [status, fetchAttempts.current]);

    const fetchTicketData = async () => {
        try {
            if (!address) { setResult([]); return; }
            setIsLoading(true);
            const response = await useAxios('GET', 'https://test.fkmdev.site/api/getUserTickets?player=' + address);
            const Array = extractTicketData(response?.data?.tickets)
            // console.log('Array', Array)
            setResult(Array);
            // CurrentState.current = Array;
            // console.log('CurrentState', CurrentState.current)
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setResult([]);
        }
    };

    const Waiter = async (waitTime) => {
        try {
            await new Promise(resolve => setTimeout(resolve, waitTime));
        } catch (error) {
            console.error(error);
        }
    }

    const Updater = () => {
        try {
            setStatus(7);
            fetchTicketData();
            setStatus(-1);
        } catch (error) {
            console.error(error);
        }
    }

    return Result;
}

export default useUserTicket;