
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";



export const useTimeRemaining = () => {
    const [Result, setResult] = useState();

    const getResult = async () => {
        try {
            const response = await useAxios('GET', 'http://test.fkmdev.site/api/getPool');
            setResult(response?.data?.pool);
        } catch (error) {
            console.error(error);
            setResult('');
        }
    };

    useEffect(() => {
        if (!Result) getResult()
        else return;
    }, [Result]);

    return Result;
}

export default useTimeRemaining;