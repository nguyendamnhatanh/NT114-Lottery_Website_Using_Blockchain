
import { useEffect, useState, useRef } from "react";


import { useAxios } from "./useAxios";
import { useStateContext } from "../context";
import useBaseUrl from "./useBaseUrl";

export const useBetLeft = () => {

    const base_url = useBaseUrl();

    const { address, setIsLoading, status, setStatus } = useStateContext();

    const fetchAttempts = useRef(0);

    const [Result, setResult] = useState();

    const fetchBetLeft = async () => {
        if (!address) return;
        try {
            const response = await useAxios('GET', base_url + '/api/getLimit?player=' + address);
            const left = response?.data?.limit - response?.data?.current;
            setResult(left);
        } catch (error) {
            console.error(error);
            setResult('');
        }
    };

    useEffect(() => {
        setStatus(7);
        fetchBetLeft();
        setStatus(-1);
    }, [address]);

    useEffect(() => {
        let isMounted = true;
        let timerId;

        const fetchData = async () => {
            setIsLoading(true);
            const response = await useAxios('GET', base_url + '/api/getLimit', '', { player: address });
            const newData = response?.data?.limit - response?.data?.current;
            if (isMounted && newData !== Result) {
                setResult(newData);
                fetchAttempts.current = 0;
                setStatus(-1);
                setIsLoading(false);
                clearInterval(timerId);
            }
            else {
                fetchAttempts.current = fetchAttempts.current + 1;
                if (fetchAttempts.current > 5) {
                    clearInterval(timerId);
                    setIsLoading(false);
                }
            }
        };

        if (status === 1) {
            fetchData();
            if (fetchAttempts.current === 0) {
                timerId = setInterval(() => {
                    fetchData();
                }, 1000);
            }
        }
        else {

            clearInterval(timerId);
            isMounted = false;
        }

    }, [status, fetchAttempts.current]);

    return Result;
}

export default useBetLeft;