import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from '../context';
import { useBalance } from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
const useMyBalance = () => {
    const X = useBalance(NATIVE_TOKEN_ADDRESS);
    // console.log("🚀 ~ file: useMyBalance.jsx:10 ~ useMyBalance ~ X:", X)
    // return myBalance;
    return X.data ? X.data.displayValue : 0;
}

export default useMyBalance