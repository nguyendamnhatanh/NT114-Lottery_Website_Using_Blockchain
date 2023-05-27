
import { useEffect, useState, useRef } from "react";


import { useAxios } from "./useAxios";
import { useStateContext } from "../context";

export const usePool = () => {

    const { address, setIsLoading, status, setStatus } = useStateContext();

    const fetchAttempts = useRef(0);

    const [Result, setResult] = useState();

    const fetchPool = async () => {
        try {
            const response = await useAxios('GET', 'http://localhost:3000/api/getPool');
            setResult(response?.data?.pool);
        } catch (error) {
            console.error(error);
            setResult('');
        }
    };

    useEffect(() => {
        setStatus(7);
        fetchPool();
        setStatus(-1);
    }, [address]);

    useEffect(() => {
        let isMounted = true;
        let timerId;

        const fetchData = async () => {
            setIsLoading(true);
            const response = await useAxios('GET', 'http://localhost:3000/api/getPool');
            const newData = response?.data?.pool;
            if (isMounted && newData !== Result) {
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

export default usePool;