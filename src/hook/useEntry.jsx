
import { useEffect, useState, useRef } from "react";

import { useAxios } from "./useAxios";

import { useStateContext } from '../context';

import { extractEntryData } from '../utils';

import useBaseUrl from "./useBaseUrl";

import useTimeOut from "./useTimeOut";

export const useEntry = () => {
    const timeOut = useTimeOut();

    const base_url = useBaseUrl();

    const { address, setIsLoading, status, setStatus } = useStateContext();

    const fetchAttempts = useRef(0);

    const [Result, setResult] = useState();

    const fetchFetchEntry = async () => {
        try {
            const response = await useAxios('GET', base_url + '/api/getEntries');
            console.log("🚀 ~ fetchEntry:", response?.data?.players?.length)
            // console.log('response ', response);
            setResult(response?.data?.players);

        } catch (error) {
            console.error(error);
            setResult([]);
        }
    };

    useEffect(() => {
        setStatus(7);
        if (address) {
            fetchFetchEntry();
        }
        setStatus(-1);
    }, [address]);

    useEffect(() => {
        let isMounted = true;
        let timerId;

        const callSetTimeOut = () => {          
            timerId = setTimeout(() => {
                console.log("🚀 ~ fetching newData at useEntry")
                fetchData();
            }, timeOut);
        }

        const fetchData = async () => {
            setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getEntries');
            const newData = extractEntryData(response?.data?.players)
            if (isMounted && newData.length !== Result.length) {
                setResult(newData);
                fetchAttempts.current = 0;
                setStatus(-1);
                setIsLoading(false);
                clearTimeout(timerId);
            }
            else {
               fetchAttempts.current = fetchAttempts.current + 1;

                if (fetchAttempts.current < 2) {
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

export default useEntry;