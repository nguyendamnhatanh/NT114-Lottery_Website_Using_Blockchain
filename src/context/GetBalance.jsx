import React from 'react'

const GetBalance = () => {
    const getBalance = async (address) => {
        var balance = await window.web3.eth.getBalance(address);
        balance = await window.web3.utils.fromWei(balance)
        balance = balance ? Number(balance).toFixed(4) : 0;
        console.log("🚀 ~ file: index.jsx:114 ~ getBalance ~ balance:", balance)
        setMyBalance(balance)
    }
    return { getBalance }
}

export default GetBalance