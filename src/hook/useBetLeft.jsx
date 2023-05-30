
import { useEffect, useState, useRef } from "react";


import { useAxios } from "./useAxios";
import { useStateContext } from "../context";
import useBaseUrl from "./useBaseUrl";
import useTimeOut from "./useTimeOut";

export const useBetLeft = () => {
    const timeOut = useTimeOut();

    const base_url = useBaseUrl();

    const { address, setIsLoading, status, setStatus } = useStateContext();

    const fetchAttempts = useRef(0);

    const [Result, setResult] = useState();

    const fetchBetLeft = async () => {
        if (!address) return;
        try {
            const response = await useAxios('GET', base_url + '/api/getLimit?player=' + address);
            const Remaining = response?.data?.limit - response?.data?.current;
            console.log("🚀 ~  fetchBetLeft :", Remaining)
            setResult(Remaining);
        } catch (error) {
            console.error(error);
            setResult('');
        }
    };


    useEffect(() => {
        setStatus(7);
        if (address) {
            console.log("🚀 ~ fetchLimit:")
            fetchBetLeft();
        }
        setStatus(-1);
    }, [address]);



    useEffect(() => {
        let isMounted = true;
        let timerId;

        const callSetTimeOut = () => {
            timerId = setTimeout(() => {
                console.log("🚀 ~ fetching newData at useBetLeft")
                fetchData();
            }, timeOut);
        }

        const fetchData = async () => {
            setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getLimit?player=' + address);
            // console.log("🚀 ~ file: useBetLeft.jsx:45 ~ fetchData ~ response:", response)
            const newData = response?.data?.limit - response?.data?.current;
            // console.log("🚀 ~ file: useBetLeft.jsx:46 ~ fetchData ~ newData:", newData)
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

export default useBetLeft;