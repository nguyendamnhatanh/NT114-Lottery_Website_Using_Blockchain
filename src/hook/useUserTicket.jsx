
import { useEffect, useState, useRef } from "react";

import { useAxios } from "./useAxios";

import { extractTicketData } from '../utils';

import { Loader } from "../components";

import { useStateContext } from "../context";

import useBaseUrl from "./useBaseUrl";

import useTimeOut from "./useTimeOut";

export const useUserTicket = () => {

    const timeOut = useTimeOut();

    const base_url = useBaseUrl();

    const { address, setIsLoading, status, setStatus } = useStateContext();

    const [Result, setResult] = useState();

    const fetchAttempts = useRef(0);

    useEffect(() => {
        setStatus(7);
        if (address) {
            console.log("🚀 ~ address change", address)
            fetchTicketData();
        }
        setStatus(-1);
    }, [address]);


    const fetchTicketData = async () => {
        try {
            if (!address) { setResult([]); return; }
            setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getUserTickets?player=' + address);
            const Array = response ? extractTicketData(response?.data?.tickets) : [];
            console.log("🚀 ~ fetchUserTicket:", Array.length)
            setResult(Array);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setResult([]);
        }
    };


    useEffect(() => {
        let isMounted = true;
        let timerId;

        const callSetTimeOut = () => {
            
            timerId = setTimeout(() => {
                console.log("🚀 ~ fetching newData at useUserTicket")
                fetchData();
            }, timeOut);
        }

        const fetchData = async () => {
            setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getUserTickets?player=' + address);
            const newData = extractTicketData(response?.data?.tickets)
            if (isMounted && newData.length !== Result.length) {
                setResult(newData);
                fetchAttempts.current = 0;
                setStatus(-1);
                setIsLoading(false);
                clearTimeout(timerId);
            }
            else {
                fetchAttempts.current = fetchAttempts.current + 1;

                if (fetchAttempts.current < 5) {
                    callSetTimeOut();
                }
                else {
                    clearTimeout(timerId);
                    setIsLoading(false);
                }
            }
        };

        if (status === 1) {
            if (fetchAttempts.current === 0) {
                callSetTimeOut();
            }
        }
        else {
            clearTimeout(timerId);
            isMounted = false;
            // setIsLoading(false);
        }

    }, [status, fetchAttempts.current]);



    return Result;
}

export default useUserTicket;