
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";
import { useStateContext } from "../context";



export const useSmartContractAddress = () => {
    const [smartAddress, setSmartAddress] = useState();
    const getSmartAddress = async () => {
        try {
            const response = await useAxios('GET', 'https://test.fkmdev.site/api/getAddress');
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