
import { useEffect, useState } from "react";

import { useAxios } from "./useAxios";



export const useTimeRemaining = () => {
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
    const dateTimeAfterSevenDays = NOW_IN_MS + SEVEN_DAYS_IN_MS;
    // const getResult = async () => {
    //     try {
    //         // const response = await useAxios('GET', 'http://localhost:3000/api/getExpire');
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
    return dateTimeAfterSevenDays;
}

export default useTimeRemaining;