
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";



export const useSmartContractAddress = async () => {
    const [smartAddress, setSmartAddress] = useState();

    const getSmartAddress = async () => {
        try {
            // const response = await axios.get('http://test.fkmdev.site/api/getAddress');
            const response = await useAxios('GET', 'http://test.fkmdev.site/api/getAddress');
            setSmartAddress(response?.data?.address);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // const { data } = await response;
            // console.log('data', data);
            // console.log('response', response);
            // console.log('response', await response?.data?.address);

            console.log('smartAddress', smartAddress)
            console.log('smartAddress', response?.data?.address)

        } catch (error) {
            console.error(error);
            setSmartAddress(undefined);
        }
    };

    useEffect(() => {
        if (!smartAddress) getSmartAddress()
        else return;
    }, [smartAddress]);

    return smartAddress;

}

export default useSmartContractAddress;