
import { useEffect, useRef, useState } from "react";


import { useStateContext } from "../context";
import { useAxios } from "./useAxios";
import useBaseUrl from "./useBaseUrl";
import useTimeOut from "./useTimeOut";

export const useBetLeft = (props) => {

    const timeOut = useTimeOut();

    const base_url = useBaseUrl();

    const fetchAttempts = useRef(0);

    const [Result, setResult] = useState('');

    const [playerAddress, setPlayerAddress] = useState('');

    const [status, setStatus] = useState(-1);

    useEffect(() => {
        if (props) {
            if (props.myAddress)
                setPlayerAddress(props.myAddress);
            if (props.status)
                setStatus(props.status);
        }

    }, [props])

    useEffect(() => {
        // console.log("🚀 ~ file: useBetLeft.jsx:63 ~ fetchBetLeft ~ playerAddress:", playerAddress)
        if (playerAddress) {
            console.log("🚀 ~ fetchLimit:")
            fetchBetLeft();
        }
    }, [playerAddress]);


    // const { playerAddress } = props;

    const fetchBetLeft = async () => {
        if (!playerAddress) return;
        try {
            const response = await useAxios('GET', base_url + '/api/getLimit?player=' + playerAddress);
            const Remaining = response?.data?.limit - response?.data?.current;
            console.log("🚀 ~  fetchBetLeft :", Remaining)
            setResult(Remaining);
        } catch (error) {
            console.error(error);
            setResult('');
        }
    };

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
            const response = await useAxios('GET', base_url + '/api/getLimit?player=' + playerAddress);
            // console.log("🚀 ~ file: useBetLeft.jsx:45 ~ fetchData ~ response:", response)
            const newData = response?.data?.limit - response?.data?.current;
            // console.log("🚀 ~ file: useBetLeft.jsx:46 ~ fetchData ~ newData:", newData)
            if (isMounted && newData !== Result) {
                setResult(newData);
                fetchAttempts.current = 0;
                clearTimeout(timerId);
            }
            else {
                fetchAttempts.current = fetchAttempts.current + 1;

                if (fetchAttempts.current < 5) {
                    callSetTimeOut();
                }
                else {
                    clearTimeout(timerId);
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
        }
    }, [status, fetchAttempts.current]);

    return Result;
}

export default useBetLeft;