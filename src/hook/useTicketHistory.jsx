
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";
import useBaseUrl from "./useBaseUrl";



export const useTicketHistory = () => {

    const base_url = useBaseUrl();

    const [smartAddress, setSmartAddress] = useState();

    const getSmartAddress = async () => {
        try {          
            const response = await useAxios('GET', base_url + '/api/getAddress');
            setSmartAddress(response?.data?.address);
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

export default useTicketHistory;