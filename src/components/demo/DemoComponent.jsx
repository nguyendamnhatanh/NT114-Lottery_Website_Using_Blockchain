import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '../../redux/slice/DemoSlice'
import { Link } from 'react-router-dom';

const App = (props) => {
  const [state, setState] = useState('');

  //sample use of storing data in redux
  const dispatch = useDispatch();

  const click = () => {
    dispatch(increment())
  }

  //basic use of React Router Dom page transition. See the Link tag.
  return (
    <>
      <p className='text-fuchsia-500'>Hello World</p>
      <button onClick={click}>Click me!</button>
      <Link to ='/app2'>App2</Link>
    </>
  )
}

export default App;