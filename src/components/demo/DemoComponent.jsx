import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '../../redux/slice/DemoSlice'
import { Link } from 'react-router-dom';
import { getRequest } from '../../utils/api';

const App = (props) => {
  const [state, setState] = useState('');

  //sample use of storing data in redux
  const dispatch = useDispatch();

  const click = () => {
    dispatch(increment())
  }

  //sample of call api with both case

  const getAPIWithoutToken = async () => {
    let url = 'https://provinces.open-api.vn/api/w/1'
    const res = await getRequest(url)
    console.log("Data without token " + JSON.stringify(res.data))
  }

  const getAPIWithToken = async () => {
    let url = 'https://bakery.fkmdev.site/v1/api/getcart?id=3b69a0c3-635b-412b-af6a-e8a5e41d0d81'
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTY3ODA4NjM2OSwiZXhwIjoxNjgwNjc4MzY5fQ.ixLyeE94D51gGg7wYaIaEksPxYDXcTP-rzp8fdF2xUs'
    const data = await getRequest(url, token)
    console.log("Data with Token " + JSON.stringify(res.data))
  }

  //basic use of React Router Dom page transition. See the Link tag.
  return (
    <>
      <p className='text-fuchsia-500'>Hello World</p>
      <button onClick={click}>Click me!</button>
      <button onClick={getAPIWithoutToken}>With out Token</button>
      <button onClick={getAPIWithToken}>With Token</button>
      <Link to ='/app2'>App2</Link>
    </>
  )
}

export default App;