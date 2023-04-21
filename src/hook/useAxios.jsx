import axios from "axios"

export const useAxios = async (method, url, token = undefined, data = undefined) => {
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
  console.log(requestOption);
  try {
    const response = await axios(requestOption);
    return response;
  } catch (error) {
    // console.error(error);
    console.error("Error:", error.response.data);
  }
}



export default useAxios;