import React from 'react'
import { useStateContext } from '../context';
import { CustomButton } from '../components';

const Home = () => {
  const { address, connect, sendTransaction, isLoading, setIsLoading } = useStateContext();
  return (
    <div>

    </div>
  )
}

export default Home