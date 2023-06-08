import React from 'react'

const useBaseUrl = () => {
    const mode = import.meta.env.MODE;
    const baseUrl = mode === 'development' ? 'http://localhost:3000' : 'https://lottery.dacn.site';
    return baseUrl;
}

export default useBaseUrl