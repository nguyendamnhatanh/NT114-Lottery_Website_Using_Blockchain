
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";

import { useStateContext } from '../context';

export const useEntry = () => {
    const { setIsLoading, address } = useStateContext();

    const [Result, setResult] = useState();

    const getResult = async () => {
        try {
            const response = await useAxios('GET', 'https://test.fkmdev.site/api/getEntries');
            // console.log('response ', response);
            setResult(response?.data?.players);

        } catch (error) {

            console.error(error);
            setResult([]);
        }
    };

    useEffect(() => {
        if (!Result) getResult()
        else return;
    }, [Result, address]);

    return Result;
}

export default useEntry;