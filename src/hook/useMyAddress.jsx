import { useAddress } from '@thirdweb-dev/react';
import React, { useEffect, useState } from 'react'

const useMyAddress = () => {
    const [address, setAddress] = useState('');
    const myAddress = useAddress();
    useEffect(() => {
        if (myAddress && myAddress !== 'undefined')
            setAddress(myAddress);
    }, [myAddress])

    return address ? address : '';
}

export default useMyAddress