import axios from "axios"

export const getRequest = async (url, token = '') => {
  const requestOption = {
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      ...(token && {'Authorization': `Bearer ${token}`})
    },
  }
  console.log("Request option " + JSON.stringify(requestOption));
  return await axios(requestOption)
}

