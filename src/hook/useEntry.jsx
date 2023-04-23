
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";

import { useStateContext } from '../context';


export const useEntry = () => {
    const { setIsLoading } = useStateContext();

    const [Result, setResult] = useState('');

    const getResult = async () => {
        try {
            // setIsLoading(true);
            const response = await useAxios('GET', 'http://test.fkmdev.site/api/getEntries');
            setResult(response?.data?.players);
            // setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setResult('');
            console.error(error);
        }
    };

    useEffect(() => {
        if (!Result) getResult()
        else return;
    }, [Result]);

    return Result;
}

export default useEntry;