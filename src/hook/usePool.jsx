
import { useEffect, useState, useRef } from "react";


import { useAxios } from "./useAxios";
import { useStateContext } from "../context";

import useBaseUrl from "./useBaseUrl";

import useTimeOut from "./useTimeOut";

export const usePool = () => {

    const timeOut = useTimeOut();

    const base_url = useBaseUrl();

    const { address, setIsLoading, status, setStatus } = useStateContext();

    const fetchAttempts = useRef(0);

    const [Result, setResult] = useState();

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
        setStatus(7);
        if (address) {
            fetchPool();
        }
        setStatus(-1);
    }, [address]);


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
            setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getPool');
            const newData = response?.data?.pool;
            if (isMounted && newData !== Result) {
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

export default usePool;