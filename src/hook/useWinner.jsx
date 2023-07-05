import React, { useEffect, useRef, useState, } from 'react'
import { io } from 'socket.io-client';
import useBaseUrl from './useBaseUrl';
import { useAxios } from "./useAxios";
import { set } from 'react-hook-form';



const useWinner = () => {

    const base_url = useBaseUrl();
    const requestURL = `${base_url}/api/getWinner`;
    const [winner, setWinner] = useState(false);
    const [socket, setSocket] = useState(null);
    const counterUseEffect = useRef(0);

    const GetWinner = async () => {
        try {
            const response = await useAxios('GET', requestURL);
            if (response.status === 200) {
                setWinner(response.data);
                console.log("🚀 ~ file: useWinner.jsx:23 ~ GetWinner ~ response.data:", response.data)
            }
        } catch (error) {
            console.log("🚀 ~ file: useWinner.jsx:17 ~ GetWinner ~ error", error?.response?.data)
            setWinner(false);
        }

    };

    useEffect(() => {
        if (counterUseEffect.current === 0) {
            counterUseEffect.current++;
            GetWinner();
            if (!winner) {
                const socket = io(base_url);
                console.log("🚀 ~ file: useWinner.jsx:35 ~ useEffect ~ socket:", socket)
                setSocket(socket);
                socket.on('luckyTime', (data) => {
                    if (data) {
                        setWinner(data);
                        // localStorage.setItem("winner", JSON.stringify(data));
                        // console.log("🚀 ~ file: useWinner.jsx:17 ~ socket.on ~ data:", Number(data?.number))
                    }
                });
            }
        }

    }, [winner]);

    // useEffect(() => {
    //     if (counterUseEffect.current < 2) {
    //         if (localStorage.getItem("winner")) {
    //             setWinner(JSON.parse(localStorage.getItem("winner")));
    //         }
    //     }
    // }, []);



    const emitWinner = () => {
        if (socket) {
            console.log("🚀 emit", socket)
            socket?.emit('luckyTime', 'getWinner');
        }
    };

    return { data: winner, getWinner: emitWinner };
}

export default useWinner