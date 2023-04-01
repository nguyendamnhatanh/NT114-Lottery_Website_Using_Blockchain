import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const App2 = (props) => {
  const [state, setState] = useState('');

  const {value} = useSelector(state => state.counter) //sample use of retrieve data in redux store

  useEffect(() => {
    return () => {

    }
  }, []);

  return (
    <>
      <p className='font-semibold italic'>{value}</p>
    </>
  )
}

export default App2;