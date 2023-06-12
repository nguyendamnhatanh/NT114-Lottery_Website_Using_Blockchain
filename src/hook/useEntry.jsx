
import { useEffect, useState, useRef } from "react";

import { useAxios } from "./useAxios";

import { useStateContext } from '../context';

import { extractEntryData } from '../utils';

import useBaseUrl from "./useBaseUrl";

import useTimeOut from "./useTimeOut";

export const useEntry = (props) => {
    const timeOut = useTimeOut();

    const base_url = useBaseUrl();

    
    const fetchAttempts = useRef(0);

    const [status, setStatus] = useState(-1);

    const [isLoading, setIsLoading] = useState(false);


    const [Result, setResult] = useState();

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
        // setStatus(7);
        if (playerAddress) {
            fetchFetchEntry();
        }
        // setStatus(-1);
    }, [playerAddress]);

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
            const response = await useAxios('GET', base_url + '/api/getEntries');
            const newData = extractEntryData(response?.data?.players)
            if (isMounted && newData.length !== Result.length) {
                setResult(newData);
                fetchAttempts.current = 0;
                // setStatus(-1);
                // setIsLoading(false);
                clearTimeout(timerId);
            }
            else {
                fetchAttempts.current = fetchAttempts.current + 1;
                if (fetchAttempts.current < 2) {
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

export default useEntry;