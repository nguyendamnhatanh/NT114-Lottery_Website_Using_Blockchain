
import { ethers } from 'ethers'

import { CustomButton } from '../components';

import { useStateContext } from '../context';

import { useAxios } from '../hook';

// import { LotteryRoomNew } from '.';

// test txHash: 0x56c892e3a97b9a6644ec07fe8626d0fa8a59ee4403fefcdd4302a865005c86e0

const TestFeat = () => {
  // Creating a transaction param
  // const { address, connect, sendTransaction, txHash, isLoading, setIsLoading } = useStateContext();


  return (
    <div className='flex flex-1 justify-center items-center '>
      <div>
        {/* <DisplayLuckyNumber isWinner={true} userTicket={[{ address: '0xSADsadasdsadsadsad', luckyNumber: 1234 }]} /> */}
      </div>
    </div>
  )
}

export default TestFeat