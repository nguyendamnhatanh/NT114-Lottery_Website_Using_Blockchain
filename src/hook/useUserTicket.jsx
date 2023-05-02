
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";

import { getTicketData } from '../utils';

import { Loader } from "../components";

import { useStateContext } from '../context';

export const useUserTicket = (address, setIsLoading) => {
    const [Result, setResult] = useState();

    useEffect(() => {
        console.log('Result', Result)
        console.log('Player Get Ticket', address)

        getResult();

    }, [address]);


    const getResult = async () => {
        try {
            if (!address) { setResult([]); return; }
            setIsLoading(true);
            const response = await useAxios('GET', 'http://test.fkmdev.site/api/getUserTickets?player=' + address);
            setIsLoading(false);
            const Array = getTicketData(response?.data?.tickets)
            console.log('Array', Array)
            setResult(Array);
        } catch (error) {
            console.error(error);
            setResult([]);
        }
    };
    return Result;
}

export default useUserTicket;