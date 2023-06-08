import React from 'react'
import { useStateContext } from '../context';
import { CustomButton } from '../components';

const Home = () => {
  const { address, connect, sendTransaction, isLoading, setIsLoading } = useStateContext();
  return (
    <div>
      <div className='flex flex-col'>
        <CustomButton
          btnType="button"
          title={'Send Transaction'}
          styles={'bg-[#8c6dfd]'}
          handleClick={async () => {
            try {
              setIsLoading(true);
              await sendTransaction('0.001')
              setIsLoading(false);

            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
          }}
        />

      </div>
    </div>
  )
}

export default Home