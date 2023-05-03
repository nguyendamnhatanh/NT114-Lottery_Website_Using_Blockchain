
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";
import { useStateContext } from "../context";



export const usePool = () => {
    const [Result, setResult] = useState();
    const { address } = useStateContext();

    const getResult = async () => {
        try {
            const response = await useAxios('GET', 'https://test.fkmdev.site/api/getPool');
            setResult(response?.data?.pool);
        } catch (error) {
            console.error(error);
            setResult('');
        }
    };

    useEffect(() => {
        if (!Result) getResult()
        else return;
    }, [Result, address]);

    return Result;
}

export default usePool;