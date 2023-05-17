
import { useEffect, useState, useRef } from "react";

import { useAxios } from "./useAxios";

import { extractTicketData } from '../utils';

import { Loader } from "../components";

import { useStateContext } from "../context";

export const useUserTicket = () => {

    const { address, setIsLoading, status, setStatus } = useStateContext();

    const [Result, setResult] = useState();

    const fetchAttempts = useRef(0);

    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        setStatus(7);
        fetchTicketData();
        setStatus(-1);
    }, [address]);


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
                    // console.log("🚀 ~ file: useUserTicket.jsx:96 ~ useEffect ~ status:", status)
                    fetchData();
                }, 1000);
            }
        }
        else {

            clearInterval(timerId);
            isMounted = false;
        }

    }, [status, fetchAttempts.current]);

    const fetchTicketData = async () => {
        try {
            if (!address) { setResult([]); return; }
            setIsLoading(true);
            const response = await useAxios('GET', 'https://test.fkmdev.site/api/getUserTickets?player=' + address);
            const Array = extractTicketData(response?.data?.tickets)
            setResult(Array);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setResult([]);
        }
    }; 

    return Result;
}

export default useUserTicket;