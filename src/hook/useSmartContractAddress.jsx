
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";
import { useStateContext } from "../context";



export const useSmartContractAddress = () => {
    const [smartAddress, setSmartAddress] = useState();
    const getSmartAddress = async () => {
        try {
            const response = await useAxios('GET', 'http://localhost:3000/api/getAddress');
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