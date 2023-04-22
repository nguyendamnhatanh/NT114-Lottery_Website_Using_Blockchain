import axios from "axios"

export const useAxios = async (method, url, token = '', data = '') => {
  const requestOption = {
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...(data && { data: data })
  }
  console.log('sent request: ', requestOption);
  try {
    const response = await axios(requestOption);
    console.log("Success:", response?.data);
    return response;
  } catch (error) {
    console.error("Error:", error?.response?.data);
    return '';
  }
}



export default useAxios;