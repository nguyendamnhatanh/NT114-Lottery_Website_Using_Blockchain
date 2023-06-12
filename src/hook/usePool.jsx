
import { useEffect, useRef, useState } from "react";


import { useAxios } from "./useAxios";

import useBaseUrl from "./useBaseUrl";

import useTimeOut from "./useTimeOut";

export const usePool = (props) => {

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

    const fetchAttempts = useRef(0);

    const [Result, setResult] = useState('');

    const fetchPool = async () => {
        try {
            const response = await useAxios('GET', base_url + '/api/getPool');
            console.log("🚀 ~ fetchPool:", response?.data?.pool)
            setResult(response?.data?.pool);
        } catch (error) {
            console.error(error);
            setResult('');
        }
    };

    useEffect(() => {
        // setStatus(7);
        if (playerAddress) {
            fetchPool();
        }
        // setStatus(-1);
    }, [playerAddress]);


    useEffect(() => {
        let isMounted = true;
        let timerId;

        const callSetTimeOut = () => {
            timerId = setTimeout(() => {
                console.log("🚀 ~ fetching newData at usePool")
                fetchData();
            }, timeOut);
        }

        const fetchData = async () => {
            // setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getPool');
            const newData = response?.data?.pool;
            if (isMounted && newData !== Result) {
                setResult(newData);
                fetchAttempts.current = 0;
                // setStatus(-1);
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

export default usePool;