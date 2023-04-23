
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";



export const useTicketHistory = () => {
    const [smartAddress, setSmartAddress] = useState();

    const getSmartAddress = async () => {
        try {          
            const response = await useAxios('GET', 'http://test.fkmdev.site/api/getAddress');
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