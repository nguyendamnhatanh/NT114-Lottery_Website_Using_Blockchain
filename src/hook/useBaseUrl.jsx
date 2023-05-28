import React from 'react'

const useBaseUrl = () => {
    const mode = import.meta.env.MODE;
    const baseUrl = mode === 'development' ? 'http://localhost:3000' : 'http://lottery.dacn.site';
    return baseUrl;
}

export default useBaseUrl