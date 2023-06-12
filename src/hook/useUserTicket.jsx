
import { useEffect, useState, useRef } from "react";

import { useAxios } from "./useAxios";

import { extractTicketData } from '../utils';

import { Loader } from "../components";

import { useStateContext } from "../context";

import useBaseUrl from "./useBaseUrl";

import useTimeOut from "./useTimeOut";

export const useUserTicket = (props) => {


    const [status, setStatus] = useState(-1);

    const [isLoading, setIsLoading] = useState(false);

    const [playerAddress, setPlayerAddress] = useState('');

    useEffect(() => {
        if (props) {
            if (props.myAddress)
                setPlayerAddress(props.myAddress);
            if (props.status)
                setStatus(props.status);
            if (props.isLoading)
                setIsLoading(props.isLoading);
        }
    }, [props])

    const timeOut = useTimeOut();

    const base_url = useBaseUrl();

    // const { playerAddress, setIsLoading, status, setStatus } = useStateContext();

    const [Result, setResult] = useState();

    const fetchAttempts = useRef(0);

    

    useEffect(() => {
        // setStatus(7);
        if (playerAddress) {
            console.log("🚀 ~ playerAddress change", playerAddress)
            fetchTicketData();
        }
        // setStatus(-1);
    }, [playerAddress]);


    const fetchTicketData = async () => {
        try {
            if (!playerAddress) { setResult([]); return; }
            // setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getUserTickets?player=' + playerAddress);
            const Array = response ? extractTicketData(response?.data?.tickets) : [];
            console.log("🚀 ~ fetchUserTicket:", Array.length)
            setResult(Array);
            // setIsLoading(false);
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
            // setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getUserTickets?player=' + playerAddress);
            const newData = extractTicketData(response?.data?.tickets)
            if (isMounted && newData.length !== Result.length) {
                setResult(newData);
                fetchAttempts.current = 0;
                setStatus(-1);
                // setIsLoading(false);
                clearTimeout(timerId);
            }
            else {
                fetchAttempts.current = fetchAttempts.current + 1;

                if (fetchAttempts.current < 5) {
                    callSetTimeOut();
                }
                else {
                    clearTimeout(timerId);
                    // setIsLoading(false);
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