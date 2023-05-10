
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";



export const useTimeRemaining = () => {
    const [Result, setResult] = useState();

    // const getResult = async () => {
    //     try {
    //         // const response = await useAxios('GET', 'https://test.fkmdev.site/api/getExpire');
    //         // setResult(response?.data?.remain);
    //     } catch (error) {
    //         console.error(error);
    //         setResult('');
    //     }
    // };

    // useEffect(() => {
    //     if (!Result) getResult()
    //     else return;
    // }, [Result]);

    return 1686142761;
}

export default useTimeRemaining;