
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";
import { useStateContext } from "../context";
import useBaseUrl from "./useBaseUrl";



export const useSmartContractAddress = () => {

    const base_url = useBaseUrl();

    const [smartAddress, setSmartAddress] = useState();
    const getSmartAddress = async () => {
        try {
            const response = await useAxios('GET', base_url + '/api/getAddress');
            setSmartAddress(response?.data?.address);
        } catch (error) {
            console.error(error);
            setSmartAddress('');
        }
    };

    useEffect(() => {
        if (!smartAddress) getSmartAddress()
        else return;
    }, [smartAddress]);

    return smartAddress;
}

export default useSmartContractAddress;