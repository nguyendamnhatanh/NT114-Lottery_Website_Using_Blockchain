
import { useEffect, useRef, useState } from "react";

import { useAxios } from "./useAxios";
import { useStateContext } from "../context";
import useBaseUrl from "./useBaseUrl";
import { shortenAddress } from "../utils/shortenAddress";



export const useSmartContractAddress = () => {

    const base_url = useBaseUrl();

    const [smartAddress, setSmartAddress] = useState();

    const getSmartAddress = async () => {
        try {
            const response = await useAxios('GET', base_url + '/api/getAddress');
            console.log("🚀 ~ getAddress:", shortenAddress(response?.data ? response?.data?.address : ''))
            setSmartAddress(response?.data?.address);
        } catch (error) {
            console.error(error);
            setSmartAddress('');
        }
    };
    const CounterFetch = useRef(0);

    useEffect(() => {
        if (!smartAddress) {
            if (CounterFetch.current == 0) {
                CounterFetch.current++
                getSmartAddress()
            }
        }
        else return;
    }, [smartAddress]);

    return smartAddress;
}

export default useSmartContractAddress;